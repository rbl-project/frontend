import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    Tabs,
    Tab,
    CircularProgress,
    Autocomplete,
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Link,
    Tooltip
} from '@mui/material';

import { styled } from '@mui/material/styles';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            height="100%"
        >
            {value === index && (
                <Box sx={{ pt: 1, height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const ToolTipText = styled('p')(({ theme }) => ({
    color: "white",
    backgroundColor: "grey",
    borderRadius: "50%",
    padding: "0px 8px",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "0.5rem"
}))

const DropByRowIndexSection = ({ dropByRowIndexQuery, setDropByRowIndexQuery, dataCleaningState }) => {

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);

    // final start index value
    const handleStartIndexChange = (event) => {
        setStartIndex(event.target.value);
        setDropByRowIndexQuery({
            ...dropByRowIndexQuery, ["row_start"]: event.target.value
        })
    }

    // final end index value
    const handleEndIndexChange = (event) => {
        setEndIndex(event.target.value);
        setDropByRowIndexQuery({
            ...dropByRowIndexQuery, ["row_end"]: event.target.value
        })
    }

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
                        setEndIndex(dataCleaningState.n_rows)
                        setDropByRowIndexQuery({
                            ...dropByRowIndexQuery, ["row_end"]: dataCleaningState.n_rows
                        })
                    }}
                        style={endIndex != dataCleaningState.n_rows && endIndex !== undefined ? { marginLeft: "1rem", color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 } : { marginLeft: "1rem", padding: 0 }}
                        variant="outlined">
                        End
                    </Button>
                </Box>

                <p>or</p>

                <Box sx={{ mr: 2 }}>
                    <TextField
                        size='small'
                        error={endIndex !== dataCleaningState.n_rows && (parseInt(endIndex) < parseInt(startIndex))}
                        helperText={(endIndex !== dataCleaningState.n_rows && (parseInt(endIndex) < parseInt(startIndex)) ? "End must be greater than start" : "")}
                        inputProps={{ inputMode: 'numeric' }}
                        value={endIndex}
                        onChange={handleEndIndexChange}
                        style={endIndex === dataCleaningState.n_rows ? { padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" } : { padding: "6px 16px" }} type="number" placeholder="Index" />

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