const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const protact = async (req, res, next) => {
  let Token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token From Headers
      Token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(Token, process.env.SECERT);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
    }
  }
  if(!Token){
    res.status(401)
    throw new Error("not authorization , Not Token")
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
module.exports = { protact,isAdmin };
  