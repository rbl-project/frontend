import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography, Tabs, Tab, CircularProgress, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CoulmnCheckList from './ColumnCheckList';
import CorrelationMatrix from './CorrelationMatrix';

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


const DataCorrelationMainSection = () => {

    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1 }} > Select Columns </Typography>
                                {/* {datasetOverviewState.basic_info_req_status === REQUEST_STATUS_LOADING ? (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 468 }}>
                                        <CircularProgress size="1rem" color="inherit" />
                                    </Box>
                                ) : ( */}
                                <CoulmnCheckList rows={[]} />
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",m:1,mt:2 }}>
                                    <Button variant="contained" fullWidth>Submit</Button>
                                </Box>
                                {/* )} */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ pt: 0 }}>
                                <Box height="90vh">
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: '#0164a9' } }} >
                                            <Tab label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Correlation Value </Typography>} value="one" />
                                            <Tab label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Graphical Representation </Typography>} value="two" />
                                            <Tab label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Heatmap </Typography>} value="three" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index="one" >
                                        {/* {datasetOverviewState.desc_num_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        < CorrelationMatrix />
                                        {/* )} */}
                                    </TabPanel>
                                    <TabPanel value={value} index="two" >
                                        {/* {datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        Two
                                        {/* )} */}
                                    </TabPanel>
                                    <TabPanel value={value} index="three" >
                                        {/* {datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        Three
                                        {/* )} */}
                                    </TabPanel>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DataCorrelationMainSection