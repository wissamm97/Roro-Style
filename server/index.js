const express = require("express");
// const path = require("path");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./middleware/passport");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const allowedOrigins = ["https://rorostore.netlify.app"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
// Use the cors middleware to allow requests from specific origins
app.use(
  cors({
    origin: "https://roro-style.vercel.app",
    // origin: "https://rorostore.netlify.app",
    credentials: true, // If you need to include credentials like cookies
  })
);
app.get("/api/Keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRouter");
const routerUser = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/OrderRoute");
const PaymentRouter = require("./routes/PaymentRouter");

app.use(
  cookieSession({
    name: "Google Test",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["wissamwissam"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", routerUser);
app.use("/api/admin", adminRouter);
app.use("/api/admin", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment/", PaymentRouter);
app.use("/auth", authRoute);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../rorostayl/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "../", "rorostayl", "build", "index.html")
//     );
//   });
// } else {
// app.get("/", (req, res) => {
//   req.headers.forwarded

//     res.send("Pleas Set NODE_ENV To Production");
//   });
// }
// app.use(
//   cors({
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   })
// );
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is Run In http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
