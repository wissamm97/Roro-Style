const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../model/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "950856591792-qlkf18tc453ggiuftnpq7ubsq0pi8c28.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://rorostyle.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


