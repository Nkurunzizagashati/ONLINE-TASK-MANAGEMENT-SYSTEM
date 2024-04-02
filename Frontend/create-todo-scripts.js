const jsonFile = require("jsonfile");

$("document").ready(() => {
  console.log("hello from the create-todo page");
  $("#myForm").on("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    let formValues = {};

    // Loop through form data and store values in the object
    formData.forEach(function (value, key) {
      formValues[key] = value;
    });

    jsonfile.readFile("data.json", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      // Append new data to the existing JSON object
      data.push(newData);

      // Write the updated JSON data back to the file
      jsonfile.writeFile("data.json", data, { spaces: 2 }, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Data appended to file successfully.");
        }
      });
    });

    console.log(formValues);
  });
});
