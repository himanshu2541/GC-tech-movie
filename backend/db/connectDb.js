const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    let conn = {};
    if (!conn) {
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    } else {
      conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
