// libs
const bcrypt = require('bcrypt');

const userService = require("../service/user.service");

const { generateAccessToken, generateRefreshToken } = require('../helpers');

module.exports = {
  signup: async (req, res) => {
    const avatar = req.body.data.avatar || "";
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const email = req.body.data.email;
    const password = req.body.data.password;
    
    
    // check email exist
    const emailExisted = await userService.findEmail(email);
    if(emailExisted) {
      res.status(400).json({
        msg: "Email already exisited",
        isSucess: false,
      });
      return;
    }
    
    // hashpassword
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);

    const payload = {
      avatar,
      firstName,
      lastName,
      email,
      password: hasPassword,
    };
    try {
      const user = await userService.create(payload);
      res.status(200).json({
        msg: "Create user success",
        isSucess: true,
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        msg: "Create user error",
        isSucess: false,
        data: null,
        error: err,
      });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body?.data || {};

    // check email
    const user = await userService.findEmail(email);
    if(!user) {
      res.status(400).json({
        msg: "Email or password is wrong",
        isSucess: false,
        data: null,
      });
      return;
    }

    // check password
    const isValidPassword = bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      res.status(400).json({
        msg: "Email or password is wrong",
        isSucess: false,
        data: null,
      });
      return;
    }

    // jwt
    const payload = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email
      }
    }
    try {
      const access_token = generateAccessToken(payload);
      const refresh_token = generateRefreshToken(payload);
      
      res.header('x-aut-token', access_token).json({
        msg: 'Login Successfully!',
        isSuccess: true,
        data: {
          access_token,
          refresh_token
        }
      })
    } catch (err) {
      res.status(500).json({
        msg: "Register user error",
        isSucess: false,
        data: null,
        error: err,
      });
    }

  },

  logout: async (req, res) => {},

  resetPassword: async (req, res) => {},

  getAllUsers: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startOffSet = (page - 1) * limit;
    const endOfSet = startOffSet + limit;

    try {
      const users = await userService.findAll();
      const total = users.length;
      const payload = {
        data: users.slice(startOffSet, endOfSet),
        total,
        page,
        limit
      }
      res.status(200).json({
        msg: "Get user success",
        isSucess: true,
        ...payload,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Get user error",
        isSucess: false,
        data: null,
        error: err,
      });
    }

  },

  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await userService.findOne(id);
      res.status(200).json({
        msg: "Get user success",
        isSucess: true,
        data: user
      });
    } catch (err) {
      res.status(500).json({
        msg: "Get user error",
        isSucess: false,
        data: null,
        error: err,
      });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const payload = {};

    if(firstName) payload.firstName = firstName;
    if(lastName) payload.lastName = lastName;
    try {
      const user = await userService.update(id, payload);
      if(!user) {
        res.status(400).json({
          msg: "User not found",
          isSucess: false
        });
        return;
      }
      res.status(200).json({
        msg: "Update successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Error",
        isSucess: false,
        error: err,
      });
    }

  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await userService.delete(id);
      if(!user) {
        res.status(400).json({
          msg: "User not found",
          isSucess: false
        });
        return;
      }
      res.status(200).json({
        msg: "Delete successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Error",
        isSucess: false,
        error: err,
      });
    }
  },
};
