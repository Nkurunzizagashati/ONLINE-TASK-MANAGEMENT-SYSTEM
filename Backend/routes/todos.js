const express = require("express");
const fs = require("fs");
const createTodo = require("../controllers/todos");

const router = express.Router();

router.get("/", (req, res) => {
  res.end("Hello from the server todo");
});

router.post("/", createTodo);

module.exports = router;
