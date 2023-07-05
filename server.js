// server.js
const express = require("express");
// Require the route files
const getPetsHandler = require("./routes/petsRoute.js");
const route2Handler = require("./routes/route2.js");
const route3Handler = require("./routes/route3.js");
const { LoggingMiddleware, ContextMiddleware } = require("./middlewares");


const app = express();

app.use(ContextMiddleware);
app.use(LoggingMiddleware);

app.get("/pets", getPetsHandler);
app.get("/pets/:petId", getPetsHandler);
app.get("/route2", route2Handler);
app.get("/route3", route3Handler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
