const express = require("express");
const todoRouter = require("./routes/todos");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/todo", todoRouter);
const server = app.listen(PORT, () => {
  console.log(`the server started on PORT ${PORT}`);
});
