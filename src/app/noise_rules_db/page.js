"use client";
import { makeStyles } from "@mui/styles";
// import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
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

import parallelismRules from "./noiseRulesData";
import withAuth from "@/app/components/withAuth/withAuth";

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

  const filteredParallelismRules = parallelismRules.filter((rule) =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleClick = () => {
    setOpen(true);
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
      <h1>Noise Rules DB</h1>
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
        <Button variant="contained" onClick={handleClick}>
          Add / Remove Rule
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Only Admins can Add / Remove rules !
          </Alert>
        </Snackbar>
        <Button variant="contained" onClick={handleClick2}>
          Modify Rule
        </Button>
        <Snackbar
          open={open2}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleClose2}
        >
          <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
            Only Admins can Modify rules !
          </Alert>
        </Snackbar>
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
            <TableContainer component={Paper}>
              <h2>Noise Rules</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.stickyHeader}
                      style={{ verticalAlign: "middle" }}
                    >
                      Noise Rules Name:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredParallelismRules.map((rule, index) => {
                    if (!hideOtherRows || selectedRow === rule.name) {
                      return (
                        <TableRow
                          key={rule.name}
                          hover
                          onClick={() => handleRowClick(rule)}
                          style={{
                            backgroundColor:
                              selectedRow === rule.name ? "lightgray" : "",
                            cursor: "pointer",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {rule.name}
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {selectedRow && (
            <div>
              <h2>{selectedRow}:</h2>
              <p>{selectedRuleDescription}</p>
              <p
                style={{ color: "red", fontSize: "22px", textAlign: "center" }}
              >
                Click Again to show all Noise rules
              </p>
            </div>
          )}
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