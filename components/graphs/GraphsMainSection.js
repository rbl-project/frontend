import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Components
import SelectGraphType from './SelectGraphType';
import GraphContainerTab from './GraphContainerTab';

//Icons 
import LinePlotIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import BarGraphIcon from '@mui/icons-material/SignalCellularAlt';
import HistogramIcon from '@mui/icons-material/BarChart';
import DensityPlotIcon from '@mui/icons-material/MultilineChartOutlined';
import HexbinPlotIcon from '@mui/icons-material/HiveOutlined';
import PieChartIcon from '@mui/icons-material/PieChart';
import { AiFillBoxPlot as BoxPlotIcon } from 'react-icons/ai';

// Actions from Redux State
import { getNumericalColumnsInfo, getCategoricalColumnsInfo, resetGraphState, resetRequestStatus } from '/store/graphsSlice';

// Constants
import { REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCESS, REQUEST_STATUS_FAILED, CUSTOM_ERROR_MESSAGE } from '/constants/Constants';

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

const initialState = {
    line: "",
    scatter: "",
    bar: "",
    hist: "",
    density: "",
    hexbin: "",
    pie: "",
    box: "",
}

const GraphsMainSection = () => {

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const graphsState = useSelector((state) => state.graphs);

    // Graph Type State
    const [graphType, setGraphType] = React.useState("line");

    // Column1 and Column2 State
    const [column1, setColumn1] = React.useState(initialState);
    const [column2, setColumn2] = React.useState(initialState);

    // Selecting the Correct Graph Type
    useEffect(() => {
        // If there are no numerical columns, then the graph type is set to Bar Graph
        if (graphsState.n_numerical_columns === 0) {
            setGraphType("bar");
        }
    }, [graphsState.n_numerical_columns, graphsState.n_categorical_columns]);

    // Calling the API to get the list of columns
    useEffect(() => {
        dispatch(getNumericalColumnsInfo({ dataset_name: selectedDataset }));
        dispatch(getCategoricalColumnsInfo({ dataset_name: selectedDataset }));
        dispatch(resetGraphState());
        setColumn1(initialState);
        setColumn2(initialState);
        setGraphType("line");
    }, [selectedDataset]);

    // Error Handling
    useEffect(() => {

        // Error Message
        if (
            graphsState.num_cols_req_status === REQUEST_STATUS_FAILED ||
            graphsState.cat_cols_req_status === REQUEST_STATUS_FAILED ||
            graphsState.graph_req_status === REQUEST_STATUS_FAILED
        ) {
            toast.error([undefined, null, ""].includes(graphsState.message) ? CUSTOM_ERROR_MESSAGE : graphsState.message + ". Please Refresh", {
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
    }, [graphsState.num_cols_req_status, graphsState.cat_cols_req_status, graphsState.graph_req_status])


    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>

                {/* Select Graph Type */}
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ py: "0.1rem" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1 }} > Select Graph Type </Typography>
                                <SelectGraphType setTabName={setGraphType} seletedTabName={graphType} />
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
                                    <TabPanel value={graphType} index="line" >
                                        < GraphContainerTab title="Line Plot" TabIcon={LinePlotIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="scatter" >
                                        < GraphContainerTab title="Scatter Plot" TabIcon={ScatterPlotIcon} nColumns={2} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="bar" >
                                        < GraphContainerTab title="Bar Graph" TabIcon={BarGraphIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="hist" >
                                        < GraphContainerTab title="Histogram" TabIcon={HistogramIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="density" >
                                        < GraphContainerTab title="Density Plot" TabIcon={DensityPlotIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="hexbin" >
                                        < GraphContainerTab title="Hexbin Plot" TabIcon={HexbinPlotIcon} nColumns={2} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="pie" >
                                        < GraphContainerTab title="Pie Chart" TabIcon={PieChartIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
                                    </TabPanel>
                                    <TabPanel value={graphType} index="box" >
                                        < GraphContainerTab title="Box Plot" TabIcon={BoxPlotIcon} nColumns={1} graphType={graphType} column1={column1} column2={column2} setColumn1={setColumn1} setColumn2={setColumn2} />
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
