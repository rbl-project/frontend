import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const columns1 = [
    { id: 'column_name', label: "", included: true, },
    { id: 'name', label: 'Name', included: true, },
    { id: 'count', label: 'Count', included: true, },
    { id: 'mode', label: 'Mode', included: false },
    { id: 'mode_count', label: 'Mode Count', included: false },
    { id: 'unique_count', label: 'Unique Count', included: false },
    { id: 'name1', label: 'Name', included: false },
    { id: 'count1', label: 'Count', included: false },
    { id: 'mode1', label: 'Mode', included: false },
    { id: 'mode_count1', label: 'Mode Count', included: false },
    { id: 'unique_count1', label: 'Unique Count', included: false },
    { id: 'name2', label: 'Name', included: false },
    { id: 'count2', label: 'Count', included: false },
    { id: 'mode2', label: 'Mode', included: false },
    { id: 'mode_count2', label: 'Mode Count', included: false },
    { id: 'unique_count2', label: 'Unique Count', included: false },
    { id: 'name3', label: 'Name', included: false },
    { id: 'count3', label: 'Count', included: false },
    { id: 'mode3', label: 'Mode', included: false },
    { id: 'mode_count3', label: 'Mode Count', included: false },
    { id: 'unique_count3', label: 'Unique Count', included: false },
];

const rows1 = [
    { column_name: 'Name', name: 1, count: 0.5555, },
    { column_name: 'Count', name: 0.555, count: 1, },
    { column_name: 'Mode', included: false },
    { column_name: 'Mode Count', included: false },
    { column_name: 'Unique Count', included: false },
    { column_name: 'Name1', included: false },
    { column_name: 'Count1', included: false },
    { column_name: 'Mode1', included: false },
    { column_name: 'Mode Count1', included: false },
    { column_name: 'Unique Count1', included: false },
    { column_name: 'Name2', included: false },
    { column_name: 'Count2', included: false },
    { column_name: 'Mode2', included: false },
    { column_name: 'Mode Count2', included: false },
    { column_name: 'Unique Count2', included: false },
    { column_name: 'Name3', included: false },
    { column_name: 'Count3', included: false },
    { column_name: 'Mode3', included: false },
    { column_name: 'Mode Count3', included: false },
    { column_name: 'Unique Count3', included: false },
]

const formatNumber = (value) => value.toFixed(2);

const CorrelationMatrix = ({ }) => {

    // Redux State
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);
    
    return (
        <Box sx={{ height: "83vh", width: "100%", p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TableContainer  sx={{ height: "100%", overflow: "auto", borderRadius: "3px", "&::-webkit-scrollbar": { width: "0.6rem", height: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#e1e1e1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#a1a1a1", borderRadius: "3rem" } }}>
                <Table aria-label="sticky table" size="small" dense >
                    <TableHead>
                        <TableRow >
                            {dataCorrelationState.column_list.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="center"
                                    sx={{   height: "3rem",
                                            fontWeight: 'bolder', 
                                            bgcolor: !column.included && "#f1f1f1", 
                                            boxShadow: column.included && 0, 
                                            border: "1px solid #c1c1c1",
                                        }}
                                    width="2rem"
                                >
                                    {column.label}
                                </TableCell>
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
                                            <TableCell
                                                key={column.id}
                                                align="center"
                                                variant={column.id === "column_name" ? "head" : "body"}
                                                sx={{
                                                    bgcolor: (value === undefined || (typeof value === "string" && row.included === false)) && "#f1f1f1",
                                                    fontWeight: column.id === "column_name" && "bolder",
                                                    border: "1px solid #c1c1c1",
                                                    boxShadow: (value !== undefined || (typeof value === "string" && row.included === false)) &&  0,
                                                }}
                                            >
                                                {typeof value === 'number' ? formatNumber(value) : value}
                                            </TableCell>
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
