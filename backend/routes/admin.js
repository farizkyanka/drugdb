const express = require("express");
const router = express.Router();
const passport = require("passport");
const Admin = require("../models/admin");

router.get("/login", (req, res) => {
  res.send("welcome");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new Admin({ email, username, role: "admin" });
    const registeredUser = await Admin.register(user, password);
    console.log(registeredUser);
    res.status(201).json({ message: "welcome" });
  } catch (err) {
    res.status(403).json(err.message);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureFlash: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      role: req.user.role,
    });
  }
);

router.delete("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
