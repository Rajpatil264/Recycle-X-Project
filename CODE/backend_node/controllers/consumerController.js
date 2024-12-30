const db = require("../DBUtils/connection");
const { consumer } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
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

  const statement = `CALL register_consumer(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
      if (result.length > 0) {
        const user = result[0];
        const payload = {
          firstName: user["first_name"],
          lastName: user["last_name"],
          email: user["email"],
        };
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
      } else {
        response
          .status(404)
          .json(
            reply.onError(
              404,
              error,
              "No records found for that credentials. Please try again."
            )
          );
      }
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

const addToCart = (request, response) => {
  const subCategoryId = request.params.id;
  const { quantity } = request.body;
  const values = [subCategoryId, quantity];
  const statement = `INSERT INTO ${consumer.CONSUMER_CART} (subcategory_id, quantity_kg) VALUES (?, ?)`;
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
        .json(
          reply.onSuccess(201, result, "Order item added to cart successfully.")
        );
    }
  });
};

const removeFromCart = (request, response) => {
  const cartId = request.params.id;
  const statement = `DELETE FROM ${consumer.CONSUMER_CART} WHERE item_id = ${cartId}`;
  db.execute(statement, (error, result) => {
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
      console.log(result.affectedRows);
      if (result.affectedRows == 1) {
        response
          .status(201)
          .json(
            reply.onSuccess(
              201,
              result,
              "Order item removed from cart successfully."
            )
          );
      } else {
        response
          .status(400)
          .json(
            reply.onError(400, result, "The cart might be empty.(Bad Request)")
          );
      }
    }
  });
};

const showCart = (request, response) => {
  const statement = `SELECT * FROM ${consumer.CONSUMER_CART}`;

  db.execute(statement, (error, results) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error fetching the cart items."
          )
        );
    } else {
      if (results.length > 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(200, results, "Cart items fetched successfully.")
          );
      } else {
        response.status(404).json(reply.onError(404, null, "Cart is empty."));
      }
    }
  });
};

const addDeliveryAddress = (request, response) => {
  const values = [
    request.body.consumerId,
    request.body.consumerName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.streetName,
    request.body.landmark,
  ];

  const statement = `INSERT INTO ${consumer.DELIVERY_ADDRESS} (consumer_id, consumer_name, state, city, pincode, street_name,landmark) VALUES
  (?,?,?,?,?,?,?)`;
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
        .json(reply.onSuccess(201, result, "Address inserted successfully."));
    }
  });
};

const updateDeliveryAddress = (request, response) => {
  const deliveryId = request.params.id;
  const values = [
    request.body.consumerId,
    request.body.consumerName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.streetName,
    request.body.landmark,
    deliveryId,
  ];

  const statement = `UPDATE ${consumer.DELIVERY_ADDRESS} SET 
    consumer_id = ?, 
    consumer_name = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    street_name = ?,
    landmark = ? 
    WHERE  delivery_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(
          reply.onError(
            404,
            error,
            "address not found or invalid update data provided."
          )
        );
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Delivery address updated successfully.")
        );
    }
  });
};

const getDeliveryAddress = (request, response) => {
  const statement = `SELECT * FROM ${consumer.DELIVERY_ADDRESS}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(reply.onError(404, error, "Addresses not found."));
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "All delivery address shown here."));
    }
  });
};

const deleteDeliveryAddress = (request, response) => {
  const deliveryId = request.params.id;

  const statement = `DELETE FROM ${consumer.DELIVERY_ADDRESS} WHERE delivery_id=${deliveryId}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(reply.onError(404, error, "Addresses not found."));
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Delivery address deleted successfully.")
        );
    }
  });
};

const placeOrder = (request, response) => {
  const consumer_id = request.body.consumerId;
  const delivery_id = request.body.deliveryId;

  const statement = `CALL create_order_from_cart(?,?)`;

  db.execute(statement, [consumer_id, delivery_id], (error, result) => {
    if (error) {
      response
        .status(400)
        .json(reply.onError(400, error, "Something went wrong"));
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "Order placed successfully"));
    }
  });
};

const getAllOrders = (request, response) => {
  const consumerId = request.params.id;

  const statement = `SELECT DISTINCT
    co.order_id,
    co.consumer_id,
    co.order_date, 
    coi.subcategory_id,
    rs.subcategory_image,
    rs.subcategory_name,
    rs.category_description
FROM 
    ${consumer.CONSUMER_ORDERS} co
LEFT JOIN 
    ${consumer.CONSUMER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
LEFT JOIN 
    ${consumer.RECYCLING_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
WHERE 
    co.consumer_id = ${consumerId}
ORDER BY 
    co.order_date DESC, 
    co.order_id DESC;  
`;
  db.execute(statement, (error, result) => {
    if (error) {
      response.status(404).json(reply.onError(404, error, "No orders found"));
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "Orders retrieved successfully"));
    }
  });
};

const getOrderItemDetails = (request, response) => {
  const { orderId, itemId } = request.body;
  const statement = `
  SELECT 
    co.order_id,
    co.consumer_id,
    co.order_date,
    co.order_time,
    co.order_status,
    coi.item_id,
    coi.subcategory_id,
    rs.subcategory_name,
    rs.subcategory_image,
    rs.price_per_kg,
    rs.category_description,
    da.consumer_name,
    da.state,
    da.city,
    da.pincode,
    da.street_name,
    da.landmark
FROM 
    ${consumer.CONSUMER_ORDERS} co
LEFT JOIN 
    ${consumer.CONSUMER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
LEFT JOIN 
    ${consumer.RECYCLING_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
LEFT JOIN 
    ${consumer.DELIVERY_ADDRESS} da ON co.delivery_id = da.delivery_id
WHERE 
    co.order_id = ${orderId} AND coi.item_id = ${itemId};
`;
  db.execute(statement, (error, result) => {
    if (error) {
      response.status(404).json(reply.onError(404, error, "No orders found"));
    } else {
      response
        .status(200)
        .json(
          reply.onSuccess(200, result, "Order Details retrieved successfully")
        );
    }
  });
};

const uploadProfileImg = (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .json(reply.onError(400, null, "No file provided."));
  }

  const imagePath = `Uploads/Consumer_Images/${request.file.filename}`;
  const consumerId = request.params.id;

  // Update the database with the image path
  const statement = `UPDATE ${consumer.CONSUMER} SET imageName = ? WHERE consumer_id = ?`;
  db.execute(statement, [imagePath, consumerId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to upload profile image."));
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(reply.onError(404, null, "consumer not found. Update failed."));
    }

    response
      .status(200)
      .json(
        reply.onSuccess(
          200,
          { imagePath },
          "Profile image uploaded successfully."
        )
      );
  });
};

module.exports = {
  registerConsumer,
  loginConsumer,
  updateConsumer,
  addToCart,
  removeFromCart,
  showCart,
  addDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
  getDeliveryAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
};
