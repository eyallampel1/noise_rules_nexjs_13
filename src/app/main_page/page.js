"use client";
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

const Main_page = () => {
  const [tableData, setTableData] = useState(State.noiseData.noiseRules.get());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userProvidedPath, setUserProvidedPath] = useState("");
  const [tableVisible, setTableVisible] = useState(false);
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

  const handleUserProvidedPathChange = (event) => {
    setUserProvidedPath(event.target.value);
  };

  useEffect(() => {
    // Initialize an interval to change the button color every 2 seconds
    const interval = setInterval(() => {
      setButtonColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
    }, 500);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTableData = (data) => {
    setTableData(data);
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
    };

    reader.readAsText(file);
    setTableVisible(true);
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
        <h1 className="text-4xl font-bold text-blue-700 mb-10">Main Page</h1>

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

        {/* File Operations Section */}
        <div className="bg-white shadow-md rounded-md p-6 mb-10 w-full max-w-xl border-2 border-dashed border-black">
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
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save Table
            </Button>
          </div>
        </div>

        {/* File Uploader Section */}
        <div
          className={`bg-white shadow-md rounded-md p-6 mb-10 w-full max-w-xl ${
            !tableLoaded && "border-2 border-dashed border-black"
          }`}
        >
          <h2 className="text-center text-xl mb-4">
            1. Start a new project by uploading a .csv file:
          </h2>
          <FileUploader
            onTableDataChange={handleTableData}
            tableData={tableData}
          />
        </div>

        {/* Send Table Button */}
        {tableLoaded && (
          <div className="mb-10">
            <Button
              variant="contained"
              onClick={() => setIsDialogOpen(true)}
              className="text-white bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded text-xl"
            >
              Send Table to Server
            </Button>
          </div>
        )}

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