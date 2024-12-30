const db = require("../DBUtils/connection");
const { supplier } = require("../DBUtils/constants");
const config = require("../App/appConfig");
const reply = require("../models/responseStructure");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// Suppiler Controller
const registerSupplier = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.supplierType,
  ];

  const statement = `CALL register_supplier(?, ?, ?, ?, ?, ?, ?,?)`;
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
        .json(reply.onSuccess(201, result, "Supplier inserted successfully."));
    }
  });
};

const loginSupplier = (request, response) => {
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [request.body.mobileNumber, encryptPass];
  const statement = `SELECT first_name, last_name, mobile_number FROM ${supplier.SUPPLIER} WHERE mobile_number = ? AND password = ?`;
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
        console.log(user);
        const payload = {
          firstName: user["first_name"],
          lastName: user["last_name"],
          mobileNumber: user["mobile_number"],
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

const updateSupplier = (request, response) => {
  const supplierId = request.params.id;
  const encryptPass = String(crypto.SHA256(request.body.password));
  const values = [
    request.body.firstName,
    request.body.lastName,
    request.body.mobileNumber,
    encryptPass,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.supplierType,
    supplierId,
  ];

  const statement = `UPDATE ${supplier.SUPPLIER} SET 
    first_name = ?, 
    last_name = ?, 
    mobile_number = ?, 
    password = ?, 
    state = ?, 
    city = ?, 
    pincode = ?, 
    supplier_type = ? 
    WHERE  supplier_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(404)
        .json(
          reply.onError(
            404,
            error,
            "Supplier not found or invalid update data provided."
          )
        );
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "Supplier updated successfully."));
    }
  });
};

const addToCart = (request, response) => {
  const subCategoryId = request.params.id;
  const { quantity } = request.body;
  const values = [subCategoryId, quantity];
  const statement = `INSERT INTO ${supplier.SUPPLIER_CART} (subcategory_id, quantity_kg) VALUES (?, ?)`;
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
  const statement = `DELETE FROM ${supplier.SUPPLIER_CART} WHERE item_id = ${cartId}`;
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
  const statement = `SELECT * FROM ${supplier.SUPPLIER_CART}`;

  db.execute(statement, (error, results) => {
    if (error) {
      response
        .status(400)
        .json(
          reply.onError(
            400,
            error,
            "There was an error fetching the supplier cart items."
          )
        );
    }
    if (results.length > 0) {
      response
        .status(200)
        .json(
          reply.onSuccess(
            200,
            results,
            "Supplier cart items fetched successfully."
          )
        );
    } else {
      response
        .status(404)
        .json(reply.onError(404, null, "Supplier cart is empty."));
    }
  });
};

const addPickupAddress = (request, response) => {
  const values = [
    request.body.supplierId,
    request.body.supplierName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.street_name,
    request.body.landmark,
  ];
  const statement = `INSERT INTO ${supplier.PICKUP_ADDRESS} (supplier_id, supplier_name, state, city, pincode, street_name, landmark) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(reply.onError(400, error, "Something went wrong"));
    } else {
      response
        .status(201)
        .json(
          reply.onSuccess(201, result, "PickUp Address added successfully.")
        );
    }
  });
};

const updatePickupAddress = (request, response) => {
  const pickupId = request.params.id;
  const values = [
    request.body.supplierId,
    request.body.supplierName,
    request.body.state,
    request.body.city,
    request.body.pincode,
    request.body.street_name,
    request.body.landmark,
    pickupId,
  ];
  const statement = `UPDATE ${supplier.PICKUP_ADDRESS} SET supplier_id= ?, supplier_name = ?, state = ?, city = ?, pincode = ?, street_name = ?, landmark = ? WHERE pickup_id = ?`;

  db.execute(statement, values, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(reply.onError(400, error, "Something went wrong."));
    } else {
      response
        .status(201)
        .json(reply.onSuccess(201, result, "Address updated successfully."));
    }
  });
};

const deletePickupAddress = (request, response) => {
  const pickupId = request.params.id;

  const statement = `DELETE FROM ${supplier.PICKUP_ADDRESS} WHERE pickup_id=${pickupId}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(reply.onError(400, error, "Address not found."));
    } else {
      response
        .status(201)
        .json(reply.onSuccess(201, result, "Address deleted successfully."));
    }
  });
};

const getPickupAddress = (request, response) => {
  const statement = `SELECT * FROM ${supplier.PICKUP_ADDRESS}`;

  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(400)
        .json(reply.onError(400, error, "Something went wrong."));
    } else {
      response
        .status(200)
        .json(reply.onSuccess(200, result, "All addresses are shown here."));
    }
  });
};

const placeOrder = (request, response) => {
  const supplier_id = request.body.supplierId;
  const pickup_id = request.body.pickupId;

  const statement = `CALL create_supplier_order_from_cart(?,?)`;

  db.execute(statement, [supplier_id, pickup_id], (error, result) => {
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
  const supplierId = request.params.id;
  const statement = `SELECT DISTINCT
    co.order_id,
    co.supplier_id,
    co.order_date, 
    coi.subcategory_id,
    rs.subcategory_image,
    rs.subcategory_name,
    rs.category_description
FROM 
    ${supplier.SUPPLIER_ORDERS} co
LEFT JOIN 
    ${supplier.SUPPLIER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
LEFT JOIN 
    ${supplier.TRASH_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
WHERE 
    co.supplier_id = ${supplierId}
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
    co.supplier_id,
    co.order_date,
    co.order_time,
    co.order_status,
    coi.item_id,
    coi.subcategory_id,
    rs.subcategory_name,
    rs.subcategory_image,
    rs.price_per_kg,
    rs.category_description,
    da.supplier_name,
    da.state,
    da.city,
    da.pincode,
    da.street_name,
    da.landmark
FROM 
    ${supplier.SUPPLIER_ORDERS} co
LEFT JOIN 
    ${supplier.SUPPLIER_ORDER_ITEMS} coi ON co.order_id = coi.order_id
LEFT JOIN 
    ${supplier.TRASH_SUBCATEGORIES} rs ON coi.subcategory_id = rs.subcategory_id
LEFT JOIN 
    ${supplier.PICKUP_ADDRESS} da ON co.pickup_id = da.pickup_id
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

  const imagePath = `Uploads/Supplier_Images/${request.file.filename}`; // Ensure correct path
  const supplierId = request.params.id;

  // Update the database with the image path
  const statement = `UPDATE ${supplier.SUPPLIER} SET imageName = ? WHERE supplier_id = ?`;
  db.execute(statement, [imagePath, supplierId], (error, result) => {
    if (error) {
      return response
        .status(500)
        .json(reply.onError(500, error, "Failed to upload profile image."));
    }

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .json(reply.onError(404, null, "Supplier not found. Update failed."));
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
  registerSupplier,
  loginSupplier,
  updateSupplier,
  addToCart,
  removeFromCart,
  showCart,
  addPickupAddress,
  updatePickupAddress,
  deletePickupAddress,
  getPickupAddress,
  placeOrder,
  getAllOrders,
  getOrderItemDetails,
  uploadProfileImg,
};
