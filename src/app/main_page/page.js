"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploader from "@/app/components/BrowseAndSend/BrowseAndSend";
import withAuth from "../components/withAuth/withAuth";

const Main_page = () => {
  return (
    <>
      <div>
        <h1>main page</h1>
        <FileUploader />
        {/*<div className="flex container">*/}
        {/*  <TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
        {/*  <Button variant="contained">Browse</Button>*/}
        {/*</div>*/}
        <div className="flex justify-center items-center space-x-4 container mt-4">
          <Button variant="contained">Save Table</Button>
          <Button variant="contained">Send To CES</Button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Main_page);