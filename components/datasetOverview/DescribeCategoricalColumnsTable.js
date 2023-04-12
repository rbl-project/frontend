import * as React from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead, TableRow,Tooltip} from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', width: "30%" },
  { id: 'count', label: 'Count', width: "13%", },
  { id: 'mode', label: 'Mode', width: "30%" },
  { id: 'mode_count', label: 'Mode Count', width: "13%" },
  { id: 'unique_count', label: 'Unique Count', width: "13%" },
];

const DescribeCategoricalColumnsTable = ({ rows }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: "44vh", overflow: "auto", "&::-webkit-scrollbar": { width: "0.6rem", height: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" } }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ width: column.width, fontWeight: 'bolder' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      // < Tooltip title={value === null ? "null" : value} key={column.id} placement="bottom-start">
                        <TableCell key={column.id} align={column.align} sx={{ fontWeight: column.id === "name" && 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {value}
                        </TableCell>
                      // </Tooltip>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DescribeCategoricalColumnsTable; 