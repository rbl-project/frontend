import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

const columns = [
  { id: 'name', label: 'Name', width: "20%" },
  { id: 'count', label: 'Count', width: "7%", },
  { id: 'mean', label: 'Mean', width: "7%", format: (value) => value.toFixed(2), },
  { id: 'std', label: 'Standard Deviation', width: "7%", format: (value) => value.toFixed(2), },
  { id: 'min', label: 'Min', width: "7%", format: (value) => value.toFixed(2), },
  { id: '25%', label: '25 %ile', width: "7%", format: (value) => value.toFixed(2), },
  { id: '50%', label: '50 %ile', width: "7%", format: (value) => value.toFixed(2), },
  { id: '75%', label: '75 %ile', width: "7%", format: (value) => value.toFixed(2), },
  { id: 'max', label: 'Max', width: "7%", format: (value) => value.toFixed(2), },
];

const DescribeNumericalColumnsTable = ({ rows }) => {
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
                    const cellContent = column.format && typeof value === 'number' ? column.format(value) : value === null ? "null" : value;
                    return (
                      < Tooltip title={cellContent} placement="bottom-start">
                        <TableCell key={column.id} align={column.align} sx={{ fontWeight: column.id === "name" && 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {cellContent}
                        </TableCell>
                      </Tooltip>
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

export default DescribeNumericalColumnsTable;