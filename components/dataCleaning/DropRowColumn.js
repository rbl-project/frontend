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

const DropRowsAndColumnSection = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    // local state
    const [value, setValue] = useState(0);

    const [dropByCategoricalQuery, setDropByCategoricalQuery] = useState({});
    const [dropByNumericalQuery, setDropByNumericalQuery] = useState({});
    const [dropByColNameQuery, setDropByColNameQuery] = useState({ "col_list": [] });
    const [dropByRowIndexQuery, setDropByRowIndexQuery] = useState({ "row_start": 0, "row_end": 0 });

    useEffect(() => {
        setDropByCategoricalQuery({});
        setDropByNumericalQuery({});
        setDropByColNameQuery({ "col_list": [] });
        setDropByRowIndexQuery({ "row_start": 0, "row_end": 0 });
    }, [selectedDataset])

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {/* Tabs and Buttons */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                    <Tabs textColor='secondary' indicatorColor="secondary" value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                        <Tab label="By Column Values" sx={{ textTransform: 'none' }} />
                        <Tab label="By Numerical Range" sx={{ textTransform: 'none' }} />
                        <Tab label="By Column Name" sx={{ textTransform: 'none' }} />
                        <Tab label="By Row Index" sx={{ textTransform: 'none' }} />
                    </Tabs>
                </Box>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <DropByCategoricalColValueSection
                        dropByCategoricalQuery={dropByCategoricalQuery}
                        setDropByCategoricalQuery={setDropByCategoricalQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DropByNumericColValueSection
                        dropByNumericalQuery={dropByNumericalQuery}
                        setDropByNumericalQuery={setDropByNumericalQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DropByColNameSection
                        dropByColNameQuery={dropByColNameQuery}
                        setDropByColNameQuery={setDropByColNameQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DropByRowIndexSection
                        dropByRowIndexQuery={dropByRowIndexQuery}
                        setDropByRowIndexQuery={setDropByRowIndexQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
            </Box>
        </>
    )
}

export default DropRowsAndColumnSection;


const DropByCategoricalColValueSection = ({ dropByCategoricalQuery, setDropByCategoricalQuery, dataCleaningState }) => {

    const [dropColumn, setDropColumn] = useState('');
    const [dropValue, setDropValue] = useState([]);

    const [categoricalColValuesOptions, setCategoricalColValuesOptions] = useState([]);

    const handleDropColSubmit = () => {
        console.log("Drop Column: ", dropColumn);
        console.log("Drop Values: ", dropValue);

        let dropQuery_temp = dropByCategoricalQuery;
        dropQuery_temp[dropColumn] = dropValue;
        setDropByCategoricalQuery(dropQuery_temp);

        setDropColumn('');
        setDropValue([]);

        console.log("Drop Query: ", dropByCategoricalQuery);
    }
    return (
        <>
            {/* Drop Rows by Column Values Input */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Column Dropdown  */}
                <Box sx={{ width: "20vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataCleaningState.categorical_columns}
                            size="small"
                            value={dropColumn}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setDropColumn(value)
                                setCategoricalColValuesOptions(dataCleaningState.categorical_column_values[value])
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Categorical Column" />}
                        />
                    </FormControl>
                </Box>

                {/* Select Value Dropdown  */}
                <Box sx={{ width: "20vw" }}>
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
                            value={dropValue}
                            onChange={(e, value, reason) => setDropValue(value)}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Value" />}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(dropColumn.length != 0 && dropValue.length != 0) ? false : true} onClick={handleDropColSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(dropByCategoricalQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
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
                                            Object.keys(dropByCategoricalQuery).map((col, values) => (
                                                <TableRow
                                                    key={col}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {col}

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
                                                                    dropByCategoricalQuery[col].map((val) => {
                                                                        return (
                                                                            <ListItem key={val}>
                                                                                <Chip
                                                                                    label={val}
                                                                                    onDelete={() => {
                                                                                        setDropByCategoricalQuery({
                                                                                            ...dropByCategoricalQuery,
                                                                                            [col]: dropByCategoricalQuery[col].filter((item) => item !== val)
                                                                                        })
                                                                                        if (dropByCategoricalQuery[col].length == 1) {
                                                                                            let temp = { ...dropByCategoricalQuery };
                                                                                            delete temp[col];
                                                                                            setDropByCategoricalQuery(temp);
                                                                                        }
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
                                                                let temp = { ...dropByCategoricalQuery };
                                                                delete temp[col];
                                                                setDropByCategoricalQuery(temp);
                                                            }} />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
            }
        </>
    )
}

const DropByNumericColValueSection = ({ dropByNumericalQuery, setDropByNumericalQuery, dataCleaningState }) => {

    const [dropColumnNumerical, setDropColumnNumerical] = useState('');
    const [dropNumericalToValue, setDropNumericalToValue] = useState(undefined);
    const [dropNumericalFromValue, setDropNumericalFromValue] = useState(undefined);


    const handleDropColNumericalSubmit = () => {
        // append serachColumn as key and searchValue as value in searchQuery object
        console.log(dropQuery_temp);
        let dropQuery_temp = dropByNumericalQuery;
        dropQuery_temp[dropColumnNumerical] = [dropNumericalFromValue, dropNumericalToValue];
        setDropByNumericalQuery(dropQuery_temp);

        setDropColumnNumerical('');
        setDropNumericalToValue('');
        setDropNumericalFromValue('');
    }

    return (
        <>
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Column Dropdown  */}
                <Box sx={{ width: "20vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataCleaningState.numerical_columns}
                            size="small"
                            value={dropColumnNumerical}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setDropColumnNumerical(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Numerical Column" />}
                        />
                    </FormControl>
                </Box>


                <Box>
                    <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                        <TextField placeholder='From' inputProps={{ inputMode: 'numeric' }} size='small' onChange={(e) => setDropNumericalFromValue(e.target.value)} value={dropNumericalFromValue} sx={{ mr: 2 }} />
                        <TextField placeholder='To' inputProps={{ inputMode: 'numeric' }} size='small' onChange={(e) => setDropNumericalToValue(e.target.value)} value={dropNumericalToValue} />
                    </FormControl>
                </Box>

                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(dropColumnNumerical.length != 0 && dropNumericalFromValue != null && dropNumericalToValue != null) ? false : true} onClick={handleDropColNumericalSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>
            <Box>
                <Typography sx={{ textAlign: 'start', fontStyle: 'italic', fontSize: '13px', fontWeight: '500', mt: "12px" }}>
                    <b>Note</b>: For one particular value, give both FROM and TO same as that value
                </Typography>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(dropByNumericalQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Column</TableCell>
                                            <TableCell>Range / Value</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Numerical */}
                                        {
                                            Object.keys(dropByNumericalQuery).map((row) => (
                                                <TableRow
                                                    key={row}
                                                >
                                                    <TableCell>
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
                                                            >{
                                                                (dropByNumericalQuery[row][0] == dropByNumericalQuery[row][1]) ?
                                                                    ( <Chip
                                                                        label={`${dropByNumericalQuery[row][0]}`}
                                                                    />) :
                                                                    ( <Chip
                                                                        
                                                                        label={`${dropByNumericalQuery[row][0]} - ${dropByNumericalQuery[row][1]}`}
                                                                    />)
                                                            }
                                                            </Paper>
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href="#" underline="none">
                                                            <DeleteOutlineIcon onClick={() => {
                                                                let temp = { ...dropByNumericalQuery };
                                                                delete temp[row];
                                                                setDropByNumericalQuery(temp);
                                                            }} />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
            }
        </>
    )
}

const DropByColNameSection = ({ dropByColNameQuery, setDropByColNameQuery, dataCleaningState }) => {

    const [deleteColumnList, setDeleteColumnList] = useState([]);

    const handleDeleteColSubmit = () => {
        console.log("Delete Column: ", deleteColumnList);

        let dropQuery_temp = dropByColNameQuery;
        dropQuery_temp.col_list = deleteColumnList;
        setDropByColNameQuery(dropQuery_temp);

        setDeleteColumnList([]);

        console.log("Delete Column: ", dropByColNameQuery);
    }
    return (
        <>
            {/* Drop Rows by Column Values Input */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Columns from Dropdown that is to be deleted */}
                <Box sx={{ width: "20vw" }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            multiple
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataCleaningState.categorical_columns}
                            size="small"
                            value={deleteColumnList}
                            onChange={(e, value, reason) => setDeleteColumnList(value)}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Columns to drop" />}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(deleteColumnList.length != 0) ? false : true} onClick={handleDeleteColSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                dropByColNameQuery['col_list'].length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Columns to be dropped</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key='one'>
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
                                                            dropByColNameQuery['col_list'].map((val) => {
                                                                return (
                                                                    <ListItem key={val}>
                                                                        <Chip
                                                                            label={val}
                                                                            onDelete={() => {
                                                                                setDropByColNameQuery({
                                                                                    ...dropByColNameQuery,
                                                                                    ["col_list"]: dropByColNameQuery.col_list.filter((item) => item !== val)
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
                                                        let temp = { ...dropByColNameQuery };
                                                        temp['col_list'] = [];
                                                        setDropByColNameQuery(temp);
                                                    }} />
                                                </Link>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
            }

        </>
    )
}

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