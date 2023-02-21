import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

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


const GraphsMainSection = () => {

    const [value, setValue] = React.useState("one");

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1 }} > Select Columns </Typography>
                                {/* {dataCorrelationState.num_cols_req_status === REQUEST_STATUS_LOADING ? (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "77vh" }}>
                                        <CircularProgress size="1rem" color="inherit" />
                                    </Box>
                                ) : ( */}
                                    {/* <CoulmnCheckList handleCheckToggle={handleCheckToggle} checkedColumns={checkedColumns} /> */}
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
                                
                                    <TabPanel value={value} index="one" >
                                        Hello
                                    </TabPanel>
                                    <TabPanel value={value} index="two" >
                                        Hello2
                                    </TabPanel>
                                    <TabPanel value={value} index="three" >
                                        Hello3
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

export default GraphsMainSection;
