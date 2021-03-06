const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password || !email) {
    res.status(400).json({ message: "Provide username, password and email!" });
    return;
  }

  // if (password.length < 7) {
  //   res
  //     .status(400)
  //     .json({
  //       message:
  //         "Please make your password at least 8 characters long for security reasons.",
  //     });
  //   return;
  // }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      // console.log(err)
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: req.body.username,
      passwordHash: hashPass,
      email: req.body.email,
    });

    aNewUser.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      // never ever return password hash via api!
      res.json({ id: theUser._id, username: theUser.username, email: theUser.email });
    });
  })(req, res, next);
});

// GET "/checkuser" allows the client to check to see:
// (a) if we are logged-in
// (b) the details of the logged-in user (if any)
authRoutes.get("/checkuser", (req, res, next) => {
  if (req.user) {
    // never ever return password hash via api!
    res.json({ id: req.user._id, username: req.user.username, email: req.user.email });
  } else {
    // unauthorized http code
    res.sendStatus(401);
  }
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.sendStatus(204);
});
module.exports = authRoutes;
