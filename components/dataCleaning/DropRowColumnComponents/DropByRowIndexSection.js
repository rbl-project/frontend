import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

// icons

// constants
import { DROP_BY_ROW_INDEX_API_TASK_TYPE } from '/constants/Constants';

const DropByRowIndexSection = ({ setApiTaskType, dropByRowIndexQuery, setDropByRowIndexQuery }) => {

    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);

    // final start index value
    const handleStartIndexChange = (event) => {
        setStartIndex(event.target.value);
        setDropByRowIndexQuery({
            ...dropByRowIndexQuery, ["row_start"]: parseInt(event.target.value)
        })
    }

    // final end index value
    const handleEndIndexChange = (event) => {
        setEndIndex(event.target.value);
        setDropByRowIndexQuery({
            ...dropByRowIndexQuery, ["row_end"]: parseInt(event.target.value)
        })
    }

    useEffect(() => {
        setApiTaskType(DROP_BY_ROW_INDEX_API_TASK_TYPE)
    }, [])

    return (
        <>
            {/* Row Start Index */}
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", }}>
                {/* Select Rows start Dropdown  */}
                <Box sx={{ mr: 1 }}>
                    <Typography sx={{ fontSize: "13px", }}>From: </Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                    <Button onClick={() => {
                        setStartIndex(0)
                        setDropByRowIndexQuery({
                            ...dropByRowIndexQuery, ["row_start"]: 0
                        })
                    }}
                        style={startIndex !== 0 && startIndex !== undefined ? { color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 } : { padding: 0 }}
                        variant="outlined">Start</Button>
                </Box>

                <p>or</p>

                <Box sx={{ mr: 2 }}>
                    <TextField
                        size='small'
                        type="number"
                        inputProps={{ inputMode: 'numeric' }}
                        value={startIndex}
                        onChange={handleStartIndexChange}
                        style={startIndex === 0 ? { padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" } : { padding: "6px 16px" }}
                        placeholder="Index" />
                </Box>
            </Box>

            {/* Row End Index */}
            <Box sx={{ mt: "", width: "100%", display: "flex", alignItems: "center", }}>
                {/* Select Rows start Dropdown  */}
                <Box sx={{ mr: 1 }}>
                    <Typography sx={{ fontSize: "13px", }}>To: </Typography>
                </Box>
                <Box sx={{ mr: 2 }}>

                    <Button onClick={() => {
                        setEndIndex(datasetUpdateState.metadata.n_rows)
                        setDropByRowIndexQuery({
                            ...dropByRowIndexQuery, ["row_end"]: datasetUpdateState.metadata.n_rows
                        })
                    }}
                        style={endIndex != datasetUpdateState.metadata.n_rows && endIndex !== undefined ? { marginLeft: "1rem", color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 } : { marginLeft: "1rem", padding: 0 }}
                        variant="outlined">
                        End
                    </Button>
                </Box>

                <p>or</p>

                <Box sx={{ mr: 2 }}>
                    <TextField
                        size='small'
                        type="number"
                        error={endIndex !== datasetUpdateState.metadata.n_rows && (parseInt(endIndex) < parseInt(startIndex))}
                        helperText={(endIndex !== datasetUpdateState.metadata.n_rows && (parseInt(endIndex) < parseInt(startIndex)) ? "End must be greater than start" : "")}
                        inputProps={{ inputMode: 'numeric' }}
                        value={endIndex}
                        onChange={handleEndIndexChange}
                        style={endIndex === datasetUpdateState.metadata.n_rows ? { padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" } : { padding: "6px 16px" }}  placeholder="Index" />

                </Box>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Axis</TableCell>
                            <TableCell>Start Index</TableCell>
                            <TableCell>End Index</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key="one">
                            <TableCell component="th" scope="row">Row</TableCell>
                            <TableCell>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0.5,
                                        m: 0,
                                    }}
                                > {dropByRowIndexQuery['row_start']} </Paper>

                            </TableCell>
                            <TableCell>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0.5,
                                        m: 0,
                                    }}
                                > {dropByRowIndexQuery['row_end']} </Paper>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DropByRowIndexSection;