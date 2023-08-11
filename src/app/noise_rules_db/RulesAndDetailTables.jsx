import React from "react";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import RulesTable from "./RulesTable";

const RulesAndDetailTables = ({
  selectedRow,
  handleRowClick,
  filteredParallelismRules,
  classes,
  sameLayerTraceSegments,
  adjacentLayerTraceSegments,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div style={{ maxHeight: "900px", overflow: "auto", marginTop: "10%" }}>
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
  );
};

export default RulesAndDetailTables;