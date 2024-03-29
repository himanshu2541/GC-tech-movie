require("dotenv").config();
var crypto = require("crypto");
const User = require("./../models/userModel");
const UserRole = require("./../models/userRoleModel");

const express = require("express");
// const { getAllUsers } = require("../controllers/adminController");
// const { verifyAccessToken } = require("../helpers/jwt_helper");
// const razorpay = require("razorpay");
// const roleCheck = require("../middlewares/roleCheck");
const createError = require("http-errors");
const router = express.Router();
const Razorpay = require("razorpay");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const generateToken = require("../helpers/generateToken");

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/getkey", (req, res) => {
  console.log("endpoint hit");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    Key: process.env.RAZORPAY_KEY_ID,
  });
});

router.post("/create/order-id", async (req, res) => {
  try {
    console.log("Create orderID request", req.body);

    var options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "rcpt",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ id: order["id"] });

    console.log(order);
    res.send("orderID: " + order.id);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    // throw createError.BadRequest();
  }
});

router.post("/verify", async (req, res) => {
  let body = req.body.OrderID + "|" + req.body.PaymentID;

  const id = await verifyRefreshToken(req.cookies.refreshToken);

  console.log(id);
  const amnt = req.body.amount;
  console.log(amnt);
  console.log(typeof amnt);
  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig Received", req.body.Signature);
  console.log("sig generated", expectedSignature);

  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.Signature) {
    response = { signatureIsValid: "true" };

    try {
      // const userId = req.user.id; // Assuming you can get the user ID from the token
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      let role;
      try {
        if (amnt === 99) {
          user.Role = "tier1";
          role = await UserRole.findOneAndUpdate(
            { UserId: user._id },
            { Role: ["tier1"] }
          );
        } else if (amnt === 199) {
          user.Role = "tier2";
          role = await UserRole.findOneAndUpdate(
            { UserId: user._id },
            { Role: ["tier2"] }
          );
        } else if (amnt === 499) {
          user.Role = "tier3";
          role = await UserRole.findOneAndUpdate(
            { UserId: user._id },
            { Role: ["tier3"] }
          );
        }
      } catch (err) {
        throw createError.InternalServerError(err);
      }

      // switch (amnt) {
      //   case 99:
      //     user.Role = "tier1";
      //     await UserRole.findOneAndUpdate(
      //       { UserId: user._id },
      //       { Role: ["tier1"] }
      //     );
      //     break;
      //   case 199:
      //     user.Role = "tier2";
      //     await UserRole.findOneAndUpdate(
      //       { UserId: user._id },
      //       { Role: ["tier2"] }
      //     );
      //   case 499:
      //     user.Role = "tier3";
      //     await UserRole.findOneAndUpdate(
      //       { UserId: user._id },
      //       { Role: ["tier3"] }
      //     );
      //     break;
      //   // Add more cases for other amounts if needed
      // }

      // Save the updated user
      await user.save();

      response.message = "Role updated successfully";
      console.log(response.message);
    } catch (error) {
      console.error("Error updating user role:", error);
      response.error = "Error updating user role";
    }
  }

  res.send(response);
  // response = { signatureIsValid: "true" };
});

module.exports = router;
