const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const secret = require("../env.json").secret

passport.use(
    new JWTstrategy(
      {
        secretOrKey: secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        console.log('teste')
        try {
          return done(null, token.user);
        } catch (error) {
            console.log('teste')
          done(error);
        }
      }
    )
  );