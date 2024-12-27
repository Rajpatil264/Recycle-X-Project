const express = require("express");
const db = require("./DBUtils/connection");
const { common } = require("./DBUtils/constants");
const { appendFileLogs } = require("./App/fileLogger");

const app = express();

// Middleware
app.use(appendFileLogs);
app.use(express.json());

app.get("/getServiceZones", (request, response) => {
  const statement = `SELECT * FROM ${common.SERVICE_ZONES}`;
  db.execute(statement, (error, results) => {
    if (error) {
      response.send({ message: "An error occurred", error: error.message });
    } else {
      response.send(results);
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});
