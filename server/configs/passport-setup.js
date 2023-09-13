const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const User = require("../modals/userSchema");
const generatePassword = require("generate-password");

const passwordOptions = {
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  excludeSimilarCharacters: true,
};

passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "/api/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const randomPassword = generatePassword.generate(passwordOptions);

      User.findOne({ email: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log("user is", existingUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.id,
            password: randomPassword,
            imageUrl: profile.photos.value,
            socialLogin: true,
          })
            .save()
            .then((newUser) => {
              console.log(newUser);
            });
          console.log(profile);
        }
      });
    }
  )
);
