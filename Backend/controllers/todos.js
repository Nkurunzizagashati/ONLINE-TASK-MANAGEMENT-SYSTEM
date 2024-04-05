import fs from "fs";

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

export { createTodoController, getTodosController };
