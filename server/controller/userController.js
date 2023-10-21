const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Adressm = require("../model/address");
const User = require("../model/userModel");
const Message = require("../model/messagemodel");
const validator = require("validator");
const crypto = require("crypto");
const { sendVerificationMail } = require("../middleware/sendVerificationMail");
const { sendResetPassword } = require("../middleware/sendResetPassword");
const { sendMessage } = require("../middleware/SendMessage");
// Check If User LogIn

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({ message: "Please fill in all fields " });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).json({ message: "Email not valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(401).json({ message: "Password not strong enough" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: "Email Already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hash,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });

    if (user) {
      sendVerificationMail(user);
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        Token: geneToken(user.id),
        emailToken: user.emailToken,
        isVerified: user?.isVerified,
        isAdmin: user?.isAdmin,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Login User

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).json({ message: "Email not valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(401).json({ message: "Password not strong enough" });
  }

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      const matchPassword = await bcrypt.compare(password, userFound.password);
      if (matchPassword) {
        return res.status(201).json({
          _id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          isVerified: userFound.isVerified,
          isAdmin: userFound?.isAdmin,
          Token: geneToken(userFound.id), // Assuming `geneToken` is a valid function
        });
      }
    }
    return res.status(401).json({ message: "Invalid user" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
// ConfirmAccount
const confirmaccount = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.emailToken = crypto.randomBytes(64).toString("hex");
    await user.save();
    sendVerificationMail(user);
    res.status(200);
  }
  res.status(404).json({ message: "User Not Found" });
};
// set Adress
const setadress = async (req, res) => {
  const { fullName, address, city, country, phonenumber } = req.body;
  const Address = await Adressm.findOne({ user: req.user.id });
  if (Address) {
    res.status(200).json(Address);
  } else {
    const newSetAddress = await Adressm.create({
      fullName: fullName,
      address: address,
      city: city,
      country: country,
      phonenumber: phonenumber,
      user: req.user.id,
    });
    res.status(200).json(newSetAddress);
  }
};
// get Adress
const getadress = async (req, res) => {
  const getme = await Adressm.findOne({ user: req.user.id });
  if (getme) {
    res.status(200).json(getme);
  } else {
    res.status(404).json({ message: "Not Found Address For You" });
  }
};
// Update User Info
const updateUserInfo = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name;
    user.email = email;
    if (password) {
      user.password = bcrypt.hashSync(password, 8);
    }
    const updateUser = await user.save();
    res.status(201).json({
      _id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      Token: geneToken(updateUser.id),
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};
// Contact
const contact = async (req, res) => {
  const { name, title, message, email } = req.body;
  if ((!name || title, !message || !email)) {
    res.status(401).json({ message: "Please Add Value In Input" });
  }
  const messagec = await Message.create({
    name,
    title,
    message,
    email,
    user: req.user._id,
  });
  sendMessage(messagec);
  res.status(200).json(messagec);
};
// Reset Password
const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.emailToken = crypto.randomBytes(64).toString("hex");
      await user.save();
      sendResetPassword(user);
      res.status(200).json({
        message:
          "The link has been sent to your mailbox. Please visit your mailbox to change your password",
      });
    }
  } catch (error) {
    res.status(401).json({ message: "user Not Fonud" });
  }
};

// changePassword
const changePassword = async (req, res) => {
  const { emailToken, password } = req.body;
  console.log(emailToken);
  console.log(password);
  try {
    if (!emailToken)
      return res.status(404).json({ message: "EmailToken Not Found" });
    const user = await User.findOne({ emailToken });
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    user.emailToken = null;
    await user.save();
    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    res.status(401).json({ message: "user Not Fonud" });
  }
};
// verifyEmail
const verifyEmail = async (req, res) => {
  const emailToken = req.body.emailToken;
  try {
    if (!emailToken)
      return res.status(404).json({ message: "EmailToken Not Found" });
    const user = await User.findOne({ emailToken });
    if (user) {
      (user.emailToken = null), (user.isVerified = true);
      await user.save();
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        Token: geneToken(user.id),
        emailToken: user.emailToken,
        isVerified: user.isVerified,
      });
    } else {
      res
        .status(404)
        .json({ message: "Email verification failed, invalid Token! " });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
const geneToken = (id) => {
  return jwt.sign({ id }, process.env.SECERT, { expiresIn: "60d" });
};

module.exports = {
  register,
  login,
  resetPassword,
  changePassword,
  setadress,
  getadress,
  contact,
  updateUserInfo,
  verifyEmail,
  confirmaccount,
};
