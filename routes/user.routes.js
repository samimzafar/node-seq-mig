const { Router } = require("express");
const router = Router();

// Controllers
const { create, login, get, update } = require("../controllers/user");

router.post("/create", create);
router.post("/login", login);
router.get("/get", get);
router.put("/:id", update);

module.exports = router;
