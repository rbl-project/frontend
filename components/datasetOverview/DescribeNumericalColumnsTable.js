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

const rows = [
  {
      "25%": 6.0,
      "50%": 8.5,
      "75%": 12.5,
      "count": 1019925.0,
      "data_type": "float64",
      "max": 500.0,
      "mean": 11.34581037821409,
      "min": -44.9,
      "name": "fare_amount",
      "std": 9.823362741292238
  },
  {
      "25%": -73.9920654296875,
      "50%": -73.981797,
      "75%": -73.967101,
      "count": 1019925.0,
      "data_type": "float64",
      "max": 2522.271325,
      "mean": -72.52795108500071,
      "min": -3377.680935,
      "name": "pickup_longitude",
      "std": 12.028697813079173
  },
  {
      "25%": 40.734964,
      "50%": 40.752682,
      "75%": 40.76715087890625,
      "count": 1019925.0,
      "data_type": "float64",
      "max": 2621.62843,
      "mean": 39.93176362628972,
      "min": -3116.285383,
      "name": "pickup_latitude",
      "std": 7.7640011762854755
  },
  {
      "25%": -73.991385,
      "50%": -73.980137,
      "75%": -73.9636695,
      "count": 1019915.0,
      "data_type": "float64",
      "max": 1717.003405,
      "mean": -72.52832136814686,
      "min": -3383.296608,
      "name": "dropoff_longitude",
      "std": 11.436878033624664
  },
  {
      "25%": 40.734055,
      "50%": 40.753172,
      "75%": 40.76813,
      "count": 1019915.0,
      "data_type": "float64",
      "max": 1989.728077,
      "mean": 39.92345863352638,
      "min": -3114.338567,
      "name": "dropoff_latitude",
      "std": 8.385776296736486
  },
  {
      "25%": 1.0,
      "50%": 1.0,
      "75%": 2.0,
      "count": 1019925.0,
      "data_type": "int64",
      "max": 208.0,
      "mean": 1.6849072235703606,
      "min": 0.0,
      "name": "passenger_count",
      "std": 1.323649320805371
  }
]

const DescribeNumericalColumnsTable = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 460, height:460 }}>
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

export default DescribeNumericalColumnsTable;