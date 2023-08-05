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
import withAuth from "@/app/components/withAuth/withAuth";
import { parallelismRules } from "../../noise_rules_db/noiseRulesData";
import Tooltip from "@mui/material/Tooltip";

// Sample data for Autocomplete
// Transform the parallelismRules into the format required for Autocomplete
const options = parallelismRules.map((rule) => ({
  label: rule.name,
}));

function FileUpload({ onTableDataChange, tableData: externalTableData }) {
  const [file, setFile] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [localTableData, setLocalTableData] = useState(externalTableData);

  const cleanResponse = (response) => {
    return response.filter((row) => {
      // Check for rows with all null or empty properties
      if (Object.values(row).every((value) => value == null || value === "")) {
        return false;
      }

      // Check for rows that start with "index" or "Constraint class"
      if (
        row.constraintClassName.trim().toLowerCase() === "index" ||
        row.constraintClassName.trim().toLowerCase() === "constraint class"
      ) {
        return false;
      }

      // Exclude rows with null or empty properties
      return Object.values(row).every(
        (value) => value !== null && value !== "",
      );
    });
  };

  const [tooltipContent, setTooltipContent] = useState("");

  const handleTooltipContent = (event, option) => {
    if (option) {
      const rule = parallelismRules.find((rule) => rule.name === option.label);
      setTooltipContent(rule ? rule.description : "");
    } else {
      setTooltipContent("");
    }
  };

  const handleInClassSelection = (index, value) => {
    const updatedData = [...localTableData];
    updatedData[index].inClassNoiseRule = value ? value.label : null;
    setLocalTableData(updatedData);
    onTableDataChange(updatedData);
  };

  const handleOutClassSelection = (index, value) => {
    const updatedData = [...localTableData];
    updatedData[index].outOfClassNoiseRule = value ? value.label : null;
    setLocalTableData(updatedData);
    onTableDataChange(updatedData);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = (event) => {
    event.preventDefault();

    // Check if the file is selected and its type is .csv
    if (file && file.name.endsWith(".csv")) {
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
    } else {
      // Alert the user if the file is not a .csv
      alert("Please upload a .csv file!");
    }
  };

  useEffect(() => {
    if (serverResponse) {
      const initData = serverResponse.map((row) => ({
        constraintClassName: row.constraintClassName,
        inClassNoiseRule: null,
        outOfClassNoiseRule: null,
      }));
      setLocalTableData(initData);
      onTableDataChange(initData);
    }
  }, [serverResponse, onTableDataChange]);

  useEffect(() => {
    setLocalTableData(externalTableData);
    onTableDataChange(externalTableData);
  }, [externalTableData, onTableDataChange]);

  return (
    <div>
      <div className={"flex justify-center items-center space-x-20 container"}>
        <Input type="file" onChange={onFileChange} accept=".csv" />
        <Button variant="contained" onClick={onFileUpload}>
          Send .CSV to Server
        </Button>
      </div>
      {localTableData && localTableData.length > 0 && (
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
                {localTableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.constraintClassName}</TableCell>
                    <TableCell>
                      <Tooltip title={tooltipContent}>
                        <Autocomplete
                          value={
                            options.find(
                              (option) =>
                                option.label ===
                                localTableData[index].inClassNoiseRule,
                            ) || null
                          }
                          onChange={(_, value) =>
                            handleInClassSelection(index, value)
                          }
                          onHighlightChange={handleTooltipContent}
                          disablePortal
                          id={`autocomplete-in-class-${index}`}
                          options={options}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="InClass Rule" />
                          )}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip title={tooltipContent}>
                        <Autocomplete
                          value={
                            options.find(
                              (option) =>
                                option.label ===
                                localTableData[index].outOfClassNoiseRule,
                            ) || null
                          }
                          onChange={(_, value) =>
                            handleOutClassSelection(index, value)
                          }
                          onHighlightChange={handleTooltipContent}
                          disablePortal
                          id={`autocomplete-out-class-${index}`}
                          options={options}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="OutClass Rule" />
                          )}
                        />
                      </Tooltip>
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

export default withAuth(FileUpload);