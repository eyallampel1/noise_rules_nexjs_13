const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const app = express();

const upload = multer({ dest: "uploads/" });
const fs = require("fs").promises;

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

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  exec(`./ConstarintScript.sh ${filePath}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(500)
        .send({ success: false, message: "Error executing script" });
    }

    try {
      const data = await fs.readFile("out.txt", "utf8");

      const lines = data.split("\n");
      const jsonObj = lines.map((line, index) => ({
        constraintClassName: line,
      }));

      await fs.writeFile(
        "output.json",
        JSON.stringify(jsonObj, null, 2),
        "utf8",
      );

      console.log("File has been saved!");

      // Parse output.json
      let outputJsonData = await fs.readFile("output.json", "utf8");
      let result;
      try {
        result = JSON.parse(outputJsonData);
      } catch (e) {
        console.error(`Error parsing script output: ${e}`);
        result = stdout;
      }

      res.send({ success: true, message: "Script executed", result: result });
    } catch (err) {
      console.error("Error reading/writing file:", err);
      return res
        .status(500)
        .send({ success: false, message: "Error reading/writing file" });
    }
  });
});

app.listen(4900, () => {
  console.log("Server listening on port 4900");
});