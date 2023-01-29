import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'count',label: 'Count',minWidth: 100,},
  { id: 'mean',label: 'Mean',minWidth: 100, format: (value) => value.toFixed(2),},
  { id: 'std',label: 'Standard Deviation',minWidth: 100,format: (value) => value.toFixed(2),},
  { id: 'min',label: 'Min',minWidth: 100,format: (value) => value.toFixed(2),},
  { id: '25%',label: '25 %ile',minWidth: 100,format: (value) => value.toFixed(2),},
  { id: '50%',label: '50 %ile',minWidth: 100,format: (value) => value.toFixed(2),},
  { id: '75%',label: '75 %ile',minWidth: 100,format: (value) => value.toFixed(2),},
  { id: 'max',label: 'Max',minWidth: 100,format: (value) => value.toFixed(2),},
];

const DescribeNumericalColumnsTable = ({rows}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 374, height:374 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth,fontWeight: 'bolder'}}
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
                        <TableCell key={column.id} align={column.align} sx={{fontWeight:column.id ==="name"&& 500}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
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