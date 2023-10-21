const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// message model
const Message = require("../model/messagemodel");
const Admin = require("../model/adminModel");
// User Model
const User = require("../model/userModel");
const Order = require("../model/orderModel");
const Produts = require("../model/productModule");
const Address = require("../model/address");

// Register User

const regisetr = async (req, res) => {
  const { email, password } = req.body;
  if ((email, !password)) {
    res.status(401).json({ message: "Please Add Value In Input" });
  }
  // Check if user exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(401).json({ message: "Email Already exists" });
  }
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // Create User
  const admin = await Admin.create({
    email,
    password: hash,
  });
  if (admin) {
    res.status(201).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      Token: geneToken(admin.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login User

const Login = async (req, res) => {
  const { email, password } = req.body;
  const adminFound = await Admin.findOne({ email });
  const matchPassword = await bcrypt.compare(password, adminFound.password);
  if (adminFound && matchPassword) {
    res.status(201).json({
      _id: adminFound.id,
      name: adminFound.name,
      email: adminFound.email,
      Token: geneToken(adminFound.id),
    });
  } else {
    res.status(401).json({ message: "Invalid user" });
  }
};
// Get All User
const getAllUser = async (req, res) => {
  try {
    const user = await User.find({ isAdmin: { $ne: true } });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};
// Get All Orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};
// Get All Products
const getAllProducts = async (req, res) => {
  const products = await Produts.find();
  res.status(200).json(products);
};

// GEn TOken
const geneToken = (id) => {
  return jwt.sign({ id }, process.env.SECERT, { expiresIn: "60d" });
};

// Get All MEssage
const getMessage = async (req, res) => {
  const message = await Message.find();
  res.status(200).json(message);
};
// Delte Message
const deletMessage = async (req, res) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) {
    res.status(400).json({ error: "Message Not Found" });
  }
  const del = await Message.findByIdAndDelete(id);
  res.status(200).json({ message: `Deleted Message Number ${req.params.id}` });
};
// Delete User
const deletUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    const alluser = await User.find();
    res.status(200).json(alluser);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
};
// Delete Order
const deletOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(id);
  if (order) {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
};
const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const address = await Address.findOne({user:id})
  if (user || address) {
    res.status(200).json({user:user,address:address|| "The user has not provided us with any address"});
  } else {
    res.status(401).json({ messag: "User Not Found" });
  }
};
const getOrderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (order) {
      const userId = order.user;
      const user = await User.findOne(userId);
      res.status(200).json({ order: order, user: user });
    } else {
      res.status(401).json({ messag: "order Not Found" });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
// Change Status Order
const changeStatusOrder = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const order = await Order.findById(id);
  if (order) {
    const userId = order.user;
    const user = await User.findOne(userId);
    order.DeliveredStatus = data;
    await order.save();
    return res.status(200).json({ order: order, user: user });
  }
  return res.status(404).json({ message: "Order not found" });
};
const orderDelivered = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    const userId = order.user;
    const user = await User.findOne(userId);
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    return res.status(200).json({ order: order, user: user });
  }
  return res.status(404).json({ message: "Order not found" });
};
const getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Produts.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ messag: "Product Not Found" });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
module.exports = {
  regisetr,
  Login,
  getAllUser,
  getAllOrders,
  getAllProducts,
  deletUser,
  deletOrder,
  getMessage,
  deletMessage,
  getOrderDetails,
  getUserDetails,
  getProductDetails,
  orderDelivered,
  changeStatusOrder,
};
