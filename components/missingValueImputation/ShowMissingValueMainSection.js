import React, { useState } from 'react';
import { Autocomplete, Box, Paper, FormControl, Tooltip, ListItemText, TextField, Grid, Typography,Divider } from '@mui/material';

// Components
import ColumnCard from './ColumnCard';

const column_names = ["Column1", "Column2"];

const ShowMissingValueMainSection = () => {

    // Local State for Search Column SearchBar
    const [searchColumn, setSearchColumn] = useState(null);

    // Handle Search Column SearchBar
    const handleSearchCoulmnChange = (event, newValue, reason) => {
        setSearchColumn(newValue);
    };

    return (
        <Paper elevation={0}>
            <Box sx={{ minHeight: "89vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", p:2,pt:1}}>
                <Box>
                    <Typography variant="h6" sx={{fontWeight:"bold"}}>Missing Value Distribution</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>

                {/* Search Column SearchBar */}
                <Box sx={{ width: "50%",mx:"auto",mt:1,mb:2}}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={column_names}
                            size="small"
                            value={searchColumn}
                            onChange={handleSearchCoulmnChange}
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
                            <Grid item xs={3}>
                                <ColumnCard allColumns={true} />
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnCard />
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnCard />
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnCard />
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnCard />
                            </Grid>
                            <Grid item xs={3}>
                                <ColumnCard />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default ShowMissingValueMainSection;