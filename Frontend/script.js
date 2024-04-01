$(document).ready(async () => {
  let tasks;
  try {
    const response = await $.get("http://localhost:3000/todo");
    tasks = response;
  } catch (e) {
    console.log(`something went wrong: ${e.message}`);
  }
  console.log(tasks);

  const renderTodos = () => {
    const todos = tasks.filter(
      (task) => task.status !== "completed" && task.status !== "urgent"
    );

    const completed = tasks.filter((task) => task.status === "completed");

    // Clear existing content
    $(".todo").empty();
    $(".done").empty();

    // Render todos
    todos &&
      todos.forEach((todo) => {
        $(".todo").append(`<div class="task-container">
          <div key=${todo.id} class="todo-info">
            <p>Title: ${todo.title}</p>
            <p>Description: ${todo.description}</p>
            <p>StartTime: ${todo["start time"]}</p>
            <p>Due: ${todo.due}</p>
            <p>Status: ${todo.status}</p>
            <button class="mark-complete" data-id="${todo.id}">Mark as Completed</button>
          </div>
        </div>`);
      });

    // Render completed tasks
    completed &&
      completed.forEach((task) => {
        $(".done").append(`<div class="task-container">
          <div key=${task.id} class="todo-info">
            <p>Title: ${task.title}</p>
            <p>Description: ${task.description}</p>
            <p>StartTime: ${task["start time"]}</p>
            <p>Due: ${task.due}</p>
            <p>Status: ${task.status}</p>
          </div>
        </div>`);
      });
  };

  // Initial rendering
  renderTodos();

  // Event listener for "Mark as Completed" button
  $(document).on("click", ".mark-complete", async function () {
    const taskId = $(this).data("id");

    // Update task status in tasks array
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.status = "completed";
      }
    });

    console.log("Updated tasks:", tasks);

    // Re-render UI
    renderTodos();
  });
});
