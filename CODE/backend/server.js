const express = require("express");
const { appendFileLogs } = require("./App/fileLogger");
const app = express();
const commonRoutes = require("./routes/commanRoutes");

// Middleware
app.use(appendFileLogs);
app.use(express.json());

app.use("/getServiceZones", commonRoutes);

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});
