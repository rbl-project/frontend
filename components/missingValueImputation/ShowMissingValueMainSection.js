import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Grid, Typography, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getMissingValuePercentage } from "/store/missingValueImputationSlice";

// Components
import ColumnCard from './ColumnCard';

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
    }, []);

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

                {/* Search Column SearchBar */}
                <Box sx={{ width: "50%", mx: "auto", mt: 1, mb: 2 }}>
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
                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    {/* Missing Values Column Cards */}
                    <Box sx={{ flexGrow: 1, width: "100%" }}>
                        <Grid container spacing={3}>
                            {columns.map((column) => (
                                <Grid item xs={3} key={column.column_name}>
                                    <ColumnCard columnName={column.column_name} allColumns={column.all_columns} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default ShowMissingValueMainSection;