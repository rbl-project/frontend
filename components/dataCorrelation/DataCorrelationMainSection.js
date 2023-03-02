import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Tabs, Tab, CircularProgress, Button, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Components
import CoulmnCheckList from './ColumnCheckList';
import CorrelationMatrix from './CorrelationMatrix';
import GraphicalRepresentation from './GraphicalRepresentation';
import HeatMap from './HeatMap';

// Actions
import { getNumericalColumns, getCorrelationMatrix, getCorrelationHeatmap, resetRequestStatus, setCheckedColumnsRedux, resetPlotState } from '/store/dataCorrelationSlice';
import { setOpenMenuItem } from "/store/globalStateSlice";

// Constants
import { REQUEST_STATUS_LOADING, REQUEST_STATUS_FAILED, DATA_CORRELATION } from '/constants/Constants';


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
            dispatch(getCorrelationHeatmap({ dataset_name: selectedDataset, column_list: dataCorrelationState.checked_columns }))
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

        if(newCheckedColumns.length === dataCorrelationState.numerical_columns.length){
            setSelectAll(true);
        }else{
            setSelectAll(false);
        }

        setCheckedColumns(newCheckedColumns);
    };

    // Select Columns Submit Handle
    const handleSubmit = () => {

        dispatch(setCheckedColumnsRedux(checkedColumns));
        dispatch(resetPlotState());

        if (value === "one") {
            dispatch(getCorrelationMatrix({ dataset_name: selectedDataset, column_list: checkedColumns }))
        } else if (value === "three") {
            dispatch(getCorrelationHeatmap({ dataset_name: selectedDataset, column_list: checkedColumns }))
        }
    }

    // Select All Checkbox State
    const [selectAll, setSelectAll] = useState(false);
    const handleSelectAllColumns = (event) => {
        selectAll ? setSelectAll(false) : setSelectAll(true);
        if (event.target.checked) {
            setCheckedColumns(dataCorrelationState.numerical_columns);
        } else {
            setCheckedColumns([]);
        }
    }


    //Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // Call Backend API When Dataset Changes
    useEffect(() => {
        setValue("one");
        if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
            dispatch(getNumericalColumns({ dataset_name: selectedDataset }))
            dispatch(getCorrelationMatrix({ dataset_name: selectedDataset, column_list: [] }))
        }
        dispatch(setCheckedColumnsRedux([]));
        dispatch(resetPlotState());
        setCheckedColumns([]);
        setSelectAll(false);
    }, [selectedDataset])

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== DATA_CORRELATION) {
            dispatch(setOpenMenuItem(DATA_CORRELATION));
        }
    }, []);

    // Handle Error Message
    useEffect(() => {
        if (
            dataCorrelationState.num_cols_req_status === REQUEST_STATUS_FAILED ||
            dataCorrelationState.corr_matrix_req_status === REQUEST_STATUS_FAILED ||
            dataCorrelationState.scatter_plot_req_status === REQUEST_STATUS_FAILED ||
            dataCorrelationState.heatmap_req_status === REQUEST_STATUS_FAILED
        ) {
            toast.error([undefined, null, ""].includes(dataCorrelationState.message) ? CUSTOM_ERROR_MESSAGE : dataCorrelationState.message + ". Please Refresh", {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            dispatch(resetRequestStatus());
        }
    }, [dataCorrelationState.num_cols_req_status, dataCorrelationState.corr_matrix_req_status, dataCorrelationState.scatter_plot_req_status, dataCorrelationState.heatmap_req_status])


    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.02rem" }}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "89vh" }}>
                                    < Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1,mx:2, width:"90%" }} >
                                        <Typography variant="h6" sx={{ fontWeight: "bold", }} > Select Columns </Typography>
                                        <Checkbox edge="end" checked={selectAll} onChange={handleSelectAllColumns} disabled={dataCorrelationState.numerical_columns.length < 2} />
                                    </Box>
                                    {dataCorrelationState.num_cols_req_status === REQUEST_STATUS_LOADING ? (
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", flexGrow:1 }}>
                                            <CircularProgress size="1rem" color="inherit" />
                                        </Box>
                                    ) : (
                                        <CoulmnCheckList handleCheckToggle={handleCheckToggle} checkedColumns={checkedColumns} />
                                    )}
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 1,width:"90%" }}>
                                        <Button variant="contained" onClick={handleSubmit} disabled={checkedColumns.length < 2} fullWidth>Submit</Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ pt: 0 }}>
                                <Box height="89vh">
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: dataCorrelationState.n_numerical_columns < 2 && "gray" } }} >
                                            <Tab disabled={dataCorrelationState.n_numerical_columns < 2} label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Correlation Value </Typography>} value="one" />
                                            <Tab disabled={dataCorrelationState.n_numerical_columns < 2} label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Graphical Representation </Typography>} value="two" />
                                            <Tab disabled={dataCorrelationState.n_numerical_columns < 2} label={<Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", }} > Heatmap </Typography>} value="three" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index="one" >
                                        {dataCorrelationState.corr_matrix_req_status === REQUEST_STATUS_LOADING ? (
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "82vh" }}>
                                                <CircularProgress size="2rem" color="inherit" />
                                            </Box>
                                        ) : (
                                            // If No of Numerical Columns is less than 2, then show the below message
                                            dataCorrelationState.n_numerical_columns < 2 ? (
                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "82vh" }}>
                                                    <Box>
                                                        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }} > No Content to Show </Typography>
                                                        <Typography variant="h6" align="center"> You Should have atleast 2 Numerical Columns in Dataset</Typography>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                < CorrelationMatrix rows={[]} />
                                            )
                                        )}
                                    </TabPanel>
                                    <TabPanel value={value} index="two" >
                                        < GraphicalRepresentation />
                                    </TabPanel>
                                    <TabPanel value={value} index="three" >
                                        {dataCorrelationState.heatmap_req_status === REQUEST_STATUS_LOADING ? (
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "82vh" }}>
                                                <CircularProgress size="2rem" color="inherit" />
                                            </Box>
                                        ) : (
                                            < HeatMap />
                                        )}
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