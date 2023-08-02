import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Sample data for Autocomplete
const options = [
  { label: "ANALOG_1_OUT" },
  { label: "NONE" },
  { label: "GBE_ANALOG_OUT_ems" },
  { label: "GBE_ANALOG_OUT" },
  { label: "MGT_IN" },
  { label: "MGT_OUT" },
  { label: "CRITICAL_NT" },
  { label: "CRITICAL_T_IN" },
  { label: "FAST_OUT" },
  { label: "FAST_IN" },
  { label: "REGULAR" },
  // ...add more options here
];

function FileUpload({ onTableDataChange }) {
  const [file, setFile] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const cleanResponse = (response) => {
    return response.filter((row) => {
      console.log(row);
      // Exclude rows with constraintClassName being "Constraint Class" or "index"
      if (
        row.constraintClassName === "Constraint class" ||
        row.constraintClassName === "Index"
      ) {
        return false;
      }

      // Exclude rows with null or empty properties
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
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:4900/upload", formData)
      .then((response) => {
        console.log(response);
        const cleanedResponse = cleanResponse(response.data.result); // Applying the clean function
        setServerResponse(cleanedResponse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (serverResponse) {
      onTableDataChange(serverResponse);
    }
  }, [serverResponse]);

  return (
    <div>
      <div className={"flex justify-center items-center space-x-20 container"}>
        <Input type="file" onChange={onFileChange} accept=".csv" />
        <Button variant="contained" onClick={onFileUpload}>
          Upload
        </Button>
      </div>

      {serverResponse && (
        <div>
          <h2>Server Response:</h2>
          <TableContainer
            component={Paper}
            style={{ height: "800px", overflow: "auto" }}
          >
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#27E537" }}>
                    <Typography variant="h6">Constraint Class</Typography>
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#27E537" }}>
                    <Typography variant="h6">In class Noise Rule</Typography>
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#27E537" }}>
                    <Typography variant="h6">
                      Out of Class Noise Rule
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serverResponse.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.constraintClassName}</TableCell>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id={`autocomplete-in-class-${index}`}
                        options={options}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} label="InClass Rule" />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id={`autocomplete-out-class-${index}`}
                        options={options}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} label="OutClass Rule" />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default FileUpload;