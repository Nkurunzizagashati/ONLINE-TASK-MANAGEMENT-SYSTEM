const express = require("express");
const fs = require("fs");
const {
  createTodoController,
  getTodosController,
  updateTodoController,
} = require("../controllers/todos.js");

const router = express.Router();

router.get("/", getTodosController);

router.post("/", createTodoController);
router.put("/:taskId", updateTodoController);

module.exports = router;
