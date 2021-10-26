const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/UserModel");

passport.use(
  "signup",
  new localStrategy(
    { passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      try {console.log({requisicao:req.body})
        const user = await UserModel.create({email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
