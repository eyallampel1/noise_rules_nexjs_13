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
        <Button variant="contained">Convert</Button>
      </div>
    </>
  );
};

export default withAuth(Main_page);