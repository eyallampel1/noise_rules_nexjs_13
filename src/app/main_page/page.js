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
        <FileUploader onTableDataChange={handleTableData} />
        {/*<div className="flex container">*/}
        {/*  <TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
        {/*  <Button variant="contained">Browse</Button>*/}
        {/*</div>*/}
        <div className="flex justify-center items-center space-x-4 container mt-4">
          <Button variant="contained" onClick={() => console.log(tableData)}>
            Save Table
          </Button>
          <Button variant="contained">Send To CES</Button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Main_page);