$(document).ready(async () => {
  let todos;
  try {
    // Use $.get without a callback
    const response = await $.get("http://localhost:3000/todo");
    todos = response; // Assign the response data to todos
  } catch (e) {
    console.log(`something went wrong: ${e.message}`);
  }
  console.log(todos);

  // Check if todos is an array and append HTML for each todo
  if (Array.isArray(todos)) {
    todos.forEach((todo) => {
      // <div class="tasks-container">
      //       <div class="todo-info">
      //         <p>Title:</p>
      //         <p>Description:</p>
      //         <p>Start time:</p>
      //         <p>Due:</p>
      //         <p>Status: pending</p>
      //       </div>
      // Append HTML content for each todo to the .tasks-container element
      $(".todo").append(`<div class="task-container">
      <div class="todo-info">
        <p>Title: ${todo.title}</>
        <p>Description: ${todo.description}</>
        <p>StartTime: ${todo["start time"]}</>
        <p>Due: ${todo.due}</>
        <p>Status: ${todo.status}</>
      </div>
      </div>`);
    });
  }
});
