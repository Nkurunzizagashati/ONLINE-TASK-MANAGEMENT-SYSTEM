$(document).ready(() => {
  console.log("hello from the create-todo page");
  $("#myForm").on("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    const formData = new FormData(this);
    let formValues = {};

    // Loop through form data and store values in the object
    formData.forEach(function (value, key) {
      formValues[key] = value;
    });

    // Make a POST request to the server
    $.post("http://localhost:5000/todo", formValues)
      .done(function (response) {
        // Handle successful response
        console.log("Response from server:", response);
      })
      .fail(function (xhr, status, error) {
        // Handle errors
        console.error("Error:", error);
      });
  });
});
