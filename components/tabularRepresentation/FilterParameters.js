import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    FormControl,
    Tooltip,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Badge,
    Autocomplete,
    TextField,
} from "@mui/material";

import { ToolTipText } from "./TabularRepresentationStyles";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

// actions

// constants

const FilterParameters = ({ filterQuery, setFilterQuery }) => {

    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);
    
    //! ======================= FILTERING PARAMETERS ========================

    const intital_filter_query = {
        "end": tabularRepresentationState.n_rows, // end index is end of dataframe itself
        "columns": [], // all columns
        "row_start": 0, // start form 1st row
        "row_end": tabularRepresentationState.n_rows // end index is end of dataframe itself
    }
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(tabularRepresentationState.n_rows);
    const [filterColumn, setFilterColumn] = useState([]);

    const [filterOpen, setFilterOpen] = useState(false);

    // final start index value
    const handleStartIndexChange = (event) => {
        setStartIndex(event.target.value);
        setFilterQuery({
            ...filterQuery, ["row_start"]: event.target.value
        })
    }

    // final end index value
    const handleEndIndexChange = (event) => {
        setEndIndex(event.target.value);
        setFilterQuery({
            ...filterQuery, ["row_end"]: event.target.value
        })
    }

    const handleFilterColumnSubmit = (e) => {
        // upadte the filterQuery object with new filterColumn
        setFilterQuery({
            ...filterQuery, ['columns']: filterColumn
        })

        setFilterColumn([]);
    }

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }))

    return (
        <>
            <Box sx={{ my: "1rem", }}>

                <Typography
                    variant='h6'
                    sx={{ fontWeight: "bold", my: 1, fontSize: "1rem" }}
                >
                    Filter Parameters
                    <Tooltip arrow title="Filtering will be performed on above searched and sorted data">
                        <ToolTipText>i</ToolTipText>
                    </Tooltip>
                </Typography>

                <Typography variant='h6' sx={{ fontSize: "14px", }} >
                    Rows
                </Typography>

                {/* Row Start Index */}
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", }}>
                    {/* Select Rows start Dropdown  */}
                    <Box sx={{ mr: 1 }}>
                        <Typography sx={{ fontSize: "13px", }}>From: </Typography>
                    </Box>
                    <Box sx={{ mr: 2 }}>
                        <Button onClick={() => {
                            setStartIndex(0)
                            setFilterQuery({
                                ...filterQuery, ["row_start"]: 0
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
                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", }}>
                    {/* Select Rows start Dropdown  */}
                    <Box sx={{ mr: 1 }}>
                        <Typography sx={{ fontSize: "13px", }}>To: </Typography>
                    </Box>
                    <Box sx={{ mr: 2 }}>

                        <Button onClick={() => {
                            setEndIndex(tabularRepresentationState.n_rows)
                            setFilterQuery({
                                ...filterQuery, ["row_end"]: tabularRepresentationState.n_rows
                            })
                        }}
                            style={endIndex != tabularRepresentationState.n_rows && endIndex !== undefined ? { marginLeft: "1rem", color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 } : { marginLeft: "1rem", padding: 0 }}
                            variant="outlined">
                            End
                        </Button>
                    </Box>

                    <p>or</p>

                    <Box sx={{ mr: 2 }}>
                        <TextField
                            size='small'
                            error={endIndex !== tabularRepresentationState.n_rows && (parseInt(endIndex) < parseInt(startIndex))}
                            helperText={(endIndex !== tabularRepresentationState.n_rows && (parseInt(endIndex) < parseInt(startIndex)) ? "End must be greater than start" : "")}
                            inputProps={{ inputMode: 'numeric' }}
                            value={endIndex}
                            onChange={handleEndIndexChange}
                            style={endIndex === tabularRepresentationState.n_rows ? { padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" } : { padding: "6px 16px" }} type="number" placeholder="Index" />

                    </Box>
                </Box>

                <Typography variant='h6' sx={{  my: 1, fontSize: "14px"}} >
                    Columns
                </Typography>

                {/* Column Filter */}
                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                    <Box sx={{ width: "30vw" }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                multiple
                                disableClearable
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={tabularRepresentationState.all_columns}
                                size="small"
                                value={filterColumn}
                                onChange={(e, value, reason) => setFilterColumn(value)}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Value" />}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: "30vw", ml: "1rem" }}>
                        <Button variant='outlined' disabled={(filterColumn.length != 0 && filterColumn.length != 0) ? false : true} onClick={handleFilterColumnSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {
                        <>
                            <Badge badgeContent={filterQuery['columns'].length} color="primary">
                                <Button variant='outlined' onClick={() => setFilterOpen(true)}>Show Parameters</Button>
                            </Badge>
                            <Button variant='outlined' onClick={() => {
                                setFilterQuery(intital_filter_query)
                                setStartIndex(0)
                                setEndIndex(tabularRepresentationState.n_rows)
                                setFilterColumn([])
                            }} sx={{ ml: 2 }}>Reset</Button>
                        </>
                    }
                </Box>


            </Box>

            {/* Filter Popup */}
            <Dialog
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Filter Parameters"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
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
                                    <TableRow key="row">
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
                                            > {filterQuery['row_start']} </Paper>

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
                                            > {filterQuery['row_end']} </Paper>

                                        </TableCell>
                                    </TableRow>

                                    <TableRow key="row">
                                        <TableCell component="th" scope="row">Column</TableCell>
                                        <TableCell colSpan={2}>
                                            <Paper
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'start',
                                                    flexWrap: 'wrap',
                                                    listStyle: 'none',
                                                    p: 0.5,
                                                    m: 0,
                                                }}
                                                component="ul"
                                            > {
                                                    filterQuery['columns'].length != 0
                                                        ? (
                                                            filterQuery['columns'].map((val) => {
                                                                return (
                                                                    <ListItem key={val}>
                                                                        <Chip
                                                                            label={val}
                                                                            onDelete={() => {
                                                                                setFilterQuery({
                                                                                    ...filterQuery,
                                                                                    ['columns']: filterQuery['columns'].filter((item) => item !== val)
                                                                                })
                                                                            }}
                                                                        />
                                                                    </ListItem>
                                                                );
                                                            })
                                                        ) : (
                                                            <Typography>All Columns</Typography>
                                                        )

                                                }

                                            </Paper>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFilterOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FilterParameters;