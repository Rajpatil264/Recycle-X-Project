const express = require("express");
const { appendFileLogs } = require("./App/fileLogger");
const app = express();
const commonRoutes = require("./routes/commanRoutes");
const consumerRoutes = require("./routes/consumerRoutes");

// Middleware
app.use(appendFileLogs);
app.use(express.json());

// cors
app.use((request, response, next)=>{
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  next(); })

// Routing
app.use("/consumer", consumerRoutes);
app.use("/getServiceZones", commonRoutes);

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});
