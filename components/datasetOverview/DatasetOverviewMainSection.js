import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography, Tabs, Tab, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import NumericalVsCategoricalPieChart from "./NumericalVsCategoricalPieChart";
import NullVsNonNullPieChart from "./NullVsNonNullPieChart";
import DescribeCategoricalColumnsTable from "./DescribeCategoricalColumnsTable";
import CoulmnList from './ColumnList';
import DescribeNumericalColumnsTable from './DescribeNumericalColumnsTable';

import { getBasicInformation, getGraphicalRepresentation, getDescribeNumericalData, getDescribeCategoricalData, resetRequestStatus } from "/store/datasetOverviewSlice";
import { REQUEST_STATUS_LOADING,REQUEST_STATUS_FAILED } from '../../constants/Constants';

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

const DatasetOverviewMainSection = () => {

  const [value, setValue] = React.useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
  const datasetOverviewState = useSelector((state) => state.datasetOverview);


  console.log("datasetOverviewState", datasetOverviewState);

  useEffect(() => {
    if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
      console.log("selectedDataset", selectedDataset);
      dispatch(getBasicInformation());
      dispatch(getGraphicalRepresentation(selectedDataset));
      dispatch(getDescribeNumericalData(selectedDataset));
      dispatch(getDescribeCategoricalData(selectedDataset));
    }
  }, [selectedDataset]);

  useEffect(() => {
    if (datasetOverviewState.n_numerical_columns === 0) {
      setValue("two");
    }
  }, [datasetOverviewState.n_categorical_columns, datasetOverviewState.n_numerical_columns]);

  useEffect(() => {
    // Error Message
    if (
      datasetOverviewState.basic_info_req_status === REQUEST_STATUS_FAILED ||
      datasetOverviewState.desc_num_cols_req_status === REQUEST_STATUS_FAILED ||
      datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_FAILED ||
      datasetOverviewState.graph_rep_req_status === REQUEST_STATUS_FAILED
    ) {
      toast.error([undefined, null, ""].includes(datasetOverviewState.message) ? CUSTOM_ERROR_MESSAGE : datasetOverviewState.message + ". Please Refresh", {
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
  }, [datasetOverviewState.basic_info_req_status, datasetOverviewState.desc_num_cols_req_status, datasetOverviewState.desc_cat_cols_req_status, datasetOverviewState.graph_rep_req_status])



  const formatNumber = (num) => {

    let ans = {};
    if (num >= 1e15) {
      ans = { value: (num / 1e15).toFixed(1), prefix: 'Q' };
    }
    else if (num >= 1e12) {
      ans = { value: (num / 1e12).toFixed(1), prefix: 'T' };
    }
    else if (num >= 1e9) {
      ans = { value: (num / 1e9).toFixed(1), prefix: 'B' };
    }
    else if (num >= 1e6) {
      ans = { value: (num / 1e6).toFixed(1), prefix: 'M' };
    }
    else if (num >= 1e3) {
      ans = { value: (num / 1e3).toFixed(1), prefix: 'K' };
    }
    else {
      ans = { value: num, prefix: '' };
    }

    ans.value = ans.value.toString().replace(/\.0+$/, '');
    return ans;
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} >
                <Box height={50} sx={{ display: "flex", alignItems: "center", ml: 2 }} >
                  {datasetOverviewState.basic_info_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", width: "100%" }}>
                      <CircularProgress size="1rem" color="inherit" />
                    </Box>
                  ) : (
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0164a9" }} >{datasetOverviewState.dataset_name}</Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                  {datasetOverviewState.basic_info_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", width: "100%" }}>
                      <CircularProgress size="1rem" color="inherit" />
                    </Box>
                  ) :
                    (
                      <>
                        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "center", }}>
                          <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: "3.2rem" }} >{formatNumber(datasetOverviewState.n_rows).value}</Typography>
                          {datasetOverviewState.n_rows >= 1000 && (<Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 25 }} >{formatNumber(datasetOverviewState.n_rows).prefix}</Typography>)}
                        </Box>
                        <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Rows </Typography>
                      </>
                    )}

                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                  {datasetOverviewState.basic_info_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", width: "100%" }}>
                      <CircularProgress size="1rem" color="inherit" />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "center", }}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: "3.2rem" }} >{formatNumber(datasetOverviewState.n_columns).value}</Typography>
                        {datasetOverviewState.n_columns >= 1000 && (<Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 25 }} >{formatNumber(datasetOverviewState.n_columns).prefix}</Typography>)}
                      </Box>
                      <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Columns </Typography>
                    </>
                  )}

                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1, color: "#0164a9" }} > Column List </Typography>
                {datasetOverviewState.basic_info_req_status === REQUEST_STATUS_LOADING ? (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 468 }}>
                    <CircularProgress size="1rem" color="inherit" />
                  </Box>
                ) : (
                  <CoulmnList rows={datasetOverviewState.columns} />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Box height={340}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, mt: 1, color: "#0164a9" }} > Numerical vs Categorical Distribution </Typography>

                  {datasetOverviewState.graph_rep_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                      <CircularProgress size="1rem" color="inherit" />
                    </Box>
                  ) : (
                    < NumericalVsCategoricalPieChart data={datasetOverviewState.numerical_vs_categorical_pie_chart} />
                  )}

                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Box height={340}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, mt: 1, color: "#0164a9" }} > Null vs Non-Null Distribution </Typography>

                  {datasetOverviewState.graph_rep_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                      <CircularProgress size="1rem" color="inherit" />
                    </Box>
                  ) : (
                    < NullVsNonNullPieChart data={datasetOverviewState.non_null_vs_null_pie_chart} />
                  )}

                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{}}>
                <Box >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: '#0164a9' } }} >
                    {datasetOverviewState.n_numerical_columns !== 0 && (<Tab label={<Typography variant="body1" sx={{ fontSize: 19, fontWeight: "bold", textTransform: "none", color: "#0164a9" }} > Describe Numerical Columns</Typography>} value="one" />)}
                    {datasetOverviewState.n_categorical_columns !== 0 && (<Tab label={<Typography variant="body1" sx={{ fontSize: 19, fontWeight: "bold", textTransform: "none", color: "#0164a9" }} > Describe Categorical Columns</Typography>} value="two" />)}
                  </Tabs>
                </Box>
                {datasetOverviewState.n_numerical_columns !== 0 &&
                  (<TabPanel value={value} index="one" >
                    {datasetOverviewState.desc_num_cols_req_status === REQUEST_STATUS_LOADING ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                        <CircularProgress size="1rem" color="inherit" />
                      </Box>
                    ) : (
                      <DescribeNumericalColumnsTable rows={datasetOverviewState.describe_numerical_data} />
                    )}
                  </TabPanel>
                  )}
                {datasetOverviewState.n_categorical_columns !== 0 &&
                  (<TabPanel value={value} index="two" >
                    {datasetOverviewState.desc_cat_cols_req_status === REQUEST_STATUS_LOADING ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: 374 }}>
                        <CircularProgress size="1rem" color="inherit" />
                      </Box>
                    ) : (
                      <DescribeCategoricalColumnsTable rows={datasetOverviewState.describe_categorical_data} />
                    )}
                  </TabPanel>
                  )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>

  )
}

export default DatasetOverviewMainSection;
