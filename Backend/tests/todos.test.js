const {
  createTodoController,
  updateTodoController,
} = require("../controllers/todos.js");

const fs = require("fs");

// Mock fs module
jest.mock("fs");

describe("createTodo", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  it("should create a new todo and write to todo.json file", async () => {
    const req = {
      body: {
        title: "Test Todo",
        description: "This is a test todo",
        "start-time": "2024-04-05",
        due: "2024-04-06",
        status: "todo",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking express res.status() method
      end: jest.fn(),
    };
    const mockTodoList = { todo: [] };
    const mockWriteFileCallback = jest.fn();

    // Mock fs.readFile to return mockTodoList
    fs.readFile.mockImplementation((path, options, callback) => {
      callback(null, JSON.stringify(mockTodoList));
    });

    // Mock fs.writeFile to call mockWriteFileCallback
    fs.writeFile.mockImplementation((path, data, callback) => {
      mockWriteFileCallback();
      callback(null);
    });

    await createTodoController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.end).toHaveBeenCalledWith("Todo created successfully!");
    expect(mockWriteFileCallback).toHaveBeenCalled();
  });

  it("should respond with 400 Bad request if required fields are missing", async () => {
    const req = {
      body: {}, // Missing required fields
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking express res.status() method
      end: jest.fn(),
    };

    await createTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.end).toHaveBeenCalledWith("Bad request");
  });

  // Add more test cases to cover other scenarios
});

describe("updateController", () => {
  it("should send 400 status if the request is missing either the new status, or task_id", () => {
    const req = { body: {} }; // Empty request body
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking the status method to allow method chaining
      end: jest.fn(),
    };

    updateTodoController(req, res);
    expect(res.status).toBeCalledWith(400); // Asserting that status code 400 is sent
  });

  it("should update the task when both task_id and status are provided", async () => {
    const req = { body: { task_id: 1, status: "completed" } }; // Request with task_id and status
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking the status method to allow method chaining
      json: jest.fn(), // Mocking the json method
    };

    await updateTodoController(req, res);

    // Asserting that status code is 201, indicating success
    expect(res.status).toHaveBeenCalledWith(201);
    // Asserting that the response body contains the success message
    expect(res.json).toHaveBeenCalledWith({
      message: "Todo has been updated successfully!",
    });

    // Additional assertions can be added to validate the updated todo list
  });
});
