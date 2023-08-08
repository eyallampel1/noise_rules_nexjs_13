import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RulesTable = ({
  selectedRow,
  handleRowClick,
  filteredParallelismRules,
  classes,
}) => {
  return (
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
            if (!selectedRow || selectedRow === rule.name) {
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
  );
};

export default RulesTable;