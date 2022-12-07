const { Users } = require("../models");
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await Users.create({ name });
    return res.status(200).send({
      msg: "User Created Succesfull",
      response: {
        user,
      },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .message(err.message || "Something went wrong...");
  }
};
