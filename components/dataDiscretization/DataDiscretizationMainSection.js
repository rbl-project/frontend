import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Typography, Divider, CircularProgress, Select, MenuItem, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Components
import CustomDiscretizationInputs from './CustomDiscretizationInputs';
import DiscretizationInputs from './DiscretizationInputs';
import ColumnDescriptionPopover from './ColumnDescriptionPopover';
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";

// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";
import { getColumnDescription, dataDiscretization } from "/store/dataDiscretizationSlice";



// Constants
import { REQUEST_STATUS_LOADING, DATA_DISCRETIZATION, REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED } from "/constants/Constants";

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


const DataDiscretizationMainSection = () => {

    const columnMin = 10;
    const columnMax = 100;
    const nRows = 20;

    // Redux State
    const dispatch = useDispatch();
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);
    const dataDiscretizationState = useSelector((state) => state.dataDiscretization);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // Local State for Columns in the Dataset
    const [columns, setColumns] = useState([]);
    // Local State for Search Column SearchBar
    const [searchColumn, setSearchColumn] = useState(null);
    // Local State to Check if Column is Selected
    const [isColumnSelected, setIsColumnSelected] = useState(false);
    // Local State for Strategy
    const [strategy, setStrategy] = useState("uniform");
     // Local State for Encoding Type
     const [encodingType, setEncodingType] = useState("ordinal");


    // Handle Search Column SearchBar Selection or Deselection
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);
        if (newValue !== null && newValue !== undefined && newValue !== "") {
            setIsColumnSelected(true);
        }
        else {
            setIsColumnSelected(false);
        }

        // If Clear Button is Clicked
        if (reason === "clear") {
            setColumns(datasetUpdateState.metadata?.numerical_column_list);
        }
        // If Option is Selected
        else {
            setColumns(datasetUpdateState.metadata?.numerical_column_list?.filter((column) => column === newValue));
        }
    };

    // Handle Strategy Selection
    const handleStrategyChange = (event) => {
        setStrategy(event.target.value);
    };

    // Set Local State when Metadata is Fetched
    useEffect(() => {
        setColumns(datasetUpdateState.metadata?.numerical_column_list);
    }, [datasetUpdateState.metadata]);

    // When Column is Selected, Get Column Description
    useEffect(() => {
        if (searchColumn !== null && searchColumn !== undefined && searchColumn !== "") {
            dispatch(getColumnDescription({ dataset_name: selectedDataset, get_all_columns: false,column_name:searchColumn }));
        }
    }, [searchColumn]);

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


                {/* Select Column to Discretize, Strategy of Discretization, Column Description Icon */}
                < Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1, mb: 2, }}>

                    {/* Select Column Dropdown */}
                    < Box sx={{ width: "20%", mr: 1}}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={columns}
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

                    {/* Column Description Icon */}
                    <Box sx={{mr:2}}>
                        < ColumnDescriptionPopover />
                    </Box>

                    {/* Select Startegy Dropdown */}
                    <Box sx={{ width: "20%", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            < InputLabel id="demo-simple-select-label-startegy">Strategy</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-strategy"
                                id="demo-simple-select"
                                value={strategy}
                                label="Strategy"
                                onChange={handleStrategyChange}
                            >
                                <MenuItem value={"uniform"}>Equal Width</MenuItem>
                                <MenuItem value={"quantile"}>Equal Frequency</MenuItem>
                                <MenuItem value={"kmeans"}>K-Means</MenuItem>
                                <MenuItem value={"custom"}>Custom</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Encoding Type */}
                    <Box sx={{ width: "20%", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label-encoding">Encoding Type</InputLabel>
                            < Select
                                labelId="demo-simple-select-label-encoding"
                                id="demo-simple-select"
                                value={encodingType}
                                label="Encoding Type"
                                onChange={(e) => setEncodingType(e.target.value)}
                            >
                                <MenuItem value={"ordinal"}>Ordinal</MenuItem>
                                <MenuItem value={"onehot"}>One Hot</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>


                </Box>


                {/* Discretization Inputs  */}
                <Box>
                    <TabPanel value={strategy} index={"uniform"}>
                        <DiscretizationInputs strategy={strategy} nRows={nRows} columnName={searchColumn} isColumnSelected={isColumnSelected} />
                    </TabPanel>
                    <TabPanel value={strategy} index={"quantile"}>
                        <DiscretizationInputs strategy={strategy} nRows={nRows} columnName={searchColumn} isColumnSelected={isColumnSelected} />
                    </TabPanel>
                    <TabPanel value={strategy} index={"kmeans"}>
                        <DiscretizationInputs strategy={strategy} nRows={nRows} columnName={searchColumn} isColumnSelected={isColumnSelected} />
                    </TabPanel>
                    < TabPanel value={strategy} index={"custom"}>
                        <CustomDiscretizationInputs strategy={strategy} columnMin={columnMin} columnMax={columnMax} columnName={searchColumn} isColumnSelected={isColumnSelected} />
                    </TabPanel>
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
                {/* )} */}
            </Box>
        </Paper >
    )
}

export default DataDiscretizationMainSection;