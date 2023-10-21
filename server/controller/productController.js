const Product = require("../model/productModule");

const getallProduct = async (req, res) => {
  // console.log(req.hostname); // localhost
  // console.log(req.baseUrl); // /api/admin
  // console.log(req);
  const product = await Product.find();
  res.status(200).json(product);
};
// get Details
const getDetails = async (req, res) => {
  const { id } = req.body;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(403).json({ message: "Proudct Is Not Found" });
  }
};
const createlProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Get Category
const getCategory = async (req, res) => {
  const category = await Product.find().distinct("category");
  res.json(category);
};
// Delete Product
const deletproduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    const allproduct = await Product.find()
    res.status(200).json(allproduct);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
};
module.exports = {
  getallProduct,
  createlProduct,
  getCategory,
  getDetails,
  deletproduct,
};
