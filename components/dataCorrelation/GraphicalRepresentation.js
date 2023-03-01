import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Box, MenuItem, FormControl, Select, Button, InputLabel, Typography, CircularProgress, ListItemText, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Actions from Redux State
import { getScatterPlot, setColumn1, setColumn2 } from "/store/dataCorrelationSlice";
// Constants
import { REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCESS, REQUEST_STATUS_ERROR } from '/constants/Constants';


const GraphicalRepresentation = () => {

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const checkedColumns = useSelector((state) => state.dataCorrelation.checked_columns);
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);

    // State Variable for Scatter Plot Column1 Options and Column2 Options
    const [column1_options, set_column1_options] = useState([]);
    const [column2_options, set_column2_options] = useState([]);

    // State Variables for Scatter plot X and Y
    const handleCoulmn1Change = (event) => {
        dispatch(setColumn1(event.target.value));
        set_column2_options(checkedColumns.filter((column) => column !== event.target.value));
    };

    const handleCoulmn2Change = (event) => {
        dispatch(setColumn2(event.target.value));
        set_column1_options(checkedColumns.filter((column) => column !== event.target.value));
    };

    // Generate Scatter Plot Submit button Hnadler
    const handleSubmit = () => {
        dispatch(getScatterPlot({ dataset_name: selectedDataset, column1: dataCorrelationState.column1, column2: dataCorrelationState.column2 }))
    }

    // Update Scatter Plot Column1 and Column2 Options
    useEffect(() => {
        set_column1_options(checkedColumns.filter((column) => column !== dataCorrelationState.column2));
        set_column2_options(checkedColumns.filter((column) => column !== dataCorrelationState.column1));
    }, [checkedColumns]);

    return (
        <Box sx={{ height: "82vh", width: "100%", px: 2, py: 2, }} >
            {/* Show Scatter Plot Tab Content when 2 or More Columns are selected */}
            {dataCorrelationState.checked_columns.length < 2 ?
                (
                    // Loading Spinner
                    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Content to Show</Typography>
                            <Typography variant="h6" >Please Select Two or More Columns</Typography>
                        </Box>
                    </Box>

                ) : (
                    // Scatter Plot Tab Content
                    <>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                            {/* Select Column 1 Dropdown  */}
                            <Box sx={{ width: "20vw", mr: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Column1</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={dataCorrelationState.column1}
                                        onChange={handleCoulmn1Change}
                                        label="Column1"
                                    >
                                        {
                                            column1_options.map((column1_option) => {
                                                return (
                                                    <MenuItem value={column1_option} key={column1_option} sx={{ width: "20vw" }}>
                                                        <Tooltip title={column1_option} placement="bottom-start" key={`tooltip-${column1_option}`}>
                                                            <ListItemText key={column1_option} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{column1_option}</ListItemText>
                                                        </Tooltip>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Select Column 2 Dropdown  */}
                            <Box sx={{ width: "20vw" }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label-2">Column2</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label-2"
                                        id="demo-simple-select-2"
                                        value={dataCorrelationState.column2}
                                        onChange={handleCoulmn2Change}
                                        label="Column2"
                                    >
                                        {
                                            column2_options.map((column2_option) => {
                                                return (
                                                    <MenuItem value={column2_option} key={column2_option} sx={{ width: "20vw" }}>
                                                        <Tooltip title={column2_option} placement="bottom-start" key={`tooltip-${column2_option}`}>
                                                            <ListItemText key={column2_option} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{column2_option}</ListItemText>
                                                        </Tooltip>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Select Button  */}
                            <Box sx={{ width: "35vw", display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" disabled={dataCorrelationState.column1 === "" || dataCorrelationState.column2 === ""} onClick={handleSubmit} >Select</Button>
                            </Box>
                        </Box>
                        <Box sx={{ height: "76vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                            {dataCorrelationState.scatter_plot_req_status === REQUEST_STATUS_LOADING ? (
                                // Loading Spinner
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "76vh" }}>
                                    <CircularProgress size="2rem" color="inherit" />
                                </Box>
                            ) : (
                                // Show Scatter Plot Only if Column1 and Column2 are selected  and Scatter Plot is not empty 
                                dataCorrelationState.column1 === "" || dataCorrelationState.column2 === "" || dataCorrelationState.scatter_plot === "" ?
                                    (
                                        // When No Scatter plot to show
                                        <Box>
                                            <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Content to Show</Typography>
                                            <Typography variant="h6" align='center' >Please Select Column 1 and Column 2</Typography>
                                        </Box>

                                    ) : (
                                        // Scatter Plot
                                        <Box sx={{ height: "65vh", width: "55vw", position: "relative" }}>
                                            <Image layout="fill" src={`data:image/png;base64,${dataCorrelationState.scatter_plot}`} />
                                        </Box>
                                    )
                            )}
                        </Box>
                    </>
                )}
        </Box>
    )
}

export default GraphicalRepresentation;
