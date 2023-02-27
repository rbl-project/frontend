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
    Link,
    Badge,
    Autocomplete,
    TextField,
} from "@mui/material";

import { ToolTipText } from "./TabularRepresentationStyles";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// actions

// constants



const SearchParameters = ({ searchQuery, setSearchQuery }) => {

    //! ================ SELECTED DATASET AND OTHER STATE INFO ===============

    // REdux state
    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);

    // local state
    const [categoricalColValuesOptions, setCategoricalColValuesOptions] = useState([]);


    //! ====================  SEARCH PARAMETERS ============================
    const [searchColumn, setSearchColumn] = useState('');
    const [searchValue, setSearchValue] = useState([]);
    const [searchColumnNumerical, setSearchColumnNumerical] = useState('');
    const [searchNumericalToValue, setSearchNumericalToValue] = useState(undefined);
    const [searchNumericalFromValue, setSearchNumericalFromValue] = useState(undefined);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchColumnSubmit = () => {
        // append serachColumn as key and searchValue as value in searchQuery object
        let searchQuery_temp = searchQuery;
        searchQuery_temp['categorical_col'][searchColumn] = searchValue;
        setSearchQuery(searchQuery_temp);

        setSearchColumn('');
        setSearchValue([]);
        // console.log(tabularRepresentationState.categorical_column_values["Species"]);
    }

    const handleSearchColumnNumericalSubmit = () => {
        // append serachColumn as key and searchValue as value in searchQuery object
        let searchQuery_temp = searchQuery;
        searchQuery_temp['numerical_col'][searchColumnNumerical] = [searchNumericalFromValue, searchNumericalToValue];
        setSearchQuery(searchQuery_temp);

        setSearchColumnNumerical('');
        setSearchNumericalToValue('');
        setSearchNumericalFromValue('');
    }

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    return (
        <>


            <Box sx={{ my: "1rem", }}>

                <Typography
                    variant='h6'
                    sx={{ fontWeight: "bold", my: 1, fontSize: "1rem" }}
                >
                    Search Parameters
                    <Tooltip arrow title="Only for columns with less than 100 unique values">
                        <ToolTipText>i</ToolTipText>
                    </Tooltip>
                </Typography>

                {/* Categorical Columns */}

                <Typography variant='h6' sx={{ fontWeight: "500", mt: 2, fontSize: "13px", textAlign: "left" }} >
                    Categorical Columns
                </Typography>

                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Select Column Dropdown  */}
                    <Box sx={{ width: "50vw", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                disableClearable
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={tabularRepresentationState.categorical_columns}
                                size="small"
                                value={searchColumn}
                                // sx={{ width: "130px", padding: "0px" }}
                                onChange={(e, value, reason) => {
                                    setSearchColumn(value)
                                    setCategoricalColValuesOptions(tabularRepresentationState.categorical_column_values[value])
                                }}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
                            />
                        </FormControl>
                    </Box>

                    {/* Select Value Dropdown  */}
                    <Box sx={{ width: "50vw" }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                multiple
                                disableClearable
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={categoricalColValuesOptions}
                                size="small"
                                value={searchValue}
                                onChange={(e, value, reason) => setSearchValue(value)}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Value" />}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: "30vw", ml: "1rem" }}>
                        <Button variant='outlined' disabled={(searchColumn.length != 0 && searchValue.length != 0) ? false : true} onClick={handleSearchColumnSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

                {/* Numerical Columns  */}
                <Typography variant='h6' sx={{ fontWeight: "500", mt: 2, fontSize: "13px", textAlign: "left" }} >
                    Numerical Columns
                </Typography>

                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Select Column Dropdown  */}
                    <Box sx={{ width: "50vw", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                disableClearable
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={tabularRepresentationState.numerical_columns}
                                size="small"
                                value={searchColumnNumerical}
                                // sx={{ width: "130px", padding: "0px" }}
                                onChange={(e, value, reason) => {
                                    setSearchColumnNumerical(value)
                                }}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
                            />
                        </FormControl>
                    </Box>


                    <Box sx={{ width: "50vw" }}>
                        <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                            <TextField placeholder='From' inputProps={{ inputMode: 'numeric' }} size='small' onChange={(e) => setSearchNumericalFromValue(e.target.value)} value={searchNumericalFromValue} sx={{ mr: 2 }} />
                            <TextField placeholder='To' inputProps={{ inputMode: 'numeric' }} size='small' onChange={(e) => setSearchNumericalToValue(e.target.value)} value={searchNumericalToValue} />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: "30vw", ml: "1rem" }}>
                        <Button variant='outlined' disabled={(searchColumnNumerical.length != 0 && searchNumericalFromValue != null && searchNumericalToValue != null) ? false : true} onClick={handleSearchColumnNumericalSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {
                        Object.keys(searchQuery['categorical_col']).length + Object.keys(searchQuery['numerical_col']).length != 0 ?
                            (<>
                                <Badge badgeContent={Object.keys(searchQuery['categorical_col']).length + Object.keys(searchQuery['numerical_col']).length} color="primary">
                                    <Button variant='outlined' onClick={() => setSearchOpen(true)}>Show Parameters</Button>
                                </Badge>
                                <Button variant='outlined' onClick={() => setSearchQuery({
                                    "categorical_col": {},
                                    "numerical_col": {}
                                })} sx={{ ml: 2 }}>Reset</Button>
                            </>
                            ) : (
                                <></>
                            )
                    }
                </Box>
            </Box>


            {/* SEARCH DIALOG */}

            <Dialog
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Search Parameters"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Column</TableCell>
                                        <TableCell>Value(s)</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        Object.keys(searchQuery['categorical_col']).map((row) => (
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
                                                            component="ul"
                                                        > {
                                                                searchQuery['categorical_col'][row].map((val) => {
                                                                    return (
                                                                        <ListItem key={val}>
                                                                            <Chip
                                                                                label={val}
                                                                                onDelete={() => {
                                                                                    const temp_list = searchQuery['categorical_col'][row].filter((item) => item !== val);
                                                                                    const temp_searchQuery = { ...searchQuery };
                                                                                    temp_searchQuery['categorical_col'][row] = temp_list;
                                                                                    setSearchQuery(temp_searchQuery)
                                                                                }}
                                                                            />
                                                                        </ListItem>
                                                                    );
                                                                })
                                                            }

                                                        </Paper>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Link href="#" underline="none">
                                                        <DeleteOutlineIcon onClick={() => {
                                                            let temp = { ...searchQuery };
                                                            delete temp['categorical_col'][row];
                                                            setSearchQuery(temp);
                                                        }} />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                    {/* Numerical */}
                                    {
                                        Object.keys(searchQuery['numerical_col']).map((row) => (
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
                                                            component="ul"
                                                        >
                                                            <Chip
                                                                label={`${searchQuery['numerical_col'][row][0]} - ${searchQuery['numerical_col'][row][1]}`}
                                                            />

                                                        </Paper>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Link href="#" underline="none">
                                                        <DeleteOutlineIcon onClick={() => {
                                                            let temp = { ...searchQuery };
                                                            delete temp['numerical_col'][row];
                                                            setSearchQuery(temp);
                                                        }} />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSearchOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </>

    )
}

export default SearchParameters;