// server.js
const express = require("express");

// Require the route files
const route1Handler = require("./routes/route1.js");
const route2Handler = require("./routes/route2.js");
const route3Handler = require("./routes/route3.js");
const app = express();
const { LoggingMiddleware, ContextMiddleware } = require("./middlewares");
const topUp = require("./routes/topUp.js");

app.use(ContextMiddleware);
// Register the route handlers
app.use(LoggingMiddleware);

app.post("/route1", route1Handler);
app.post("/topUp", topUp);
app.get("/route2", route2Handler);
app.get("/route3", route3Handler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
