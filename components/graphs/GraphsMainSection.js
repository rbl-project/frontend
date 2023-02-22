import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

import SelectGraphType from './SelectGraphType';
import GraphContainerTab from './GraphContainerTab';

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

    const [tabName, setTabName] = React.useState("scatter-plot");

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>

                {/* Select Graph Type */}
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1 }} > Select Graph Type </Typography>
                                <SelectGraphType setTabName={setTabName} seletedTabName={tabName} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Graph Container */}
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ pt: 0 }}>
                                <Box height="90vh">
                                    <TabPanel value={tabName} index="line-plot" >
                                        < GraphContainerTab title="Line Plot" nColumns={2} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="scatter-plot" >
                                        < GraphContainerTab title="Scatter Plot" nColumns={2} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="bar-graph" >
                                        < GraphContainerTab title="Bar Graph" nColumns={1} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="histogram" >
                                        < GraphContainerTab title="Histogram" nColumns={1} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="density-plot" >
                                        < GraphContainerTab title="Density Plot" nColumns={1} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="hexbin-plot" >
                                        < GraphContainerTab title="Hexbin Plot" nColumns={2} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="pie-chart" >
                                        < GraphContainerTab title="Pie Chart" nColumns={1} />
                                    </TabPanel>
                                    <TabPanel value={tabName} index="box-plot" >
                                        < GraphContainerTab title="Box Plot" nColumns={1} />
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
