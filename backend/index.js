const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const connectDb = require("./db/connectDb");
const errorHandler = require("./middlewares/errorMiddleware");
const createError = require("http-errors");
const morgan = require("morgan");

const port = process.env.PORT || 5000;
connectDb();

const app = express();

app.use(morgan("dev"));

app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false })); // url encoded

// routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.all("*", async (req, res, next) => {
  next(createError.NotFound(`Can't find ${req.originalUrl} on this server!`));
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
