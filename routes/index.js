const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user.routes");

router.use("/users", userRouter);

module.exports = router;
