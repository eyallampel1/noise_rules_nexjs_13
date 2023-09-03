"use client";

import { ProgressBar } from "primereact/progressbar";
import { handleGuess } from './HandleGuess.js';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import FileSaver from "file-saver";
import Button from "@mui/material/Button";
import FileUploader from "@/app/components/BrowseAndSend/BrowseAndSend";
import withAuth from "../components/withAuth/withAuth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { State } from "../State";
import axios from "axios";
import parallelismRules from "@/app/noise_rules_db/noiseRulesData";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import {
  Autocomplete,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Main_page = () => {
  const [tableData, setTableData] = useState(State.noiseData.noiseRules.get());
  const [totalRows, setTotalRows] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userProvidedPath, setUserProvidedPath] = useState("");
  const [tableVisible, setTableVisible] = useState(false);
  const [errorRows, setErrorRows] = useState([]);
  const [filledRowsCount, setFilledRowsCount] = useState(0);
  const [tooltipContent, setTooltipContent] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle"); // values: 'idle', 'success', 'error'
  const [buttonColor, setButtonColor] = useState("blue");
  const [tableLoaded, setLoadedTable] = useState(
    State.profile.loadedTable.get(),
  );
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

      return true; // Keep the row if none of the conditions are met
    });
  };

  const handleTooltipContent = (event, option) => {
    if (option) {
      const rule = parallelismRules.find((rule) => rule.name === option.label);
      setTooltipContent(rule ? rule.description : "");
    } else {
      setTooltipContent("");
    }
  };

  const handleUserProvidedPathChange = (event) => {
    setUserProvidedPath(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (requestStatus === "idle") {
        setButtonColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
      } else if (requestStatus === "success") {
        setButtonColor("green");
      } else if (requestStatus === "error") {
        setButtonColor("red");
      }
    }, 400);

    return () => clearInterval(interval);
  }, [requestStatus]);


  useEffect(() => {
    updateFilledRowsCount();
  }, [tableData]);

  useEffect(() => {
    State.noiseData.noiseRules.get();
    State.noiseData.noiseRules.set(tableData);
    // Initial setup of filledRowsCount and totalRows when component mounts
    setTotalRows(tableData.length);
    updateFilledRowsCount();
  }, []); // Note the empty dependency array, meaning this effect runs once upon mount.

  const handleSendToCES = () => {
    // Check if the input is empty
    if (!userProvidedPath || userProvidedPath.trim() === "") {
      alert("Please provide a file path.");
      return;
    }

    // Check if the input has a slash, indicating a directory structure
    if (!userProvidedPath.includes("/") && !userProvidedPath.includes("\\")) {
      alert("Please provide a valid file path.");
      return;
    }

    if (!userProvidedPath.endsWith(".prj")) {
      alert("Please provide a valid .prj file path.");
      return; // Exit the function early if the check fails
    }

    const data = {
      tableData: tableData,
      parallelismRules: parallelismRules,
      projectPath: userProvidedPath,
    };

    setIsDialogOpen(false); // Close the dialog
    axios({
      url: `http://${State.user.profile.ip.get()}:4900/sendTableToServer`,
      method: "POST",
      responseType: "blob", // Important
      data,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const date = new Date();
        const timestampStr = `${date.getFullYear()}_${
          date.getMonth() + 1
        }_${date.getDate()}_hour_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
        link.setAttribute("download", `file_${timestampStr}.zip`); // or any other extension
        document.body.appendChild(link);
        link.click();
        setRequestStatus("success");
        setButtonColor("green"); // set the button color to green
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus("error");
        setButtonColor("red"); // set the button color to red on error
      });
  };

  const options = parallelismRules.map((rule) => ({
    label: rule.name,
  }));

  const handleTableData = (data) => {
    setTableData(data);
    updateFilledRowsCount();
    setTotalRows(data.length);
  };

  const updateFilledRowsCount = () => {
    setTotalRows(tableData.length);
    State.noiseData.noiseRules.set(tableData.length);
    let count = tableData.filter(
      (row) => row.inClassNoiseRule && row.outOfClassNoiseRule,
    ).length;
    console.log("Update filled rows count:", count); // Debugging line
    setFilledRowsCount(count);
  };

  const loadTableDataFromFile = (event) => {
    const file = event.target.files[0];

    // Check if the file is a text file
    if (file.type !== "text/plain") {
      alert("Incorrect file type. Please upload a .txt file.");
      return;
    }

    console.log("Selected file:", file); // Log the selected file

    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split("\n");

      // Check the format by examining the first line (headers)
      if (
        !lines[0]
          .trim()
          .match(
            /^Constraint Class\s+In class Noise Rule\s+Out of Class Noise Rule$/,
          )
      ) {
        alert("Incorrect table txt format. Please upload a valid table.");
        return;
      }
      State.profile.loadedTable.set(true);
      setLoadedTable(true);

      let newTableData = lines.slice(1).map((line) => {
        const [constraintClassName, inClassNoiseRule, outOfClassNoiseRule] =
          line.trim().split(/\s+/);
        return { constraintClassName, inClassNoiseRule, outOfClassNoiseRule };
      });

      // Clean the table data using the cleanResponse function
      newTableData = cleanResponse(newTableData);

      console.log("Parsed and cleaned table data:", newTableData); // Log the parsed and cleaned table data

      // Set the table data in Legend State
      State.noiseData.noiseRules.set(newTableData);
      setTableData(newTableData); // You may still want to keep this if you're using tableData elsewhere in this component

      // Update the filled rows count
      updateFilledRowsCount();
      State.noiseData.noiseRules.set(tableData);
    };

    reader.readAsText(file);
    setTableVisible(true);
  };

  const updateErrorRows = (index) => {
    const currentRow = tableData[index];
    const isRowFilled = currentRow.inClassNoiseRule && currentRow.outOfClassNoiseRule; // Assuming both fields should be filled

    setErrorRows((prevErrorRows) => {
      if (isRowFilled) {
        return prevErrorRows.filter((rowIndex) => rowIndex !== index); // Remove row from error list
      } else if (!prevErrorRows.includes(index)) {
        return [...prevErrorRows, index]; // Add row to error list
      } else {
        return prevErrorRows; // Keep the list as-is
      }
    });
  };


  //calling another file
  const onClickHandleGuess = () => {
    State.noiseData.noiseRules.set(tableData);
    const guessedData = handleGuess(tableData);
    const errorIndices = [];

    guessedData.forEach((row, index) => {
      if (!row.inClassNoiseRule || !row.outOfClassNoiseRule) {
        errorIndices.push(index);
      }
    });

    setErrorRows(errorIndices);
    setTableData(guessedData);
    State.noiseData.noiseRules.set(tableData);
  };



  const handleInClassSelection = (index, value) => {
    State.noiseData.noiseRules.set(tableData);
    const updatedTableData = [...tableData];

    // // If a deletion occurred in the input, don't autocomplete
    // if (value && value.label.length < (tableData[index].inClassNoiseRule || '').length) {
    //   return;
    // }

    updatedTableData[index].inClassNoiseRule = value ? value.label : null;
    setTableData(updatedTableData);
    updateFilledRowsCount();
    updateErrorRows(index);
    State.noiseData.noiseRules.set(tableData);
  };


  const handleOutClassSelection = (index, value) => {
    State.noiseData.noiseRules.set(tableData);
    const updatedTableData = [...tableData];
    updatedTableData[index].outOfClassNoiseRule = value ? value.label : null;
    setTableData(updatedTableData);
    updateFilledRowsCount();
    updateErrorRows(index);
    State.noiseData.noiseRules.set(tableData);

  };

  const Confetti = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-pink-500", "bg-purple-500"];
    return (
        <div className="relative w-full h-20 overflow-hidden">
          {Array(100)
              .fill(0)
              .map((_, i) => (
                  <div
                      key={i}
                      className={`${colors[Math.floor(Math.random() * colors.length)]} absolute top-0 w-1 h-4 animate-fall rotate-[${Math.random() * 360}deg]`}
                      style={{
                        left: `${Math.random() * 100}vw`
                      }}
                  />
              ))}
        </div>
    );
  };



  const saveTableDataAsTextFile = () => {
    // if (!tableVisible) {
    //   alert("No table to save");
    //   return;
    // }

    // Determine the maximum length of each column
    let maxLengthConstraintClassName = "Constraint Class".length;
    let maxLengthInClassNoiseRule = "In class Noise Rule".length;
    let maxLengthOutClassNoiseRule = "Out of Class Noise Rule".length;

    tableData.forEach((row) => {
      maxLengthConstraintClassName = Math.max(
        maxLengthConstraintClassName,
        (row.constraintClassName || "").length,
      );
      maxLengthInClassNoiseRule = Math.max(
        maxLengthInClassNoiseRule,
        (row.inClassNoiseRule || "NONE").length,
      );
      maxLengthOutClassNoiseRule = Math.max(
        maxLengthOutClassNoiseRule,
        (row.outOfClassNoiseRule || "NONE").length,
      );
    });

    // Create a text string from the table data with padding
    let text =
      "Constraint Class".padEnd(maxLengthConstraintClassName) +
      " In class Noise Rule".padEnd(maxLengthInClassNoiseRule) +
      " Out of Class Noise Rule\n"; // Table headers
    tableData.forEach((row) => {
      text +=
        (row.constraintClassName || "").padEnd(maxLengthConstraintClassName) +
        " ";
      text +=
        (row.inClassNoiseRule || "NONE").padEnd(maxLengthInClassNoiseRule) +
        " ";
      text +=
        (row.outOfClassNoiseRule || "NONE").padEnd(maxLengthOutClassNoiseRule) +
        "\n";
    });

    // Create a Blob with the text string
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    // Use FileSaver to save the Blob as a .txt file
    FileSaver.saveAs(blob, "table-data.txt");
  };

  const router = useRouter();

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Noise Rule APP
        </h1>

        {/* Button Section 1 */}
        <div className="mb-10">
          <Button
            variant="contained"
            onClick={() => {
              State.noiseData.noiseRules.set(tableData);
              router.push("/noise_rules_db");
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Noise Rules DB
          </Button>
        </div>

        {/* File Uploader Section */}
        <div
          className={`bg-white shadow-md rounded-md p-6 mb-10 w-full border-2 border-dashed border-black max-w-2xl ${
            !tableLoaded && "border-2 border-dashed border-black"
          }`}
        >
          <h2 className="text-center text-xl mb-4">
            1. Start a new project by uploading a .csv file:
          </h2>

          <FileUploader
            onProcessedData={setTableData}
            setLoadedTable={setLoadedTable}
          />
        </div>

        {/* File Operations Section */}
        <div className="bg-white shadow-md rounded-md p-6 mb-10 w-full max-w-2xl border-2 border-dashed border-black">
          <h2 className="text-center text-xl mb-4">
            2. Continue your work or save the table for later editing:
          </h2>

          <div className="flex items-center justify-between">
            <input
              type="file"
              id="loadTable"
              className="hidden"
              onChange={loadTableDataFromFile}
              accept=".txt"
            />
            <label htmlFor="loadTable">
              <Button variant="contained" component="span" className="mr-4">
                Load .txt Table
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={saveTableDataAsTextFile}
              className=" text-white py-2 px-4 rounded"
            >
              Save Table
            </Button>
          </div>
        </div>

        {tableLoaded && (
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1,minWidth:500 }}>
                <LinearProgress variant="determinate"  />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="h5" fontWeight="bold" color="text.secondary">{`${Math.round((filledRowsCount / totalRows) * 100)}%`}</Typography>
              </Box>
            </Box>


            {tableLoaded && (
              <div>
                {filledRowsCount === totalRows ? (
                    <div className="relative text-center">
                      <span className="font-bold text-4xl text-red-500 font-bold animate-scale-up">FINISHED!</span>
                      <Confetti />
                    </div>
                ) : (
                    <span className="font-bold text-4xl text-center">
                      Rows left: {totalRows - filledRowsCount}
        </span>
                )}
              </div>
            )}
          </div>
        )}
        {tableLoaded && (
          <Button variant="contained" onClick={onClickHandleGuess }>
            Let Me Guess
          </Button>
        )}
        {/* Table Rendering Section */}
        {tableData.length > 0 && (
          <div className={"w-full mb-5"}>
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
                  {tableData.map((row, index) => (
                      <TableRow className={errorRows.includes(index) ? "bg-red-500" : ""}>
                      <TableCell>{row.constraintClassName}</TableCell>
                      <TableCell>
                        <Tooltip title={tooltipContent}>
                          <Autocomplete
                            freeSolo={true}
                            clearOnBlur={true}
                            value={
                              options.find(
                                (option) =>
                                  option.label ===
                                  tableData[index].inClassNoiseRule,
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
                                  tableData[index].outOfClassNoiseRule,
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

        {/* Send Table Button */}
        {tableLoaded && (
          <Button
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
            style={{
              backgroundColor: buttonColor, // Change background color to blue (or any other color you prefer)
              fontSize: "20px", // Increase font size
              padding: "15px 40px", // Increase padding for a larger button
              background: buttonColor, // Change background color to blue (or any other color you prefer)
              color: "white", // Change text color to white for contrast
            }}
          >
            Send Table To Server
          </Button>
        )}

        {/* Dialog Section */}
        {/* ... Your Dialog code ... */}

        {/* Dialog Section */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Enter Project Path</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the full path to the project file (.prj):
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="project-path"
              label="Project Path"
              type="text"
              fullWidth
              value={userProvidedPath}
              onChange={handleUserProvidedPathChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="text-blue-500"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendToCES}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default withAuth(Main_page);