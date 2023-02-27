import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    Input,
    Chip,
    Divider,
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
    CircularProgress,
    OutlinedInput,
} from "@mui/material";

import { ToolTipText } from "./TabularRepresentationStyles";
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// actions
import { getColumnInfo, getTabularRepresentation } from "/store/tabularRepresentationSlice";
import { setOpenMenuItem } from "/store/globalStateSlice";

// constants
import { REQUEST_STATUS_LOADING, TABULAR_REPRESENTATION } from '/constants/Constants';

const TabularRepresentationMainSection = () => {

    //! ================ SELECTED DATASET AND OTHER STATE INFO ===============

    // REdux state
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // local state
    const [categoricalColValuesOptions, setCategoricalColValuesOptions] = useState([]);

    // Calling backend APIs
    useEffect(() => {
        if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
            dispatch(getColumnInfo({ dataset_name: selectedDataset }));
            dispatch(getTabularRepresentation({ dataset_name: selectedDataset }));
        }
    }, [selectedDataset])

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== TABULAR_REPRESENTATION) {
            dispatch(setOpenMenuItem(TABULAR_REPRESENTATION));
        }
    }, []);


    const data_columns = tabularRepresentationState.filterd_data?.dataframe?.columns;
    const data_rows = tabularRepresentationState.filterd_data?.dataframe?.data;

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        rowsPerPage: 12,
        elevation: 0,
        tableBodyHeight: '74vh',
        // tableBodyMaxHeight: '650px',
        fixedHeader: true,
        textLabels: {
            body: {
                noMatch: 'No data to show',
            }
        }
    };


    //! ====================  SEARCH PARAMETERS ============================
    const [searchQuery, setSearchQuery] = useState({
        "categorical_col": {},
        "numerical_col": {}
    });
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


    //! ====================== SORTING PARAMETERS ==========================
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [sortQuery, setSortQuery] = useState({});
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


    //! ======================= FILTERING PARAMETERS ========================

    const intital_filter_query = {
        "end": 'end', // end index is end of dataframe itself
        "columns": [], // all columns
        "row_start": 0, // start form 1st row
        "row_end": 'end' // end index is end of dataframe itself
    }
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState('end');
    const [filterColumn, setFilterColumn] = useState([]);

    const [filterQuery, setFilterQuery] = useState({ // if end is string 'end' then consider end of the dataframe and do not conisder row_end
        "columns": filterColumn, // if filtercolumn length is 0 then consider all the columnns
        "row_start": startIndex,
        "row_end": endIndex
    });
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

    //! ====================== FINAL SUBMIT AND OTHERs========================

    const handleFinalSubmit = (e) => {
        // if row_end is not 'end' and is greater than row start then alert that row_start cannot be greater than row_end
        if (filterQuery.row_end !== 'end' && (parseInt(filterQuery.row_end) < parseInt(filterQuery.row_start))) {
            toast('Row start cannot be greater than row end', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const finalQuery = {
            "dataset_name": selectedDataset,
            "search": searchQuery,
            "sort": sortQuery,
            "filter": filterQuery
        }
        dispatch(getTabularRepresentation(finalQuery));
    }

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{
                                py: "0.1rem",
                                px: "0.5rem",
                                height: "89vh",
                                overflowY: "scroll",
                                overflow: "auto",
                                "&::-webkit-scrollbar": { width: "0.6rem", height: "0.6rem", borderRadius: "2rem" },
                                "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
                                "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" }
                            }}>

                                {/* SEARCH  */}
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

                                <Divider sx={{ mt: 5 }} />
                                {/* SORT  */}
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

                                <Divider sx={{ mt: 5 }} />
                                {/* FILTER  */}
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

                                    <Typography variant='h6' sx={{ fontWeight: "bold", my: 1, fontSize: "15px", textAlign: "center" }} >
                                        Rows
                                    </Typography>

                                    {/* Row Start Index */}
                                    <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {/* Select Rows start Dropdown  */}
                                        <Box sx={{ mr: 1 }}>
                                            <Typography>From: </Typography>
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
                                    <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {/* Select Rows start Dropdown  */}
                                        <Box sx={{ mr: 1 }}>
                                            <Typography>To: </Typography>
                                        </Box>
                                        <Box sx={{ mr: 2 }}>

                                            <Button onClick={() => {
                                                setEndIndex('end')
                                                setFilterQuery({
                                                    ...filterQuery, ["row_end"]: 'end'
                                                })
                                            }}
                                                style={endIndex !== 'end' && endIndex !== undefined ? { marginLeft: "1rem", color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 } : { marginLeft: "1rem", padding: 0 }}
                                                variant="outlined">
                                                End
                                            </Button>
                                        </Box>

                                        <p>or</p>

                                        <Box sx={{ mr: 2 }}>
                                            <TextField
                                                size='small'
                                                error={endIndex !== 'end' && (parseInt(endIndex) < parseInt(startIndex))}
                                                helperText={(endIndex !== 'end' && (parseInt(endIndex) < parseInt(startIndex)) ? "End must be greater than start" : "")}
                                                inputProps={{ inputMode: 'numeric' }}
                                                value={endIndex}
                                                onChange={handleEndIndexChange}
                                                style={endIndex === 'end' ? { padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" } : { padding: "6px 16px" }} type="number" placeholder="Index" />

                                        </Box>
                                    </Box>

                                    <Typography variant='h6' sx={{ fontWeight: "bold", my: 1, fontSize: "15px", textAlign: "center" }} >
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
                                                    setEndIndex('end')
                                                    setFilterColumn([])
                                                }} sx={{ ml: 2 }}>Reset</Button>
                                            </>
                                        }
                                    </Box>


                                </Box>

                                <Divider sx={{ mt: 5 }} />
                                <Box sx={{ my: "1rem", textAlign: 'center' }}>
                                    <Button variant='contained' onClick={handleFinalSubmit}>
                                        Submit
                                    </Button>
                                </Box>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={8}>
                    <Grid container >
                        <Grid item xs={12}>
                            {
                                tabularRepresentationState.requestStatus === REQUEST_STATUS_LOADING
                                    ? (
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "640px" }}>
                                            <CircularProgress size="4rem" color="inherit" />
                                        </Box>
                                    ) : (
                                        <MUIDataTable
                                            title={"Result"}
                                            data={data_rows}
                                            columns={data_columns}
                                            options={options}
                                        />
                                    )
                            }
                            {/* <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Box sx={{ height: "90vh"}}>
                                    {
                                        tabularRepresentationState.requestStatus === REQUEST_STATUS_LOADING
                                            ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "640px" }}>
                                                    <CircularProgress size="4rem" color="inherit" />
                                                </Box>
                                            ) : (
                                                <MUIDataTable
                                                    title={"Result"}
                                                    data={data_rows}
                                                    columns={data_columns}
                                                    options={options}
                                                />
                                            )
                                    }

                                </Box>
                            </Paper> */}

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            {/* DIALOG BOXES */}

            {/* 1. Search Popup */}
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

            {/* 2. Sort Popup */}
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

            {/* 3. Filter Popup */}
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

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Box>
    )
}

export default TabularRepresentationMainSection;