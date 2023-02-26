import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

const formatNumber = (value) => value.toFixed(2);

const CorrelationMatrix = () => {

    // Redux State
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);

    return (
        <Box sx={{ height: "83vh", width: "100%", p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TableContainer sx={{ height: "100%", width:"75vw", overflow: "auto", borderRadius: "3px", "&::-webkit-scrollbar": { width: "0.6rem", height: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#e1e1e1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#a1a1a1", borderRadius: "3rem" } }}>
                <Table aria-label="sticky table" size="small" sx={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow >
                            {dataCorrelationState.column_list.map((column) => (
                                < Tooltip title={column.label} placement="bottom" key={column.id}>
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        sx={{
                                            height: "3rem",
                                            width:"5rem",
                                            padding: "0.2rem",
                                            fontWeight: 'bolder',
                                            bgcolor: !column.included && "#f1f1f1",
                                            boxShadow: column.included && 0,
                                            border: "1px solid #c1c1c1",
                                            overflow: "hidden", textOverflow: "ellipsis"
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                </Tooltip>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataCorrelationState.correlation_matrix.map((row) => {
                            return (
                                <TableRow role="checkbox" tabIndex={-1} key={row.name} sx={{ height: "3rem" }}>
                                    {dataCorrelationState.column_list.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            < Tooltip title={value} key={column.id} placement="bottom" disableHoverListener={column.id !== "column_name"}>
                                                <TableCell
                                                    key={column.id}
                                                    align="center"
                                                    variant={column.id === "column_name" ? "head" : "body"}
                                                    sx={{
                                                        padding: "0.2rem",
                                                        bgcolor: (value === undefined || (typeof value === "string" && row.included === false)) && "#f1f1f1",
                                                        fontWeight: column.id === "column_name" && "bolder",
                                                        border: "1px solid #c1c1c1",
                                                        boxShadow: (value !== undefined || (typeof value === "string" && row.included === false)) && 0,
                                                        overflow: "hidden", textOverflow: "ellipsis"
                                                    }}
                                                >
                                                    {value === null ? "0.00": typeof value === 'number' ? formatNumber(value) : value}
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
        </Box>
    )
}

export default CorrelationMatrix;
