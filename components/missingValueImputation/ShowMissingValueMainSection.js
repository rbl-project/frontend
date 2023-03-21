import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Grid, Typography, Divider, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getMissingValuePercentage } from "/store/missingValueImputationSlice";

// Components
import ColumnCard from './ColumnCard';

// Constants
import { REQUEST_STATUS_LOADING } from "/constants/Constants";


const ShowMissingValueMainSection = () => {

    // Redux State
    const dispatch = useDispatch();
    const missingValueImputationState = useSelector((state) => state.missingValueImputation);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);

    // Local State for Columns Showed in Missing Value Column Cards
    const [columns, setColumns] = useState([]);

    // Local State for Search Column SearchBar
    const [searchColumn, setSearchColumn] = useState(null);

    // Handle Search Column SearchBar Selection or Deselection
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);
        // If Clear Button is Clicked
        if (reason === "clear") {
            setColumns(missingValueImputationState.missing_value_data);
        }
        // If Option is Selected
        else {
            setColumns(missingValueImputationState.missing_value_data.filter((column) => column.column_name === newValue));
        }
    };

    // Handle Search Column SearchBar Input Change
    const handleSearchCoulmnInputChange = (event, newInputValue) => {
        if (newInputValue === "") {
            setColumns(missingValueImputationState.missing_value_data);
        } else {
            setColumns(missingValueImputationState.missing_value_data.filter((column) => column.column_name.toLowerCase().includes(newInputValue.toLowerCase())));
        }
    };

    // Get Missing Value Percentage for All Columns
    useEffect(() => {
        dispatch(getMissingValuePercentage({ dataset_name: selectedDataset, get_all_columns: true, column_name: null }));
    }, [selectedDataset]);

    // Set Local State when Missing Value Percentage for All Columns is Fetched
    useEffect(() => {
        if (missingValueImputationState.missing_value_data) {
            setColumns(missingValueImputationState.missing_value_data);
        }
    }, [missingValueImputationState.missing_value_data]);

    return (
        <Paper elevation={0}>
            <Box sx={{ minHeight: "89vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", p: 2, pt: 1 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Missing Value Count</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>

                { /* Loading State */}
                {missingValueImputationState.get_missing_value_percentage_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        < CircularProgress size="3rem" color="inherit" />
                    </Box>
                ) : (
                    <>

                        {/* Search Column SearchBar */}
                        < Box sx={{ width: "50%", mx: "auto", mt: 1, mb: 2 }}>
                            <FormControl fullWidth size="small">
                                <Autocomplete
                                    fullWidth={true}
                                    filterSelectedOptions={true}
                                    id="combo-box-demo"
                                    options={columns.map((column) => column.column_name)}
                                    size="small"
                                    value={searchColumn}
                                    onChange={handleSearchCoulmnChange}
                                    onInputChange={handleSearchCoulmnInputChange}
                                    renderInput={(params) => <TextField sx={{}} {...params} label="Search Column" size="small" />}
                                    renderOption={(props, option) => (
                                        < Tooltip title={option} placement="bottom-start" key={`tooltip-${option}`}>
                                            <ListItemText key={option} {...props} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} >{option}</ListItemText>
                                        </Tooltip>
                                    )}
                                />
                            </FormControl>
                        </Box>

                        {/* Missing Values Column Cards Secction  */}
                        <Box sx={{ mt: 2, height: "100%" }}>
                            
                            {/* No Content to Show */}
                            {missingValueImputationState.missing_value_data && missingValueImputationState.missing_value_data.length === 0 && (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>No Content to Show</Typography>
                                </Box>
                            )}

                            {/* Missing Values Column Cards */}
                            <Box sx={{ flexGrow: 1, width: "100%" }}>
                                <Grid container spacing={3}>
                                    {columns.map((column) => (
                                        <Grid item xs={3} key={column.column_name}>
                                            <ColumnCard columnName={column.column_name} allColumns={column.all_columns} missingValuePercentage={column.missing_value_percentage} correctValuePercentage={column.correct_value_percentage} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Paper >
    )
}

export default ShowMissingValueMainSection;