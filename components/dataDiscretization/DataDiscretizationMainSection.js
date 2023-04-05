import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Grid, Chip, Typography, Divider, IconButton, InputLabel, OutlinedInput, InputAdornment, CircularProgress, Checkbox, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Components
import RangeInputFields from './RangeInputFields';
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";

// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";

// Icons
import AddIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';

// Constants
import { REQUEST_STATUS_LOADING, DATA_DISCRETIZATION, REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED } from "/constants/Constants";


const DataDiscretizationMainSection = () => {

    // Redux State
    const dispatch = useDispatch();
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // Local State for Columns in the Dataset
    const [columns, setColumns] = useState([]);
    // Local State for Search Column SearchBar
    const [searchColumn, setSearchColumn] = useState(null);

    // Local State for Count of Range Input Fields
    const [rangeInputFieldsCount, setRangeInputFieldsCount] = useState(1);

    // Local State for Range Input Fields
    const [rangeInputFields, setRangeInputFields] = useState([{ start: { value: 0, inclusive: true }, end: { value: 100, inclusive: true }, category: "Category 1" }]);


    // Handle Add Range Input Field Button Click
    const handleAddRangeInputFields = () => {
        setRangeInputFieldsCount(rangeInputFieldsCount + 1);
    };

    // Handle Remove Range Input Field Button Click
    const handleRemoveRangeInputFields = () => {
        setRangeInputFieldsCount(rangeInputFieldsCount - 1);
    };

    // Handle Search Column SearchBar Selection or Deselection
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);
        // If Clear Button is Clicked
        if (reason === "clear") {
            setColumns(datasetUpdateState.metadata?.numerical_column_list);
        }
        // If Option is Selected
        else {
            setColumns(datasetUpdateState.metadata?.numerical_column_list?.filter((column) => column === newValue));
        }
    };

    // Set Local State when Metadata is Fetched
    useEffect(() => {
        setColumns(datasetUpdateState.metadata?.numerical_column_list);
    }, [datasetUpdateState.metadata]);

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== DATA_DISCRETIZATION) {
            dispatch(setOpenMenuItem(DATA_DISCRETIZATION));
        }
    }, []);


    return (
        <Paper elevation={0}>
            <Box sx={{ minHeight: "89vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", p: 2, pt: 1 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Data Discretization</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>

                { /* Loading State */}
                {/* {missingValueImputationState.get_missing_value_percentage_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        < CircularProgress size="3rem" color="inherit" />
                    </Box>
                ) : ( */}
                <>

                    {/* Select Column to Discretize, Min and Max Values of the Column */}
                    < Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1, mb: 2, }}>

                        {/* Select Column Dropdown */}
                        < Box sx={{ width: "20%", mr: 2 }}>
                            <FormControl fullWidth size="small">
                                <Autocomplete
                                    fullWidth={true}
                                    filterSelectedOptions={true}
                                    id="combo-box-demo"
                                    options={columns}
                                    size="small"
                                    value={searchColumn}
                                    onChange={handleSearchCoulmnChange}
                                    renderInput={(params) => <TextField sx={{}} {...params} label="Select Column" size="small" />}
                                    renderOption={(props, option) => (
                                        // < Tooltip title={option} placement="bottom-start" key={`tooltip-${option}`}>
                                        <ListItemText key={option} {...props} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{option}</ListItemText>
                                        // </Tooltip>
                                    )}
                                />
                            </FormControl>
                        </Box>

                        {/* Min Value of Column */}
                        <Box sx={{ mr: 1, }}>
                            <Chip label="Min: 10" color="info" variant="outlined" />
                        </Box>

                        {/* Max Value of Column */}
                        <Box sx={{ mr: 7, }}>
                            <Chip label="Max: 100" color="secondary" variant="outlined" />
                        </Box>

                    </Box>

                    {/* Default Category Input Field  */}
                    <Box sx={{ width: "20%", mt: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="outlined-adornment-default-category">Default Category</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-default-category"
                                type='text'
                                sx={{ pr: 1 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Tooltip arrow title="This Will be taken as Category Name for those numbers which does not lie in given Ranges" placement="top">
                                            < InfoIcon />
                                        </Tooltip>
                                    </InputAdornment>
                                }
                                label="Default Category"
                            />
                        </FormControl>
                    </Box>


                    {/* First Start, End and Category-Name Input Field Area*/}
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 2, }}>
                        <RangeInputFields inputState={rangeInputFields[0]} />
                        {/* Add Button */}
                        <Box >
                            <IconButton onClick={handleAddRangeInputFields}>
                                <AddIcon sx={{ fontSize: "2rem" }} color="success" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Loop on Range Input Fields */}
                    <>
                        {
                            [...Array(rangeInputFieldsCount - 1)].map((idx) => {
                                return (
                                    <>
                                        {/* Start, End and Category-Name Input Field Area*/}
                                        < Box key={idx+1} sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1 }}>
                                            <RangeInputFields inputState={rangeInputFields[idx+1]} />
                                            {/* Add Button */}
                                            <Box >
                                                <IconButton onClick={handleRemoveRangeInputFields}>
                                                    <RemoveIcon sx={{ fontSize: "2rem" }} color="error" />
                                                </IconButton>
                                            </Box>
                                        </Box >
                                    </>
                                )
                            })

                        }
                    </>


                    {/* Apply Changes Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ mr: 1 }} startIcon={<DoneIcon />}>Apply Changes</Button>
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
                </>
                {/* )} */}
            </Box>
        </Paper >
    )
}

export default DataDiscretizationMainSection