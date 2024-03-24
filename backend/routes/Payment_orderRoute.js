require('dotenv').config();

const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { verifyAccessToken } = require("../helpers/jwt_helper");
const razorpay = require('razorpay');
const roleCheck = require("../middlewares/roleCheck");

const router = express.Router();
const Razorpay = require('razorpay');

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create/order-id", async (req, res) => {
    try{
        console.log("Create orderID request", req.body);
        var options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: "rcpt",
        };

        const order = await instance.orders.create(options);
        
        console.log(order);
        res.send("orderID: "+ order.id);       

    }
    catch(error){
        if (error.isJoi === true) {
            throw createError.UnprocessableEntity(error.details[0].message);
          }
          throw createError.BadRequest();
    }
});

router.post("/verify", (req, res) => {
    
    let body = req.body.response.razorpay.order_id + "|" + req.body.response.payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                            .update(body.toString())
                            .digest('hex');
    console.log("sig Received", req.body.response.razorpay_signature);
    console.log("sig generated", expectedSignature);

    response = {"signatureIsValid":"true"}
    res.send(response);
});

module.exports = router;
