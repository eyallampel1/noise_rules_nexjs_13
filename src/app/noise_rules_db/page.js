"use client";
import { makeStyles } from "@mui/styles";
// import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import {
  List,
  ListItem,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import defaultParallelismRules from "./noiseRulesData";
import withAuth from "@/app/components/withAuth/withAuth";
import Header from "@/app/noise_rules_db/Header";
import DrawerComponent from "@/app/noise_rules_db/DrawerComponent";
import AppSnackbar from "@/app/noise_rules_db/AppSnackbar";
import RulesTable from "@/app/noise_rules_db/RulesTable";

const useStyles = makeStyles({
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "lightgreen",
  },
});

const NoiseRulesDB = () => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedRuleDescription, setSelectedRuleDescription] = useState("");
  const [sameLayerTraceSegments, setSameLayerTraceSegments] = useState([]);
  const [adjacentLayerTraceSegments, setAdjacentLayerTraceSegments] = useState(
    [],
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [hideOtherRows, setHideOtherRows] = useState(false);
  const [parallelismRules, setParallelismRules] = useState([]);
  const filteredParallelismRules = parallelismRules.filter((rule) =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    // Update the rules when the component mounts
    setParallelismRules(defaultParallelismRules);
  }, []);

  // Add this useEffect hook inside your component
  useEffect(() => {
    console.log("Current parallelismRules:", parallelismRules);
  }, [parallelismRules]); // This will run every time parallelismRules changes

  const handleClick = () => {
    setOpen(true);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  function saveData() {
    // Convert data to a string
    const dataString = JSON.stringify(parallelismRules, null, 2);

    // Create a blob with the data
    const blob = new Blob([dataString], { type: "text/plain;charset=utf-8" });

    // Create a link to download the blob
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "rules.txt";

    // Append the link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click event on the link
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
  }

  const handleSaveRulesToPC = () => {
    saveData();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const snackbarProps = {
    open: open,
    handleClose: handleClose,
    message: "Only Admins can Add / Remove rules!",
    severity: "error",
  };

  const snackbarProps2 = {
    open: open2,
    handleClose: handleClose2,
    message: "Only Admins can Modify rules!",
    severity: "error",
  };

  const [rules, setRules] = useState(parallelismRules); // Use state to store your rules

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Function to handle the file reading
      reader.onload = (e) => {
        try {
          // Parse the file's contents as JSON
          const customRules = JSON.parse(e.target.result);

          // Update your rules with the custom data
          setParallelismRules(customRules); // set state here
        } catch (error) {
          console.error("Error reading or parsing file:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  // Function to trigger the file input dialog
  const handleLoadCustomRules = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  // Add another pair of handler functions for the second Snackbar
  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleRowClick = (rule) => {
    if (selectedRow === rule.name) {
      setSelectedRow(null); // Unselect the rule if it is already selected
      setSelectedRuleDescription(""); // Clear the description
      setSameLayerTraceSegments([]); // Clear the same layer trace segments
      setAdjacentLayerTraceSegments([]); // Clear the adjacent layer trace segments

      // Toggle the value of hideOtherRows if the same row is clicked again
      setHideOtherRows(!hideOtherRows);
    } else {
      // Set hideOtherRows to true if a different row is clicked
      setHideOtherRows(true);

      setSelectedRow(rule.name); // Set the selected row if it's not already selected
      setSameLayerTraceSegments(rule.sameLayer);
      setSelectedRuleDescription(rule.description);
      setAdjacentLayerTraceSegments(rule.adjacentLayer);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Header
        toggleDrawer={toggleDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <DrawerComponent
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleClick={handleClick}
        handleClick2={handleClick2}
        handleSaveRulesToPC={handleSaveRulesToPC}
        handleLoadCustomRules={handleLoadCustomRules}
      />

      <AppSnackbar {...snackbarProps} />
      <AppSnackbar {...snackbarProps2} />

      <Button
        color="secondary"
        variant="contained"
        onClick={() => router.push("/main_page")}
      >
        Return to main page
      </Button>
      <div
        className={
          "flex justify-center items-center space-x-20 container mb-10"
        }
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for rules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "50%",
            padding: "10px",
            margin: "8px 0",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            style={{ maxHeight: "900px", overflow: "auto", marginTop: "10%" }}
          >
            <RulesTable
              selectedRow={selectedRow}
              handleRowClick={handleRowClick}
              filteredParallelismRules={filteredParallelismRules}
              classes={classes}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableContainer component={Paper}>
              <h2>
                Same layer trace segments for:
                <span style={{ color: selectedRow ? "red" : "inherit" }}>
                  {" "}
                  {selectedRow || "None selected"}{" "}
                </span>
              </h2>
              <Table>
                <TableHead style={{ backgroundColor: "lightgreen" }}>
                  <TableRow>
                    <TableCell>Edge/Edge trace segments</TableCell>
                    <TableCell>Max Parallel Len (th)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sameLayerTraceSegments.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.maxParallel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <h2>
                Adjacent layer trace segments for:
                <span style={{ color: selectedRow ? "red" : "inherit" }}>
                  {" "}
                  {selectedRow || "None selected"}{" "}
                </span>
              </h2>
              <Table>
                <TableHead style={{ backgroundColor: "lightgreen" }}>
                  <TableRow>
                    <TableCell>Edge/Edge trace segments</TableCell>
                    <TableCell>Max Parallel Len (th)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adjacentLayerTraceSegments.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.maxParallel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
      <div
        className={
          "flex justify-center items-center space-x-20 container mb-10"
        }
      ></div>

      {/* <div>*/}
      {/*   <ReactPlayer url="example.mp4" controls />*/}
      {/* </div>*/}
    </div>
  );
};

export default withAuth(NoiseRulesDB);