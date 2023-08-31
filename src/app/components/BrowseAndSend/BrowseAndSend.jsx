import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { State } from "@/app/State";

function FileUpload({ onProcessedData, setLoadedTable }) {
  const [file, setFile] = useState(null);

  const cleanResponse = (response) => {
    return response.filter((row) => {
      if (Object.values(row).every((value) => value == null || value === "")) {
        return false;
      }

      if (
        row.constraintClassName.trim().toLowerCase() === "index" ||
        row.constraintClassName.trim().toLowerCase() === "constraint class"
      ) {
        return false;
      }

      return Object.values(row).every(
        (value) => value !== null && value !== "",
      );
    });
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = (event) => {
    event.preventDefault();

    if (file && file.name.endsWith(".csv")) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(`http://${State.user.profile.ip.get()}:4900/upload`, formData)
        .then((response) => {
          const cleanedResponse = cleanResponse(response.data.result);
          onProcessedData(cleanedResponse);
          State.profile.loadedTable.set(true);
          setLoadedTable(true);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Please upload a .csv file!");
    }
  };

  return (
    <div className="flex justify-center items-center space-x-20 container">
      <Input type="file" onChange={onFileChange} accept=".csv" />
      <Button variant="contained" onClick={onFileUpload}>
        Send .CSV to Server
      </Button>
    </div>
  );
}

export default FileUpload;