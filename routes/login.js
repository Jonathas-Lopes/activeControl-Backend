const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const secret = require("../env.json").secret;

router.post("/login", async (req, res, next) => {
  //console.log(req.body)
  passport.authenticate("login", async (err, user, info) => {
    console.log(user);
    try {
      if (err || !user) {
        const error = new Error("Snake, snake, snake!!!");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          name: user.name,
          _id: user._id,
          email: user.email,
          admin: user.admin,
        };

        const token = jwt.sign({ user: body }, secret, { expiresIn: "180m" });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("ok");
});

module.exports = router;
//123465
