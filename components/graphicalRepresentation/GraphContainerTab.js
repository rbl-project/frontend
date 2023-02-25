import React, { useState, useEffect } from 'react'
import { Box, MenuItem, FormControl, Button, InputLabel, Typography, CircularProgress, Tooltip, ListItemText, Autocomplete, TextField, Divider } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

// Actions from Redux State
import { generateGraph } from '/store/graphicalRepresentationSlice';

// Constants
import { REQUEST_STATUS_LOADING, } from '/constants/Constants';

const GraphContainerTab = ({ title, nColumns, graphType, column1, column2, setColumn1, setColumn2, TabIcon }) => {

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const graphicalRepresentationState = useSelector((state) => state.graphicalRepresentation);

    // State Variable for Column1 Options and Column2 Options
    const [column1_options, set_column1_options] = useState([]);
    const [column2_options, set_column2_options] = useState([]);

    // Column1 and Column2 Change Handlers
    const handleCoulmn1Change = (e, value, reason) => {
        // When the user selects an option from the dropdown, the value is set to the state variable
        if (reason === "selectOption") {
            setColumn1({ ...column1, [graphType]: value });
            set_column2_options(column2_options.filter((column) => column !== value));
        }
        // When the user clears the selected option, the value is set to the state variable
        else if (reason === "clear") {
            setColumn1({ ...column1, [graphType]: "" });
            if (graphType === "bar" || graphType === "pie") {
                set_column2_options(graphicalRepresentationState.categorical_columns);
            }
            else {
                set_column2_options(graphicalRepresentationState.numerical_columns);
            }
        }
    }
    const handleCoulmn2Change = (e, value, reason) => {
        // When the user selects an option from the dropdown, the value is set to the state variable
        if (reason === "selectOption") {
            setColumn2({ ...column2, [graphType]: value });
            set_column1_options(column1_options.filter((column) => column !== value));
        }
        // When the user clears the selected option, the value is set to the state variable
        else if (reason === "clear") {
            setColumn2({ ...column2, [graphType]: "" });
            if (graphType === "bar" || graphType === "pie") {
                set_column1_options(graphicalRepresentationState.categorical_columns);
            }
            else {
                set_column1_options(graphicalRepresentationState.numerical_columns);
            }
        }
    };

    // Generate Graph Submit button Hnadler
    const handleSubmit = () => {
        dispatch(generateGraph({ dataset_name: selectedDataset, graph_type: graphType, n_columns: nColumns, column1: column1[graphType], column2: column2[graphType] }));
    }

    // Condition for Submit Button Disable ( When nColumns === 1, only column1 is required, else both column1 and column2 are required)
    const isSubmitDisabled = nColumns === 1 ? column1[graphType] === "" : column1[graphType] === "" || column2[graphType] === "";

    // Update Column1 and Column2 Options
    useEffect(() => {
        if (graphType === "bar" || graphType === "pie") {
            set_column1_options(graphicalRepresentationState.categorical_columns);
            set_column2_options(graphicalRepresentationState.categorical_columns);
        }
        else {
            set_column1_options(graphicalRepresentationState.numerical_columns);
            set_column2_options(graphicalRepresentationState.numerical_columns);
        }
    }, [graphicalRepresentationState.numerical_columns, graphicalRepresentationState.categorical_columns]);


    return (
        <Box sx={{ height: "90vh", width: "100%", px: 2, }} >
            
            {/* Title and Icon */}
            <Box sx={{ display: "flex", alignItems: "Center", mb: 1 }}>
                < TabIcon fontSize={graphType === "box" ? "2.1rem" : "large"} />
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>{title}</Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ width: "100%", px: 4, display: "flex", alignItems: "center", }}>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", }}>
                    
                    {/* Select Column 1 Dropdown  */}
                    <Box sx={{ width: "20vw", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            <Autocomplete
                                disableCloseOnSelect
                                fullWidth={true}
                                filterSelectedOptions={true}
                                id="combo-box-demo"
                                options={column1_options}
                                size="small"
                                value={column1[graphType] === "" ? null : column1[graphType]}
                                onChange={handleCoulmn1Change}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Column1" />}
                                renderOption={(props, option) => (
                                    < Tooltip title={option} placement="bottom-start" key={`tooltip-${option}`}>
                                        <ListItemText key={option} {...props} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{option}</ListItemText>
                                    </Tooltip>
                                )}
                            />
                        </FormControl>
                    </Box>
                    {/* Select Column 2 Dropdown  */}
                    <Box sx={{ width: "20vw", mr: 2 }}>
                        {nColumns === 2 &&
                            (<FormControl fullWidth size="small">
                                <Autocomplete
                                    disableCloseOnSelect
                                    fullWidth={true}
                                    filterSelectedOptions={true}
                                    id="combo-box-demo"
                                    options={column2_options}
                                    size="small"
                                    value={column2[graphType] === "" ? null : column2[graphType]}
                                    onChange={handleCoulmn2Change}
                                    renderInput={(params) => <TextField sx={{}} {...params} label="Column2" />}
                                    renderOption={(props, option) => (
                                        < Tooltip title={option} placement="bottom-start" key={`tooltip-${option}`}>
                                            <ListItemText key={option} {...props} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{option}</ListItemText>
                                        </Tooltip>
                                    )}
                                />
                            </FormControl>
                            )}
                    </Box>
                </Box>
                
                {/* Select Button  */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" disabled={isSubmitDisabled} onClick={handleSubmit} >Select</Button>
                </Box>
            </Box>

            {/* Graph Container */}
            <Box sx={{ height: "76vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                {graphicalRepresentationState.graph_req_status === REQUEST_STATUS_LOADING ? (
                    // Loading Spinner
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "76vh" }}>
                        <CircularProgress size="2rem" color="inherit" />
                    </Box>
                ) : (
                    // When No Graph to show
                    graphicalRepresentationState.graph[graphType] === "" ?
                        (
                            // When No Grpah to show
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Content to Show</Typography>
                                <Typography variant="h6" align="center"> {nColumns === 2 ? "Please Select Column 1 and Column 2" : "Please Select the Column"}</Typography>
                            </Box>

                        ) : (
                            // Show Graph
                            <Box sx={{ height: "65vh", width: "45vw", position: "relative" }}>
                                <Image layout="fill" src={`data:image/png;base64,${graphicalRepresentationState.graph[graphType]}`} />
                            </Box>
                        )
                )}
            </Box>
        </Box>
    )
}

export default GraphContainerTab;

