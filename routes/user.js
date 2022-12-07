const { Router } = require("express");
const router = Router();

// Controllers
const userController = require("../controllers/user");

router.post("/create", userController.create);

module.exports = router;
