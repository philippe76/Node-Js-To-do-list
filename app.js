const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// CONFIGURATION EXPRESS //
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONNECTION TO MONGODB //
dotenv.config({ path: "./config.env" }); // To use environment variables in config.env

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// CREATING MODEL WITH MONGOOSE //
const taskSchema = {
  name: String
};

const Task = mongoose.model("Task", taskSchema);

// CREATING ROUTES //
app.get("/", (req, res) => {
  Task.find((err, tasks) => {
    res.render("index", { tasks: tasks });
  });
  // res.send("test test"
});

app.post("/", (req, res) => {
  const task = new Task({
    name: req.body.task
  });
  task.save();
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  Task.deleteOne({ name: req.params.id }, (err) => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.listen(4000, () => console.log("server working on 4000"));
