const { Users, Otps } = require("../models");
exports.create = async (req, res) => {
  try {
    const { name, email, verified, gender, role } = req.body
    const newUser = await Users.create({ name, email, verified, gender, role })
    const user = await Users.findByPk(newUser.id);
    if (user) {
      const { id, createdAt } = user;
      const otp = await Otps.create({
        code: 1234,
        expiry: createdAt + 300,
        fk_user_id: id,
      })
      return res.status(200).send({
        msg: "User Created Succesfull", result: {
          code: otp.code,
          newUser
        }
      });
    }
  } catch (err) {
    return res.status(err.status || 500).message(err.message || "Something went wrong...");
  }
}


exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body
    const { id } = req.params
    const otps = await Otps.findOne({
      where: { fk_user_id: id }
    })
    if (otp == otps.code) {
      const data = await Users.update({ name: "javid" }, { where: { id } })

      return res.status(200).send({ msg: "Otp Verified", otp, data })
    }
    return res.status(403).send({ msg: "Otp not authorized ", otp })
  } catch (err) {
    return res.status(err.status || 500).message(err.message || "Something went wrong...");
  }
}


exports.updateUserByID = async (req, res) => {
  try {
    const { id } = req.params
    const getUser = await Users.update({ name: "Umair" }, { where: { id } })
    if (getUser) return res.status(200).send({ msg: "User Updated", getUser })
    return res.status(403).send({ msg: "User not found " })
  } catch (error) {
    return res.status(error.status || 500).send({
      error: error.message || "Something went wrong..."
    })
  }
}