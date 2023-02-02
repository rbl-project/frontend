import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'count', label: 'Count', minWidth: 100, },
    { id: 'mode', label: 'Mode', minWidth: 170 },
    { id: 'mode_count', label: 'Mode Count', minWidth: 100 },
    { id: 'unique_count', label: 'Unique Count', minWidth: 100 },
];

const CorrelationMatrix = () => {
    return (
        <Box sx={{ height: "80vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ height: "44vh", overflow: "auto", "&::-webkit-scrollbar": { width: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" } }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{ minWidth: column.minWidth, fontWeight: 'bolder' }}
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
                                                <TableCell key={column.id} align={column.align} sx={{ fontWeight: column.id === "name" && 500 }}>
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
        </Box>
    )
}

export default CorrelationMatrix;
