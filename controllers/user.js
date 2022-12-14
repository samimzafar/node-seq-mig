require("dotenv").config();
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const accessToken = process.env.ACCESS_TOKEN;
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const emailExists = await Users.findOne({ where: { email: data.email } });
    if (!emailExists) {
      const user = await Users.create(data);
      return res.status(200).send({
        msg: "User Created Succesfull",
        user,
      });
    } else {
      return res.status(400).send({
        message: "Email already registered",
      });
    }
  } catch (err) {
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong...");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({
        message: "User doesn't exist",
      });
    } else {
      if (user.password != password) {
        return res.status(403).send({
          message: "Incorrect Credientials",
        });
      } else if (user.status == false) {
        return res.status(401).send({
          message: "Wait for admin approval",
        });
      } else if (user.password == password) {
        const response = {
          email: user.email,
          role: user.role,
        };
        const jwtToken = jwt.sign(response, accessToken, { expiresIn: "8h" });
        return res.status(200).send({
          message: "Logged in",
          jwtToken,
        });
      } else {
        return res.status(400).send({
          message: "Something went wrong. Try Again",
        });
      }
    }
  } catch (err) {
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong...");
  }
};

exports.get = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { role: "user" } });
    if (!users) {
      return res.status(400).send({
        message: "User doesn't exist",
      });
    } else {
      return res.status(200).send({ message: "Users Fetched", users });
    }
  } catch (err) {
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong...");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await Users.update(req.body, {
      where: { id },
      individualHooks: true,
    });
    if (updatedUser) {
      return res
        .status(200)
        .send({ message: "User was updated successfully." });
    } else {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }
  } catch (err) {
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong...");
  }
};
