const OrederM = require("../model/orderModel");
const userModel = require("../model/userModel");
// Add New Order
const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  const newOrder = await OrederM.create({
    orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    user: req.user.id,
  });
  const order = await newOrder.save();
  res.status(201).json({ message: "New Order Created", order });
};

// Get Order
const getOrderList = async (req, res) => {
  const order = await OrederM.find({ user: req.user.id });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Not Found User" });
  }
};

// Get New Order
const getOrder = async (req, res) => {
  const id = req.params.id;
  const order = await OrederM.findById(id);
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
};

// Order Approve
const ApproveOrder = async (req, res) => {
  console.log(req);
  const ido = req.params.id;
  const { id, status, update_time, payer } = req.body;
  const email_address = payer.email_address;
  const order = await OrederM.findById(ido);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: id,
      status: status,
      update_time: update_time,
      email_address: email_address,
    };
    const updataOrder = await order.save();
    res.send({ message: "Order IS Paid", order: updataOrder });
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
};

module.exports = {
  addOrder,
  getOrder,
  ApproveOrder,
  getOrderList,
};
