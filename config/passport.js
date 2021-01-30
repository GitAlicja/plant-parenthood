const User = require("../models/user-model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs"); // !!!
const passport = require("passport");

passport.serializeUser((loggedInUser, done) => done(null, loggedInUser._id));

passport.deserializeUser((userId, done) => {
  User.findById(userId, (err, user) => done(err, user));
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }

    // Return always same error on user not found or invalid password. This prevents account guessing.
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return done(null, false, { message: "Incorrect username or password." });
    }

    done(null, user);
  });
}));
