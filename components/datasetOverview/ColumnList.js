import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'column_name', label: 'Column Name', minWidth: 170 },
  { id: 'data_type',label: 'Data Type',minWidth: 100,},
];

const rows = [
    {
        "column_name": "key",
        "data_type": "object"
    },
    {
        "column_name": "fare_amount",
        "data_type": "float64"
    },
    {
        "column_name": "pickup_datetime",
        "data_type": "object"
    },
    {
        "column_name": "pickup_longitude",
        "data_type": "float64"
    },
    {
        "column_name": "pickup_latitude",
        "data_type": "float64"
    },
    {
        "column_name": "dropoff_longitude",
        "data_type": "float64"
    },
    {
        "column_name": "dropoff_latitude",
        "data_type": "float64"
    },
    {
        "column_name": "passenger_count",
        "data_type": "int64"
    }
]

const ColumnList = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 464, height:464 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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

export default ColumnList;; 