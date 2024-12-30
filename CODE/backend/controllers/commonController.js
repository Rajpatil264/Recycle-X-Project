const db = require("../DBUtils/connection");
const { common, consumer, supplier } = require("../DBUtils/constants");
const reply = require("../models/responseStructure");

// Common Contoller
const getAllServiceZones = (request, response) => {
  const statement = `SELECT * FROM ${common.SERVICE_ZONES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Service Zones Fetched Successfully.")
        );
    }
  });
};

const findServiceByPincode = (request, response) => {
  const pincode = request.body.pincode;
  const statement = `SELECT * FROM ${common.SERVICE_ZONES} WHERE pincode = ${pincode}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      if (result.length == 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Sorry , no service zone found for this pincode."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(200, result, "Service Zones Fetched Successfully.")
          );
      }
    }
  });
};

const getAllTrashCategories = (request, response) => {
  const statement = `SELECT * FROM ${supplier.TRASH_CATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Trash Categories Fetched Successfully.")
        );
    }
  });
};

const getAllTrashSubCategories = (request, response) => {
  const statement = `SELECT * FROM ${supplier.TRASH_SUBCATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(
            200,
            result,
            "Trash Sub-Categories Fetched Successfully."
          )
        );
    }
  });
};

const getAllRecyclingCategories = (request, response) => {
  const statement = `SELECT * FROM ${consumer.RECYCLING_CATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Trash Categories Fetched Successfully.")
        );
    }
  });
};

const getAllRecyclingSubCategories = (request, response) => {
  const statement = `SELECT * FROM ${consumer.RECYCLING_SUBCATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "The requested table or view does not exist in the database."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Trash Categories Fetched Successfully.")
        );
    }
  });
};

module.exports = {
  getAllServiceZones,
  findServiceByPincode,
  getAllTrashCategories,
  getAllTrashSubCategories,
  getAllRecyclingCategories,
  getAllRecyclingSubCategories,
};
