const express = require("express");
const router = express.Router();
const userCo = require("../controller/userController");
const { protact } = require("../middleware/authMiddleware");

router.post("/register", userCo.register);
router.post("/login", userCo.login);
router.get("/getme", protact, userCo.getadress);
router.post('/reset-password',userCo.resetPassword)
router.put("/profile", protact, userCo.updateUserInfo);
router.get("/confirm/:id", userCo.confirmaccount);
router.post("/adress", protact, userCo.setadress);
router.post("/contact", protact, userCo.contact);
router.post("/verifyEmail", userCo.verifyEmail);
router.post("/change-password", userCo.changePassword);


module.exports = router;
