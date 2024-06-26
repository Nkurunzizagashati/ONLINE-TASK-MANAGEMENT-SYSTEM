$(document).ready(async () => {
  let tasks; // Define tasks variable in the outer scope

  try {
    console.log("Sending the request ...");
    const response = await $.get("http://localhost:5000/todo");
    tasks = response.todo;
    console.log(`tasks: ${tasks}`);
    renderTodos(); // Call renderTodos() after tasks has been assigned
  } catch (e) {
    console.log(`something went wrong: ${e.message}`);
  }

  // Render function to display tasks
  const renderTodos = () => {
    const renderTaskInfo = (tasks, elementClass) => {
      let title;
      if (elementClass === ".done") {
        title = "Completed";
      } else if (elementClass === ".todo") {
        title = "Todo";
      } else {
        title = "Urgent";
      }
      $(elementClass).append(`<h2>${title}</h2>`);
      tasks.forEach((task) => {
        $(elementClass).append(`<div class="task-container">
                <div key=${task.id} class="todo-info">
                  <p>Title: ${task.title}</p>
                  <p>Description: ${task.description}</p>
                  <p>StartTime: ${task["start time"]}</p>
                  <p>Due: ${task.due}</p>
                  <p>Status: ${task.status}</p>
                  <button class="mark-complete" data-id="${task.id}">${
          elementClass === ".done" ? "Mark as Incomplete" : "Mark as Completed"
        }</button>
                </div>
              </div>`);
      });
    };

    // Check if tasks is defined before filtering
    if (!tasks) return;

    const todos = tasks.filter(
      (task) => task.status !== "completed" && task.status !== "urgent"
    );

    const completedTasks = tasks.filter((task) => task.status === "completed");
    const urgentTasks = tasks.filter((task) => task.status === "urgent");

    // Clear existing content
    $(".todo").empty();
    $(".done").empty();
    $(".urgent").empty();

    // Render todos
    renderTaskInfo(todos, ".todo");

    // Render completed tasks
    renderTaskInfo(completedTasks, ".done");
    renderTaskInfo(urgentTasks, ".urgent");
  };

  // Event listener for "Mark as Completed" button
  $(document).on("click", ".mark-complete", async function () {
    const taskId = $(this).data("id");

    // Update task status in tasks array
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.status = task.status === "completed" ? "pending" : "completed";
      }
    });

    console.log("Updated tasks:", tasks);

    // Re-render UI
    renderTodos();
  });
});
