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
    TextField
} from "@mui/material";

import { ToolTipText } from "./TabularRepresentationStyles";
import { useDispatch, useSelector } from 'react-redux';

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { styled } from '@mui/material/styles';
import { getColumnInfo, getTabularRepresentation } from "/store/tabularRepresentationSlice";

const TabularRepresentationMainSection = () => {

    //! ================ SELECTED DATASET AND OTHER STATE INFO ===============

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);
    const [categoricalColValuesOptions, setCategoricalColValuesOptions] = useState([]);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getColumnInfo({ dataset_name: selectedDataset }));
    }, [selectedDataset])


    const datasetColumns = ["Species", "SepalLengthCm", "Iris-setosa", "Iris-versicolor", "Iris-virginica", "SepalWidthCm", "PetalLengthCm", "PetalWidthCm"];

    //! ====================  SEARCH PARAMETERS ============================
    const [searchQuery, setSearchQuery] = useState({});
    const [searchColumn, setSearchColumn] = useState('');
    const [searchValue, setSearchValue] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);


    const handleSearchColumnChange = (event, value, reason) => {

        setSearchValue(value)
        
        // =======old code for multiple select========
        // const { target: { value }, } = event;
        // setSearchValue(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );
    }

    const handleSearchColumnSubmit = () => {
        // append serachColumn as key and searchValue as value in searchQuery object
        let searchQuery_temp = searchQuery;
        searchQuery_temp[searchColumn] = searchValue;
        setSearchQuery(searchQuery_temp);

        setSearchColumn('');
        setSearchValue([]);
        console.log(tabularRepresentationState.categorical_column_values["Species"]);
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
            ...filterQuery, ["row_start"] : event.target.value
        })
    }

    // final end index value
    const handleEndIndexChange = (event) => {
        setEndIndex(event.target.value);
        setFilterQuery({
            ...filterQuery, ["row_end"] : event.target.value
        })
    }

    const handleFilterColumnChange = (event) => {
        const { target: { value }, } = event;
        setFilterColumn(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleFilterColumnSubmit = (e) => {
        // upadte the filterQuery object with new filterColumn
        setFilterQuery({
            ...filterQuery, ['columns'] : filterColumn
        })

        setFilterColumn([]);
    }

    //! ====================== FINAL SUBMIT AND OTHERs========================

    const handleFinalSubmit = (e) => {
        // if(endIndex != 'end' && endIndex < startIndex){
        //     alert("End index should be greater than start index");
        //     return;
        // }
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
                            <Paper elevation={0} sx={{ py: "0.1rem", px: "0.5rem", overflow: 'hidden' }}>

                                {/* SEARCH  */}
                                <Box sx={{ my: "1rem", height: "33%" }}>

                                    <Typography
                                        variant='h6'
                                        sx={{ fontWeight: "bold", my: 1, fontSize: "1rem" }}
                                    >
                                        Search Parameters
                                    </Typography>

                                    <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {/* Select Column Dropdown  */}
                                        <Box sx={{ width: "30vw", mr: 2 }}>
                                            <FormControl fullWidth size="small">
                                                {/* <InputLabel id="demo-simple-select-label">Column</InputLabel> */}
                                                {/* <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={searchColumn}
                                                    label="Column"
                                                    onChange={(e) => setSearchColumn(e.target.value)}
                                                >
                                                    {
                                                        tabularRepresentationState.categoricalColumns.map((col) => {
                                                            return (
                                                                <MenuItem value={col} key={col}>{col}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select> */}
                                                <Autocomplete
                                                    disableClearable
                                                    disableCloseOnSelect
                                                    fullWidth="true"
                                                    filterSelectedOptions="true"
                                                    id="combo-box-demo"
                                                    options={tabularRepresentationState.categorical_columns}
                                                    size="small"
                                                    value={searchColumn}
                                                    // sx={{ width: "130px", padding: "0px" }}
                                                    onChange={(e, value, reason) => {
                                                        setSearchColumn(value)
                                                        setCategoricalColValuesOptions(tabularRepresentationState.categorical_column_values[value])
                                                    }}
                                                    renderInput={(params) => <TextField sx={{ }} {...params} label="Column" />}
                                                />
                                            </FormControl>
                                        </Box>

                                        {/* Select Value Dropdown  */}
                                        <Box sx={{ width: "30vw" }}>
                                            <FormControl fullWidth size="small">
                                                {/* <InputLabel id="demo-simple-select-label-2">Value</InputLabel> */}
                                                {/* <Select
                                                    labelId="demo-simple-select-label-2"
                                                    id="demo-simple-select-2"
                                                    value={searchValue}
                                                    label="Value"
                                                    onChange={handleSearchColumnChange}
                                                    multiple
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} />
                                                            ))}
                                                        </Box>
                                                    )}
                                                >
                                                    {
                                                        datasetColumns.map((col) => {
                                                            return (
                                                                <MenuItem value={col} key={col}>{col}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select> */}
                                                <Autocomplete
                                                    multiple
                                                    disableClearable
                                                    disableCloseOnSelect
                                                    fullWidth="true"
                                                    filterSelectedOptions="true"
                                                    id="combo-box-demo"
                                                    options={categoricalColValuesOptions}
                                                    size="small"
                                                    value={searchValue}
                                                    onChange={(e, value, reason) => setSearchValue(value)}
                                                    renderInput={(params) => <TextField sx={{ }} {...params} label="Value" />}
                                                />
                                            </FormControl>
                                        </Box>

                                        <Box sx={{ width: "30vw", ml: "1rem" }}>
                                            <Button variant='outlined' disabled={(searchColumn.length != 0 && searchValue.length != 0) ? false : true} onClick={handleSearchColumnSubmit} >
                                                <FileDownloadDoneIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        {
                                            Object.keys(searchQuery).length != 0 ?
                                                (<>
                                                    <Badge badgeContent={Object.keys(searchQuery).length} color="primary">
                                                        <Button variant='outlined' onClick={() => setSearchOpen(true)}>Show Parameters</Button>
                                                    </Badge>
                                                    <Button variant='outlined' onClick={() => setSearchQuery({})} sx={{ ml: 2 }}>Reset</Button>
                                                </>
                                                ) : (
                                                    <></>
                                                )
                                        }
                                    </Box>
                                </Box>

                                <Divider sx={{ mt: 5 }} />
                                {/* SORT  */}
                                <Box sx={{ my: "1rem", height: "23%" }}>

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
                                        <Box sx={{ width: "30vw", mr: 2 }}>
                                            <FormControl fullWidth size="small">
                                                {/* <InputLabel id="demo-simple-select-label">Column</InputLabel> */}
                                                {/* <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={sortColumn}
                                                    label="Column"
                                                    onChange={(e) => setSortColumn(e.target.value)}
                                                >
                                                    {
                                                        datasetColumns.map((col) => {
                                                            return (
                                                                <MenuItem value={col} key={col}>{col}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select> */}
                                                <Autocomplete
                                                    disableClearable
                                                    disableCloseOnSelect
                                                    fullWidth="true"
                                                    filterSelectedOptions="true"
                                                    id="combo-box-demo"
                                                    options={tabularRepresentationState.all_columns}
                                                    size="small"
                                                    value={sortColumn}
                                                    onChange={(e, value, reason) => setSortColumn(value)}
                                                    renderInput={(params) => <TextField sx={{ }} {...params} label="Column" />}
                                                />
                                            </FormControl>
                                        </Box>

                                        {/* Select Value Dropdown  */}
                                        <Box sx={{ width: "30vw" }}>
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
                                <Box sx={{ my: "1rem", height: "33%" }}>

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
                                            {
                                                startIndex !== 0 && startIndex !== undefined ? // if index is not start and also not undefined then disable start
                                                    (
                                                        <Button onClick={() => {
                                                            setStartIndex(0)
                                                            setFilterQuery({
                                                                ...filterQuery, ["row_start"] : 0
                                                            })
                                                        }} style={{ color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 }} variant="outlined" sx={{}}>Start</Button>

                                                    ) :
                                                    (
                                                        <Button onClick={() => {
                                                            setStartIndex(0)
                                                            setFilterQuery({
                                                                ...filterQuery, ["row_start"] : 0
                                                            })
                                                        }} style={{ padding: 0 }} variant="outlined" sx={{}}>Start</Button>
                                                    )


                                            }
                                        </Box>

                                        <p>or</p>

                                        <Box sx={{ mr: 2 }}>
                                            {
                                                startIndex === 0 ? // if index is not start and also not undefined then disable start
                                                    (
                                                        <Input value={startIndex} onChange={handleStartIndexChange} style={{ padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" }} type="number" placeholder="Index" />

                                                    ) :
                                                    (
                                                        <Input value={startIndex} onChange={handleStartIndexChange} style={{ padding: "6px 16px" }} type="number" placeholder="Index" />
                                                    )


                                            }
                                        </Box>
                                        {/* <Box sx={{ ml: "0.5rem" }}>
                                            <Button variant='outlined' onClick={handleStartIndexSubmit} >
                                                <FileDownloadDoneIcon />
                                            </Button>
                                        </Box> */}
                                    </Box>

                                    {/* Row End Index */}
                                    <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {/* Select Rows start Dropdown  */}
                                        <Box sx={{ mr: 1 }}>
                                            <Typography>To: </Typography>
                                        </Box>
                                        <Box sx={{ mr: 2 }}>
                                            {
                                                endIndex !== 'end' && endIndex !== undefined ? // if index is not start and also not undefined then disable start
                                                    (
                                                        <Button onClick={() => {
                                                            setEndIndex('end')
                                                            setFilterQuery({
                                                                ...filterQuery, ["row_end"] : 'end'
                                                            })
                                                        }} style={{ marginLeft: "1rem", color: "rgba(0, 0, 0, 0.26)", border: "1px solid rgba(0, 0, 0, 0.12)", padding: 0 }} variant="outlined" sx={{}}>End</Button>

                                                    ) :
                                                    (
                                                        <Button onClick={() => {
                                                            setEndIndex('end')
                                                            setFilterQuery({
                                                                ...filterQuery, ["row_end"] : 'end'
                                                            })
                                                        }} style={{ marginLeft: "1rem", padding: 0 }} variant="outlined" sx={{}}>End</Button>
                                                    )


                                            }
                                        </Box>

                                        <p>or</p>

                                        <Box sx={{ mr: 2 }}>
                                            {
                                                endIndex === 'end' ? // if index is not start and also not undefined then disable start
                                                    (
                                                        <Input value={endIndex} onChange={handleEndIndexChange} style={{ padding: "6px 16px", WebkitTextFillColor: "rgba(0, 0, 0, 0.38)" }} type="number" placeholder="Index" />

                                                    ) :
                                                    (
                                                        <Input value={endIndex} onChange={handleEndIndexChange} style={{ padding: "6px 16px" }}  type="number" placeholder="Index" />
                                                    )


                                            }
                                        </Box>
                                        {/* <Box sx={{ ml: "0.5rem" }}>
                                            <Button variant='outlined' onClick={handleEndIndexSubmit} >
                                                <FileDownloadDoneIcon />
                                            </Button>
                                        </Box> */}
                                    </Box>

                                    <Typography variant='h6' sx={{ fontWeight: "bold", my: 1, fontSize: "15px", textAlign: "center" }} >
                                        Columns
                                    </Typography>

                                    {/* Column Filter */}
                                    <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                                        <Box sx={{ width: "30vw" }}>
                                            <FormControl fullWidth size="small">
                                                {/* <InputLabel id="demo-simple-select-label-2">Value</InputLabel> */}
                                                {/* <Select
                                                    labelId="demo-simple-select-label-2"
                                                    id="demo-simple-select-2"
                                                    value={filterColumn}
                                                    label="Column"
                                                    multiple
                                                    onChange={handleFilterColumnChange}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} />
                                                            ))}
                                                        </Box>
                                                    )}

                                                >
                                                    {
                                                        datasetColumns.map((col) => {
                                                            return (
                                                                <MenuItem value={col} key={col}>{col}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select> */}
                                                <Autocomplete
                                                    multiple
                                                    disableClearable
                                                    disableCloseOnSelect
                                                    fullWidth="true"
                                                    filterSelectedOptions="true"
                                                    id="combo-box-demo"
                                                    options={tabularRepresentationState.all_columns}
                                                    size="small"
                                                    value={filterColumn}
                                                    // sx={{ width: "130px", padding: "0px" }}
                                                    onChange={(e,value, reason) => setFilterColumn(value)}
                                                    renderInput={(params) => <TextField sx={{ }} {...params} label="Value" />}
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
                                <Box sx={{ my: "1rem", height: "33%", textAlign: 'center' }}>
                                    <Button variant='contained' onClick={handleFinalSubmit}>
                                        Submit
                                    </Button>
                                </Box>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={8}>
                    <Grid container xs={12}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography
                                    variant='h6'
                                    sx={{ fontWeight: "bold", ml: 2, my: 1 }}
                                >
                                    Result
                                </Typography>
                            </Paper>

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
                maxWidth
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
                                        Object.keys(searchQuery).map((row) => (
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
                                                                searchQuery[row].map((val) => {
                                                                    return (
                                                                        <ListItem key={val}>
                                                                            <Chip
                                                                                label={val}
                                                                                onDelete={() => {
                                                                                    setSearchQuery({
                                                                                        ...searchQuery,
                                                                                        [row]: searchQuery[row].filter((item) => item !== val)
                                                                                    })
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
                                                            delete temp[row];
                                                            setSearchQuery(temp);
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
                    <Button onClick={() => setSearchOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* 2. Sort Popup */}
            <Dialog
                open={sortOpen}
                onClose={() => setSortOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth
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
                maxWidth
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

        </Box>
    )
}

export default TabularRepresentationMainSection;