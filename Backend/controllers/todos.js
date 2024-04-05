// import fs from "fs";
const fs = require("fs");

const createTodoController = async (req, res) => {
  const todo = req.body;
  if (
    todo.title &&
    todo.description &&
    todo["start-time"] &&
    todo.due &&
    todo.status
  ) {
    fs.readFile("./todo.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).end("Internal Server Error");
        return;
      }

      let todoList = JSON.parse(data);
      todo.id = todoList.todo.length + 1;
      todoList.todo.push(todo);

      const updatedData = JSON.stringify(todoList, null, 2);

      fs.writeFile("./todo.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).end("Internal Server Error");
        } else {
          res.status(201).end("Todo created successfully!");
        }
      });
    });
  } else {
    res.status(400).end("Bad request");
  }
};

const getTodosController = async (req, res) => {
  console.log(`request ${req}`);
  fs.readFile("./todo.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).end("Internal Server Error");
      return;
    }
    const todoList = data;
    res.json(todoList);
  });
};

const updateTodoController = async (req, res) => {
  const task_id = req.params.taskId; // Assuming taskId is part of the route params
  const { status } = req.body;

  console.log(`task id: ${task_id}, new status: ${status}`);

  if (!task_id || !status) {
    return res.status(400).json({
      error: "You need to provide both task_id to update and new status",
    });
  }

  try {
    // Read the todo list from the file
    const data = fs.readFileSync("./todo.json", "utf-8");
    let todoList = JSON.parse(data).todo;

    // Find the task with the specified task_id and update its status
    todoList.forEach((task) => {
      console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥");
      if (task.id == task_id) {
        task.status = status;
      }
    });

    console.log(`Todo list: ${JSON.stringify(todoList, null, 2)}`);

    // Write the updated todo list back to the file
    fs.writeFileSync(
      "./todo.json",
      JSON.stringify({ todo: todoList }, null, 2)
    );

    return res
      .status(200)
      .json({ message: "Todo has been updated successfully!" });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTodoController,
  getTodosController,
  updateTodoController,
};
