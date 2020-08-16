const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// To use environment variables in config.env
dotenv.config({ path: "./config.env" });

const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = {
  name: String,
};

const Task = mongoose.model("Task", taskSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let task_tab = [];

app.get("/", (req, res) => {
  res.render("index", { tasks: task_tab });
  console.log(process.env.DATABASE);
});

app.post("/", (req, res) => {
  const task = new Task({
    name: req.body.task,
  });
  task_tab.push(task.name);
  task.save();

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const found_index = task_tab.findIndex((item) => item === req.params.id);
  console.log(found_index);
  task_tab.splice(found_index, 1);
  res.redirect("/");
});

app.listen(8080, () => console.log("server working on 8080"));
