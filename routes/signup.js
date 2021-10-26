const express  = require("express");
const router   = express.Router();
const path     = require("path");
const passport = require("passport");

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "registrado com sucesso",
      user: req.user,
    });
  }
);

module.exports = router;
