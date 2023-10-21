const express = require("express");

const adminRouter = express.Router();

const AdminController = require("../controller/adminController");
const { protact ,isAdmin} = require("../middleware/authMiddleware");
adminRouter.post("/register", AdminController.regisetr);
adminRouter.post("/login", AdminController.Login);

adminRouter.get("/alluser",protact,isAdmin, AdminController.getAllUser);
adminRouter.get("/allorders",protact,isAdmin, AdminController.getAllOrders);
adminRouter.get("/allproduts",protact,isAdmin, AdminController.getAllProducts);
adminRouter.get("/order/delivered/:id",protact,isAdmin, AdminController.orderDelivered);
adminRouter.put("/order/:id",protact,isAdmin,AdminController.changeStatusOrder)
// Delete 
adminRouter.delete("/user/:id", protact,isAdmin,AdminController.deletUser);
adminRouter.delete("/order/:id", protact,isAdmin,AdminController.deletOrder);
adminRouter.get("/contact",protact,isAdmin, AdminController.getMessage);
adminRouter.delete("/contact/:id",protact,isAdmin, AdminController.deletMessage);

// test 
adminRouter.get('/user/detials/:id',protact,isAdmin,AdminController.getUserDetails)
adminRouter.get('/order/:id',protact,isAdmin,AdminController.getOrderDetails)
adminRouter.get('/product/:id',protact,isAdmin,AdminController.getProductDetails)
module.exports = adminRouter;
