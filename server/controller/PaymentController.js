const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECERT);
const Order = require("../model/orderModel");
const checkout = async (req, res) => {
  const id = req.body._id;
  const items = req.body.orderItems;
  const shippingPrice = req.body.shippingPrice;
  const taxPrice = req.body.taxPrice;
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        ...items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping",
            },
            unit_amount: shippingPrice * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tax",
            },
            unit_amount: taxPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/order/${id}/payment/success`,
      cancel_url: `${req.headers.origin}/order/history`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
};
const successPaid = async (req, res) => {
  console.log(req.headers.origin, "origin");
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updataOrder = await order.save();
    res.send({ message: "Order IS Paid", order: updataOrder });
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
};
module.exports = {
  checkout,
  successPaid,
};
