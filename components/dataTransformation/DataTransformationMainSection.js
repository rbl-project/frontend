import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Typography, Divider, Select, MenuItem, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";

// Constants
import { DATA_TRANSFORMATION, REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING } from "/constants/Constants";


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
    

    // Handle Search Column SearchBar Selection or Deselection
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);
        // If Clear Button is Clicked
        if (reason === "clear") {
            setColumnOptions(datasetUpdateState.metadata?.numerical_column_list);
        }
        // If Option is Selected
        else {
            setSelectedColumns([...selectedColumns, newValue]);
            setColumnOptions(datasetUpdateState.metadata?.numerical_column_list?.filter((column) => column === newValue));
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
                <Box>

                    < Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1, mb: 2, }}>

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
                        < Box sx={{ width: "20%", mr: 1 }}>
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

                </Box>

            </Box>
        </Paper>
    )
}

export default DataTransformationMainSection