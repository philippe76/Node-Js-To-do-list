const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let task_tab = [];

app.get("/", (req, res) => {
  res.render("index", { tasks: task_tab });
});

app.post("/", (req, res) => {
  task_tab.push(req.body.task);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const found_index = task_tab.findIndex((item) => item === req.params.id);
  console.log(found_index);
  task_tab.splice(found_index, 1);
  res.redirect("/");
});

app.listen(8080, () => console.log("server working on 8080"));
