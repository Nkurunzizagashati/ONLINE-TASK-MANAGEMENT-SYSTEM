import { createTodoController } from "../controllers/todos.js";
import fs from "fs";

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

    await createTodo(req, res);

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
