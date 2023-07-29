"use client";
import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import TextField from "@mui/material/TextField";

function FileUpload() {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    // send the formData object to the server via axios
    axios
      .post("http://localhost:4900/upload", formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Input type="file" onChange={onFileChange} />
      <Button variant="contained" onClick={onFileUpload}>
        Upload
      </Button>
    </div>
  );
}

export default FileUpload;