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
  { id: 'column_name', label: 'Column Name', width: "75%" },
  { id: 'data_type', label: 'Data Type', width: "25%", },
];

const ColumnList = ({ rows }) => {
  return (
    <Paper sx={{ width: '100%', overflow: "hidden" }}>
      <TableContainer sx={{ height: "55vh", overflow: "auto", "&::-webkit-scrollbar": { width:"0.6rem",height: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" } }}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.column_name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <Tooltip title={value} key={column.id} placement="bottom-start" disableHoverListener={column.id !== "column_name"}>
                        <TableCell key={column.id} align={column.align} sx={{ fontWeight: column.id === "column_name" && 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {value}
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

export default ColumnList;; 