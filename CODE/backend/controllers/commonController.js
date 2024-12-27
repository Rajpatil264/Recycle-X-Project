const db = require("../DBUtils/connection");
const { common } = require("../DBUtils/constants");

const getAllServiceZones = () => {
  async (request, response) => {
    const statement = `SELECT * FROM ${common.SERVICE_ZONES}`;
    await db.execute(statement, (error, results) => {
      if (error) {
        response.send({ message: "An error occurred", error: error.message });
      } else {
        response.send(results);
      }
    });
  };
};

module.exports = { getAllServiceZones };
