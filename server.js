require("dotenv").config();
// console.log(process.env);
const mongoose = require("mongoose");

const bootstrap = require("bootstrap");

const { Schema, model } = mongoose;

const express = require("express");
app = express();
port = 8080;

const router = express.Router();
app.use(express.static("public/"));
app.use(express.json());

// const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.PASS);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${password}@${process.env.HOST}`
);

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.post("/login", function (req, res) {
  res.send("/public/homepage.html");
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

const logger = (req, res, next) => {
  console.log("url:", req.url);
  next();
};

app.use(logger);

app.listen(process.env.PORT || 8080);
