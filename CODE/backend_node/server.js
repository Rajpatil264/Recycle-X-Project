const express = require("express");
const { appendFileLogs } = require("./App/fileLogger");
const reply = require("./models/responseStructure");
const config = require("./App/appConfig");
const jwt = require("jsonwebtoken");
const app = express();
const commonRoutes = require("./routes/commanRoutes");
const consumerRoutes = require("./routes/consumerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

// Middleware
app.use(appendFileLogs);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use((request, response, next) => {
  if (request.url.includes("/signin") || request.url.includes("/signup") || request.url.includes("/verifyEmail")) {
    next();
  } else {
    if (
      request.headers.authorization != null ||
      request.headers.authorization != undefined
    ) {
      const authHeader = request.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, config.SECRET_KEY);
        if (payload != null && payload.status == "Active") {
          next();
        } else {
          response
            .status(403)
            .json(reply.onError(403, null, "Invalid or expired token"));
        }
      } else {
        response
          .status(403)
          .json(reply.onError(403, null, "Bearer token required"));
      }
    } else {
      response
        .status(403)
        .json(reply.onError(403, null, "Token required to access the APIs"));
    }
  }
});


// Routing
app.use("/supplier", supplierRoutes);
app.use("/consumer", consumerRoutes);
app.use("/common", commonRoutes);

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});
