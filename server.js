require("dotenv").config();
const User = require("./public/models/User");
const express = require("express");
const session = require("express-session");

// const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
app.use(express.static("public/"));
app.use(express.json());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);

// app.use(cookieParser);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const passport = require("passport");

const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  console.log("SerializeUser:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id, "name email _id");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("GitHub Authentication Successful");
      console.log(profile); // Log the user profile for debugging
      try {
        const user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            email: profile.email,
            name: profile.displayName,
            githubId: profile.id,
          });

          const savedUser = await newUser.save();

          return done(null, savedUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
// GitHub OAuth2 login route
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth2 callback route
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  function (req, res) {
    res.redirect("/homepage.html");
  }
);
//__________________________________________________________________________
const password = encodeURIComponent(process.env.PASS);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${password}@${process.env.HOST}`
);

app.get("/", function (req, res) {
  res.redirect("index.html");
});

app.post("/login", function (req, res) {
  console.log("Signing in normally");
  res.redirect("homepage.html");
});

app.post("/add", async (req, res) => {
  const result = await collection.insertOne(req.body);
  res.json(result);
});

app.post("/update", async (req, res) => {
  const result = await collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { name: req.body.name } }
  );

  res.json(result);
});

app.post("/remove", async (req, res) => {
  const result = await collection.deleteOne({
    _id: new ObjectId(req.body._id),
  });

  res.json(result);
});

// Start the Express server
const logger = (req, res, next) => {
  console.log("url:", req.url);
  next();
};

app.use(logger);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is running on port ${port}`)
);
