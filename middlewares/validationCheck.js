exports.validateFields = async (req, res, next) => {
  const { name, email, gender, role } = req.body
  if (!name || !email || !gender || !role) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  next()
}