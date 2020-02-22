const router = require("express").Router();
const bcrypt = require('bcrypt.js')
const jwt = require('jsonwebtoken')
const authenticate = require('./authenticate-middleware')

const userModel = require('./auth-model')

function gen

router.post("/register", async (req, res, next) => {
  try {
    const user = await 
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});


module.exports = router;
