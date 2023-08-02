"use client";
import FileSaver from "file-saver";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploader from "@/app/components/BrowseAndSend/BrowseAndSend";
import withAuth from "../components/withAuth/withAuth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Main_page = () => {
  const [tableData, setTableData] = useState(null);

  const handleTableData = (data) => {
    setTableData(data);
  };

  const loadTableDataFromFile = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // Log the selected file

    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split("\n");
      console.log("File lines:", lines); // Log the split lines

      const newTableData = lines.slice(1).map((line) => {
        const [constraintClassName, inClassNoiseRule, outOfClassNoiseRule] =
          line.split(" ");
        return { constraintClassName, inClassNoiseRule, outOfClassNoiseRule };
      });

      console.log("Parsed table data:", newTableData); // Log the parsed table data

      setTableData(newTableData);
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
            onClick={() => router.push("/noise_rules_db")}
            color="secondary"
          >
            Noise Rules DB
          </Button>
        </div>
        <FileUploader
          onTableDataChange={handleTableData}
          tableData={tableData}
        />
        {/*<div className="flex container">*/}
        {/*  <TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
        {/*  <Button variant="contained">Browse</Button>*/}
        {/*</div>*/}
        <div className="flex justify-center items-center space-x-4 container mt-4">
          <input
            type="file"
            id="loadTable"
            style={{ display: "none" }}
            onChange={loadTableDataFromFile}
            accept=".txt"
          />
          <label htmlFor="loadTable">
            <Button variant="contained" component="span">
              Load Table
            </Button>
          </label>
          <Button variant="contained" onClick={saveTableDataAsTextFile}>
            Save Table
          </Button>
          <Button variant="contained">Send To CES</Button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Main_page);