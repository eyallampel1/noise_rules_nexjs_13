"use client";
import FileSaver from "file-saver";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploader from "@/app/components/BrowseAndSend/BrowseAndSend";
import withAuth from "../components/withAuth/withAuth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { State } from "../State";

const Main_page = () => {
  const [tableData, setTableData] = useState(State.noiseData.noiseRules.get());

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

  const handleTableData = (data) => {
    setTableData(data);
  };

  const loadTableDataFromFile = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // Log the selected file

    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split("\n");
      let newTableData = lines.slice(1).map((line) => {
        const [constraintClassName, inClassNoiseRule, outOfClassNoiseRule] =
          line.split(" ");
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
  };

  const saveTableDataAsTextFile = () => {
    // Create a text string from the table data
    let text = "Constraint Class In class Noise Rule Out of Class Noise Rule\n"; // Table headers
    tableData.forEach((row) => {
      text += `${row.constraintClassName} ${row.inClassNoiseRule || "NONE"} ${
        row.outOfClassNoiseRule || "NONE"
      }\n`;
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
      <div>
        <h1>main page</h1>
        <div
          className={
            "flex justify-center items-center space-x-20 container mb-10"
          }
        >
          <Button
            variant="contained"
            onClick={() => {
              State.noiseData.noiseRules.set(tableData);
              router.push("/noise_rules_db");
            }}
            color="secondary"
          >
            Noise Rules DB
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-4 container mb-10">
          <input
            type="file"
            id="loadTable"
            style={{ display: "none" }}
            onChange={loadTableDataFromFile}
            accept=".txt"
          />
          <label htmlFor="loadTable">
            <Button variant="contained" component="span">
              Load .txt Table
            </Button>
          </label>
          <Button variant="contained" onClick={saveTableDataAsTextFile}>
            Save Table
          </Button>
          <Button variant="contained">Send To CES</Button>
        </div>
        <FileUploader
          onTableDataChange={handleTableData}
          tableData={tableData}
        />

        {/*<div className="flex container">*/}
        {/*  <TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
        {/*  <Button variant="contained">Browse</Button>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default withAuth(Main_page);