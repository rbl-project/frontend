import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, Button, ListItemText, TextField, Typography, Divider, Select, MenuItem, InputLabel, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Icons
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/HighlightOff';
import ClearIcon2 from '@mui/icons-material/DeleteForever';

// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";

// Constants
import { DATA_TRANSFORMATION, REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING } from "/constants/Constants";

// Components
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";


const DataTransformationMainSection = () => {

    // Redux State
    const dispatch = useDispatch();
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // Local State for Transformation Type
    const [transformationType, setTransformationType] = useState("normalization");
    // Local State for Search Column SearchBar
    const [searchColumn, setSearchColumn] = useState(null);
    // Local State for ColumnOptions (Numerical Columns)
    const [columnOptions, setColumnOptions] = useState([]);
    // Local State for Selected Column
    const [selectedColumns, setSelectedColumns] = useState([]);


    const handleDeleteColumn = (columnName) => {
        setSelectedColumns(selectedColumns.filter((column) => column !== columnName));
        setColumnOptions([...columnOptions, columnName]);
    };

    const handleDeleteAllColumns = () => {
        setSelectedColumns([]);
        setColumnOptions(datasetUpdateState.metadata?.numerical_column_list);
    };

    // Handle Search Column SearchBar Selection or Deselection
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);

        // If Option is Cleared
        if (reason === "clear") {
            setSearchColumn(null);
        }
        // If Option is Selected
        if (reason === "selectOption") {
            setSelectedColumns([...selectedColumns, newValue]);
            setColumnOptions(columnOptions.filter((column) => column !== newValue));
        }
    };

    // Set Local State when Metadata is Fetched
    useEffect(() => {
        setSelectedColumns([]);
        setColumnOptions(datasetUpdateState.metadata?.numerical_column_list);
    }, [datasetUpdateState.metadata]);

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== DATA_TRANSFORMATION) {
            dispatch(setOpenMenuItem(DATA_TRANSFORMATION));
        }
    }, []);

    console.log("selectedColumn", selectedColumns, "columnOptions", columnOptions);

    return (
        <Paper elevation={0}>
            <Box sx={{ minHeight: "89vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", p: 2, pt: 1 }}>
                
                {/* Title  */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Data Transformation</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>

                {/* Main Area */}
                <Box sx={{ px: 2, mt: 2 }}>

                    < Box sx={{ display: "flex", flexDirection: "row", }}>
                        {/* Select Transformation Type */}
                        <Box sx={{ width: "20%", mr: 2 }}>
                            <FormControl fullWidth size="small">
                                < InputLabel id="demo-simple-select-label-transformation-type">Transformation Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-transformation-type"
                                    id="demo-simple-select"
                                    value={transformationType}
                                    label="Transformation Type"
                                    onChange={(event) => setTransformationType(event.target.value)}
                                >
                                    <MenuItem value={"normalization"}>Normalization</MenuItem>
                                    <MenuItem value={"standardization"}>Standardization</MenuItem>
                                    <MenuItem value={"log-transformation"}>Log Transformation</MenuItem>
                                    <MenuItem value={"exponential-transformation"}>Exponential Transformation</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Select Column Dropdown */}
                        < Box sx={{ width: "20%", mr: 2, }}>
                            <FormControl fullWidth size="small">
                                <Autocomplete
                                    fullWidth={true}
                                    filterSelectedOptions={true}
                                    id="combo-box-demo"
                                    options={columnOptions}
                                    size="small"
                                    value={searchColumn}
                                    onChange={handleSearchCoulmnChange}
                                    renderInput={(params) => <TextField {...params} label="Select Column" size="small" />}
                                    renderOption={(props, option) => (
                                        // < Tooltip title={option} placement="bottom-start" key={`tooltip-${option}`}>
                                        <ListItemText key={option} {...props} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{option}</ListItemText>
                                        // </Tooltip>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>


                    < Box sx={{ display: "flex",mt:3,alignItems:"flex-end" }}>
                        {/* Selected Columns Area  */}
                        <Box sx={{ width: "50%", mr: 1, mt: "-0.65rem", }}>
                            <fieldset style={{ border: "1px solid #c4c4c4", borderRadius: 4,marginInline:0,minHeight: "15vh",maxHeight:"25vh",overflow:"auto"}}>
                                <legend style={{ fontSize: "0.8rem" }}>Selected Columns</legend>
                                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                                    {selectedColumns?.map((column) => (
                                        <Chip label={column} key={column} onDelete={() =>{handleDeleteColumn(column)}} />
                                    ))}
                                </Box>
                            </fieldset>
                        </Box>

                        {/* Clear All Selected Columns Button  */}
                        <Box>
                            <Button variant='outlined' size="small" color="error" disabled={selectedColumns.length === 0} onClick={handleDeleteAllColumns} startIcon={<ClearIcon2 />}>Clear</Button>
                        </Box>
                    </Box>

                    {/* Apply Changes Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        {/* <Button disabled={!(isValidInput && isColumnSelected)} onClick={handleApplyChanges} variant="contained" color="primary" sx={{ mr: 1, width: "12rem" }} startIcon={dataDiscretizationState.data_discretization_req_status !== REQUEST_STATUS_LOADING && (<DoneIcon />)}> */}
                        <Button variant="contained" color="primary" sx={{ mr: 1, width: "12rem" }} startIcon={(<DoneIcon />)}>
                            {/* {
                                dataDiscretizationState.data_discretization_req_status === REQUEST_STATUS_LOADING ?
                                    <CircularProgress size={20} color="inherit" />
                                    : "Apply Changes"
                            } */}
                            Apply Changes
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Result Component  */}
                <Box >
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'start', color: "black" }}>
                        Result
                    </Typography>
                    <GlobalDataRepresentationContent
                        currPage={0}
                        column={''}
                        columnValue={[]}
                        numericalToValue={null}
                        numericalFromValue={null}
                        reload={false}
                        parameters={{
                            "categorical_values": {},
                            "numerical_values": {}
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    )
}

export default DataTransformationMainSection