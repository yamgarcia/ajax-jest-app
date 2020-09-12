const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const config = require("../config/database");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

const Order = require("../models/order");
const Calculator = require("../models/calculator");
const User = require("../models/user");

/**
 * @route    POST api/orders
 * @desc     Store orderInfo in the database
 * @access   Public
 */
router.post(
  "/api/orders",
  [
    check("customerName").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  (req, res) => {
    const orderInfo = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create object from parameterized constructor
    const PriceCalculator = new Calculator(
      orderInfo.pizzaSize,
      orderInfo.toppings.length,
      orderInfo.quantity
    );
    let total = PriceCalculator.getTotal().toFixed(2);
    //? getTotal
    orderInfo.price = total;
    //? status
    orderInfo.status = "created";

    CustomerOrder = new Order(orderInfo);

    //? Prints only if passes validation
    console.log(orderInfo);

    CustomerOrder.save((err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        return;
      }
      res.json({ status: "Order Added" });
    });
  }
);

/**
 * @route    GET api/orders
 * @desc     Get orders from db a01080115
 * @access   Public
 */
router.get("/api/orders", (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      return;
    }
    res.json(orders);
  });
});

/**
 * @route    GET api/confirmation
 * @desc     Get a confirmation which status is still created
 * @access   Public
 */
router.get("/api/confirmation", async (req, res) => {
  try {
    const toConfirm = await Order.find({
      status: "created",
    });
    if (!toConfirm) {
      return res.status(400).json({ msg: "There is order to update" });
    }

    res.json(toConfirm);
  } catch (err) {
    // Prevents the error the be "server error" when the user id is valid but not found
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: `No order to update`,
      });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    GET api/confirmation
 * @desc     Get a confirmation which status is still created
 * @access   Public
 */
router.get("/api/confirmed", async (req, res) => {
  try {
    const confirm = await Order.find({
      status: "confirmed",
    });
    if (!confirm) {
      return res.status(400).json({ msg: "There is order to update" });
    }

    res.json(confirm);
  } catch (err) {
    // Prevents the error the be "server error" when the user id is valid but not found
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: `No order to update`,
      });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//---------------------------

/**
 * @route    POST api/signup
 * @desc     Subscribe to the page
 * @access   Public
 */
router.post(
  "/api/signup",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    console.log(req.body);
    const { password, username, email } = req.body;

    let NewUser = new User({
      username: username,
      password: password,
      email: email,
    });

    console.log(NewUser);
    //* save
    NewUser.save((err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        return;
      }
      res.json({ success: true, msg: "User created" });
    });
  }
);

/**
 * @route    POST api/signin
 * @desc     Signin with username and password
 * @access   Public
 */
router.post("/signin", (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // user found => create token
            let token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 500000,
            });
            // res.json({ success: true, token: `JWT ${token}` });
            console.log(`User loged in, token: JWT ${token}`);
            res.redirect("/");
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
});

/**
 * @route    GET api/signout
 * @desc     signout from page
 * @access   Public
 */
router.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    req.logout();
    res.json({ success: true, msg: "Sign out successfully." });
  }
);

getToken = function (headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
