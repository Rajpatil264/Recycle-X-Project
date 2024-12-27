const db = require("../DBUtils/connection");
const { consumer } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/ApiStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// Consumer Controller
const registerConsumer = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.email,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.consumerType,
  ];

  const statement = `INSERT INTO ${consumer.CONSUMER} (first_name, last_name, email, mobile_number, password, state, city, pincode, consumer_type) VALUES
  (?,?,?,?,?,?,?,?,?)`;
  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error in the request fields are missing."
          )
        );
    } else {
      response
        .status(201)
        .json(reply.onSuccess(201, result, "Consumer inserted successfully."));
    }
  });
};

const loginConsumer = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [request.body.email, encryptPass];
  const statement = `SELECT first_name, last_name, email FROM ${consumer.CONSUMER} WHERE email = ? AND password =?`;
  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(
          reply.onError(
            404,
            error,
            "No records found for that credentials. Please try again."
          )
        );
    } else {
      const user = result[0];
      const payload = {
        firstName: user["first_name"],
        lastName: user["last_name"],
        email: user["email"],
      };
      console.log(user);
      const token = jwt.sign(payload, config.SECRET_KEY);

      response
        .status(200)
        .json(
          reply.onLoginSuccess(
            200,
            token,
            "Logged-In successfully. Welcome to the application."
          )
        );
    }
  });
};

const updateConsumer = (request, response) => {
  const consumerId = request.params.id;
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.email,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.consumerType,
    consumerId,
  ];

  const statement = `UPDATE ${consumer.CONSUMER} SET 
    first_name = ?, 
    last_name = ?, 
    email = ?, 
    mobile_number = ?, 
    password = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    consumer_type = ? 
    WHERE  consumer_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(
          reply.onError(
            404,
            error,
            "Consumer not found or invalid update data provided."
          )
        );
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "Consumer updated successfully."));
    }
  });
};

module.exports = { registerConsumer, loginConsumer, updateConsumer };
