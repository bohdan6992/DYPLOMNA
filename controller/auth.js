const Role = require('../model/schemas/role');
const User = require('../model/schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { validationResult  } = require('express-validator');


const { secret } = require('../config/config')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }

  return jwt.sign(payload, secret, {expiresIn: '1h'});
}

const authController = {
  registration: async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(`Registration error ${errors.errors[0].msg}`);
      }

      const { username, password } = req.body;
      const newUser = await User.findOne({username});
      if (newUser) {
        return res.send('Username already exist');
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const userRole  = await Role.findOne({value: "ADMIN"})
      const user = new User({username, password: hashPassword, roles: [userRole.value]});
      user.save();

      return res.send('User created')
    } catch (e) {
      console.log(e);
      res.send('Registration error');
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.send(`Username ${username} not found`);
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.send('Password error');
      }

      const token = generateAccessToken(user._id, user.roles)

      return res
        .cookie('access_token', token)
        .json({token, page: '/admin'});

    } catch (e) {
      console.log(e);
      res.send('Login error')
    }
  },

  logout: async (req, res) =>{
    return res
      .clearCookie('access_token')
      .redirect('http://127.0.0.1:3000/auth/login');

  },

  getRegistrationPage: async (req, res) => {
    res.render('auth');
  },
  getLoginPage: async (req, res) => {
    res.render('auth');
  }
}

module.exports = authController;