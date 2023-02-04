import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Tabs, Tab, CircularProgress, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CoulmnCheckList from './ColumnCheckList';
import CorrelationMatrix from './CorrelationMatrix';
import GraphicalRepresentation from './GraphicalRepresentation';
import HeatMap from './HeatMap';

import { REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCESS, REQUEST_STATUS_ERROR } from '/constants/Constants';
import { getNumericalColumns, getCorrelationMatrix, getCorrelationHeatmap, resetRequestStatus, setCheckedColumnsRedux} from '/store/dataCorrelationSlice';

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

    // Select Tab State
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {

        setValue(newValue);

        // Call API When Tab Changes
        if (newValue === "one" && dataCorrelationState.checked_columns.length > 1) {
            dispatch(getCorrelationMatrix({ dataset_name: selectedDataset, column_list: dataCorrelationState.checked_columns }))
        } else if (newValue === "three" && dataCorrelationState.checked_columns.length > 1) {
            dispatch(getCorrelationHeatmap({ dataset_name: selectedDataset, column_list:dataCorrelationState.checked_columns }))
        }
    };


    // Column Check List State
    const [checkedColumns, setCheckedColumns] = React.useState([]);
    const handleCheckToggle = (value) => () => {
        const currentIndex = checkedColumns.indexOf(value);
        const newCheckedColumns = [...checkedColumns];

        if (currentIndex === -1) {
            newCheckedColumns.push(value);
        } else {
            newCheckedColumns.splice(currentIndex, 1);
        }

        setCheckedColumns(newCheckedColumns);
    };

    // Select Columns Submit Handle
    const handleSubmit = () => {

        dispatch(setCheckedColumnsRedux(checkedColumns));
        
        if (value === "one") {
            dispatch(getCorrelationMatrix({ dataset_name: selectedDataset, column_list: checkedColumns }))
        } else if (value === "three") {
            dispatch(getCorrelationHeatmap({ dataset_name: selectedDataset, column_list: checkedColumns }))
        }
    }

    //Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);

    // Fetch Numerical Columns When Page Loads
    useEffect(() => {
        dispatch(getNumericalColumns({ dataset_name: selectedDataset }))
        dispatch(setCheckedColumnsRedux([]));
        setCheckedColumns([]);
    }, [selectedDataset])


    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1 }} > Select Columns </Typography>
                                {dataCorrelationState.num_cols_req_status === REQUEST_STATUS_LOADING ? (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "77vh" }}>
                                        <CircularProgress size="1rem" color="inherit" />
                                    </Box>
                                ) : (
                                    <CoulmnCheckList handleCheckToggle={handleCheckToggle} checkedColumns={checkedColumns} />
                                )}
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 1, mt: 2 }}>
                                    <Button variant="contained" onClick={handleSubmit} disabled={checkedColumns.length < 2} fullWidth>Submit</Button>
                                </Box>
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
                                            <Tab disabled={dataCorrelationState.checked_columns.length <= 2} label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Heatmap </Typography>} value="three" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index="one" >
                                        {/* {datasetOverviewState.desc_num_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        < CorrelationMatrix rows={[]} />
                                        {/* )} */}
                                    </TabPanel>
                                    <TabPanel value={value} index="two" >
                                        {/* {datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        < GraphicalRepresentation />
                                        {/* )} */}
                                    </TabPanel>
                                    <TabPanel value={value} index="three" >
                                        {/* {datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_LOADING ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                                                    <CircularProgress size="1rem" color="inherit" />
                                                </Box>
                                            ) : ( */}
                                        < HeatMap />
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