import express from "express";
import fs from "fs";

import {
  createTodoController,
  getTodosController,
} from "../controllers/todos.js";

const router = express.Router();

router.get("/", getTodosController);

router.post("/", createTodoController);

export default router;
