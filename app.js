const morgan = require("morgan");
const router = require("./itemRoutes");
const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.use(morgan('dev'));


app.use("/items", router);

app.use((req, res, next) => {
    return next(new ExpressError("Not Found", 404));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});


module.exports = app;
