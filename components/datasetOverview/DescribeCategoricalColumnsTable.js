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
  { id: 'mode_count',label: 'Count',minWidth: 100,},
  { id: 'mode',label: 'Mode',minWidth: 170},
  { id: 'freq', label: 'Mode Count', minWidth: 100 },
  { id: 'unique',label: 'Unique Count',minWidth: 100},
];

const rows = [
  {
      "data_type": "object",
      "freq": 1,
      "mode": "2009-06-15 17:26:21.0000001",
      "mode_count": 1019925,
      "name": "key",
      "unique": 1019925
  },
  {
      "data_type": "object",
      "freq": 9,
      "mode": "2010-02-13 19:28:00 UTC",
      "mode_count": 1019925,
      "name": "pickup_datetime",
      "unique": 876701
  },
  {
      "data_type": "object",
      "freq": 1,
      "mode": "2009-06-15 17:26:21.0000001",
      "mode_count": 1019925,
      "name": "key",
      "unique": 1019925
  },
  {
      "data_type": "object",
      "freq": 9,
      "mode": "2010-02-13 19:28:00 UTC",
      "mode_count": 1019925,
      "name": "pickup_datetime",
      "unique": 876701
  },
  {
      "data_type": "object",
      "freq": 1,
      "mode": "2009-06-15 17:26:21.0000001",
      "mode_count": 1019925,
      "name": "key",
      "unique": 1019925
  },
  {
      "data_type": "object",
      "freq": 9,
      "mode": "2010-02-13 19:28:00 UTC",
      "mode_count": 1019925,
      "name": "pickup_datetime",
      "unique": 876701
  }
]

const DescribeCategoricalColumnsTable = () => {
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
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
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

export default DescribeCategoricalColumnsTable; 