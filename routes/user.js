const { Router } = require("express");
const router = Router();

// Controllers
const userController = require("../controllers/user");
const middlewares = require("../middlewares/validationCheck");

// router.get("/", userController.get);
router.post("/",middlewares.validateFields, userController.create);
router.post("/verifyOtp/:id", userController.verifyOtp);
router.put("/updateUser/:id", userController.updateUserByID);

module.exports = router;
