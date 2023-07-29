const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const app = express();

const upload = multer({ dest: "uploads/" });

// Enable all CORS requests
app.use(cors());

// Dummy users database
const users = [
  {
    username: "john",
    password: "password123",
  },
  {
    username: "jane",
    password: "abc123",
  },
];

app.use(express.json());

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Login successful
    res.send({
      success: true,
      message: "Login successful!",
    });
  } else {
    // Login failed
    res.status(401).send({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  exec(`your_script.sh ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(500)
        .send({ success: false, message: "Error executing script" });
    }

    const result = JSON.parse(stdout); // assuming your script returns a JSON string

    res.send({ success: true, message: "Script executed", result: result });
  });
});

app.listen(4900, () => {
  console.log("Server listening on port 4900");
});