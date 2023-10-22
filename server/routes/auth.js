const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const crypto = require("crypto");

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  req.session = null; // Clear the session data
  res.clearCookie("Google Test");
  res.redirect("https://roro-style.vercel.app");
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    // Now, req.user should be defined
    if (req.user) {
      const email = req.user.email;
      const userFound = await User.findOne({ email });
      if (userFound) {
        const _id = userFound.id;
        const name = userFound.name;
        const email = userFound.email;
        const emailToken = crypto.randomBytes(64).toString("hex");
        const isVerified = userFound?.isVerified;
        const Token = geneToken(userFound.id);
        res.redirect(
          `https://roro-style.vercel.app?id=${_id}&email=${email}&name=${name}&Token=${Token}&emailToken=${emailToken}&Verified=${isVerified}`
        );
      }
    } else {
      res.status(404).json({ message: "Not Found User" });
    }
  }
);
const geneToken = (id) => {
  return jwt.sign({ id }, process.env.SECERT, { expiresIn: "60d" });
};
module.exports = router;
