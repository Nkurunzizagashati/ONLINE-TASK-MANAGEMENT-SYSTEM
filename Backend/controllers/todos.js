const fs = require("fs");

const createTodo = async (req, res) => {
  const todo = req.body;
  if (
    todo.title &&
    todo.description &&
    todo["start-time"] &&
    todo.due &&
    todo.status
  ) {
    // Read the existing JSON file
    fs.readFile("./todo.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).end("Internal Server Error");
        return;
      }

      // Parse the existing JSON data
      let todoList = JSON.parse(data);

      // Add a unique ID to the new todo item
      todo.id = todoList.todo.length + 1;

      // Add the new todo item to the todo list
      todoList.todo.push(todo);

      // Convert the updated object back to a JSON string
      const updatedData = JSON.stringify(todoList, null, 2); // 2 is for indentation

      // Write the updated JSON data back to the file
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

module.exports = createTodo;
