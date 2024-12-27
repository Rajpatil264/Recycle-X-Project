const db = require("../DBUtils/connection");
const { common } = require("../DBUtils/constants");
const reply = require("../models/ApiStructure");

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

module.exports = { getAllServiceZones };
