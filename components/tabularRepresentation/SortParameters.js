import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
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
    Link,
    Badge,
    Autocomplete,
    TextField,
} from "@mui/material";

import { ToolTipText } from "./TabularRepresentationStyles";
import { useSelector } from 'react-redux';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// actions

// constants

const SortParameters = ({ sortQuery, setSortQuery }) => {

    // redux state
    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);

    //! ====================== SORTING PARAMETERS ==========================
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [sortOpen, setSortOpen] = useState(false);

    const handleSortSubmit = () => {
        let sortQuery_temp = sortQuery;
        if (sortOrder === "ascending")
            sortQuery_temp[sortColumn] = true;
        else if (sortOrder === "descending")
            sortQuery_temp[sortColumn] = false;

        setSortQuery(sortQuery_temp);

        setSortColumn('');
        setSortOrder('');
    }

    return (
        <>
            <Box sx={{ my: "1rem", }}>

                <Typography
                    variant='h6'
                    sx={{ fontWeight: "bold", my: 1, fontSize: "1rem" }}
                >
                    Sort Parameters
                    <Tooltip arrow title="Sorting will be performed on above searched data">
                        <ToolTipText>i</ToolTipText>
                    </Tooltip>
                </Typography>


                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Select Column 1 Dropdown  */}
                    <Box sx={{ width: "50vw", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                disableClearable
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={tabularRepresentationState.all_columns}
                                size="small"
                                value={sortColumn}
                                onChange={(e, value, reason) => setSortColumn(value)}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
                            />
                        </FormControl>
                    </Box>

                    {/* Select Value Dropdown  */}
                    <Box sx={{ width: "50vw" }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label-2">Order</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-f2"
                                id="demo-simple-select-2"
                                value={sortOrder}
                                label="Value"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <MenuItem value="ascending" key="asc">Ascending</MenuItem>
                                <MenuItem value="descending" key="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: "30vw", ml: "1rem" }}>
                        <Button variant='outlined' disabled={(sortColumn.length != 0 && sortOrder.length != 0) ? false : true} onClick={handleSortSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    {
                        Object.keys(sortQuery).length != 0 ?
                            (<>
                                <Badge badgeContent={Object.keys(sortQuery).length} color="primary">
                                    <Button variant='outlined' onClick={() => setSortOpen(true)}>Show Parameters</Button>
                                </Badge>
                                <Button variant='outlined' onClick={() => setSortQuery({})} sx={{ ml: 2 }}>Reset</Button>
                            </>
                            ) : (
                                <></>
                            )
                    }
                </Box>
            </Box>

            {/*  Sort Popup */}
            <Dialog
                open={sortOpen}
                onClose={() => setSortOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sort Parameters"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Column</TableCell>
                                        <TableCell>Direction</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(sortQuery).map((row) => (
                                            <TableRow
                                                key={row}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row}

                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        <Paper
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'start',
                                                                flexWrap: 'wrap',
                                                                listStyle: 'none',
                                                                p: 0.5,
                                                                m: 0,
                                                            }}
                                                        > {
                                                                sortQuery[row]
                                                                    ? "Ascending"
                                                                    : "Descending"
                                                            }

                                                        </Paper>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Link href="#" underline="none">
                                                        <DeleteOutlineIcon onClick={() => {
                                                            let temp = { ...sortQuery };
                                                            delete temp[row];
                                                            setSortQuery(temp);
                                                        }} />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSortOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SortParameters;