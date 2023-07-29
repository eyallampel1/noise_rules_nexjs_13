import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:4900/upload", formData)
      .then((response) => {
        console.log(response);
        setServerResponse(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Input type="file" onChange={onFileChange} />
      <Button variant="contained" onClick={onFileUpload}>
        Upload
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Constraint Class</TableCell>
              <TableCell>In Class Noise Rule</TableCell>
              <TableCell>Out of Class Noise Rule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serverResponse &&
              serverResponse.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.constraintClassName}</TableCell>
                  <TableCell>
                    <Select>
                      <MenuItem value={10}>Option 1</MenuItem>
                      <MenuItem value={20}>Option 2</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select>
                      <MenuItem value={10}>Option 1</MenuItem>
                      <MenuItem value={20}>Option 2</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FileUpload;