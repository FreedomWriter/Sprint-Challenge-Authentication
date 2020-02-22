const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const authenticate = require("./authenticate-middleware");

const userModel = require("./auth-model");

function genToken(user) {
  return jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

router.post("/register", async (req, res, next) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const saved = await userModel.add(user);
    const token = await genToken(saved);

    res.status(201).json({
      message: `Welcome ${user.username}`,
      token: token,
      user_id: user.id
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      const token = genToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token: token,
        user_id: user.id
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
