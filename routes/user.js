const { Router } = require("express");
const router = Router();

// Controllers
const { create, login } = require("../controllers/user");

router.post("/create", create);
router.post("/login", login);

module.exports = router;
