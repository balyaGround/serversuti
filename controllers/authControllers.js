const jwt = require("jsonwebtoken");
// const { Op } = require("sequelize");
const { user } = require("../models");

class AuthController {
  //this for setup
  signUpCtrl = async (req, res, next) => {
    try {
      const newData = await user.create(req.body);
      const data = await user.findOne({
        where: { id: newData.id },
      });

      next({ value: newData, message: "OK", statusCode: 201 });
    } catch (error) {
      next(error);
    }
  };

  GetTokenCtrl = async (req, res, next) => {
    try {
      const identity = {
        user: req.user.id,
        username: req.user.username,
        email: req.user.email,
      };

      const token = await jwt.sign(identity, process.env.JWT_SECRET, {
        expiresIn: "48h",
      });

      const data = await user.findOne({ _id: req.user.id });

      next({
        value: { id: data._id, username: data.username, token },
        message: "OK",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };

  signUpCtrl = async (req, res, next) => {
    try {
      const data = await user.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      const find = await user.findOne({ email: req.body.email });
      next({
        value: find,
        message: "OK",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };

  getUsrCtrl = async (req, res, next) => {
    try {
      const data = await user.findOne({ email: req.user.email });
      next({
        value: data,
        message: "OK",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
