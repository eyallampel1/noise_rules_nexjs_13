"use client";

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
    setSelectedRow(rule.name);
    setSameLayerTraceSegments(rule.sameLayer);
    setSelectedRuleDescription(rule.description);
    setAdjacentLayerTraceSegments(rule.adjacentLayer);
  };

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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <h2>Parallelism rules:</h2>
            <Table>
              <TableHead style={{ backgroundColor: "lightgreen" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parallelismRules.map((rule, index) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
      <div
        className={
          "flex justify-center items-center space-x-20 container mb-10"
        }
      >
        {selectedRow && (
          <div>
            <h2>{selectedRow}:</h2>
            <p>{selectedRuleDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NoiseRulesDB;