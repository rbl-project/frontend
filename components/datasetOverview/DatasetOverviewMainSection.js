import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography, Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import NumericalVsCategoricalPieChart from "./NumericalVsCategoricalPieChart";
import NullVsNonNullPieChart from "./NullVsNonNullPieChart";
import DescribeCategoricalColumnsTable from "./DescribeCategoricalColumnsTable";
import CoulmnList from './ColumnList';
import DescribeNumericalColumnsTable from './DescribeNumericalColumnsTable';

import { getBasicInformation,getGraphicalRepresentation, getDescribeNumericalData, getDescribeCategoricalData } from "/store/datasetOverviewSlice";

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
    console.log("selectedDataset", selectedDataset);
    dispatch(getBasicInformation(selectedDataset));
    dispatch(getGraphicalRepresentation(selectedDataset));
    dispatch(getDescribeNumericalData(selectedDataset));
    dispatch(getDescribeCategoricalData(selectedDataset));
  }, [selectedDataset]);


  const formatNumber = (num) => {

    if (num >= 1e15) {
      return { value: (num / 1e15).toFixed(1), prefix: 'Q' };
    }
    else if (num >= 1e12) {
      return { value: (num / 1e12).toFixed(1), prefix: 'T' };
    }
    else if (num >= 1e9) {
      return { value: (num / 1e9).toFixed(1), prefix: 'B' };
    }
    else if (num >= 1e6) {
      return { value: (num / 1e6).toFixed(1), prefix: 'M' };
    }
    else if (num >= 1e3) {
      return { value: (num / 1e3).toFixed(1), prefix: 'K' };
    }
    return { value: num, prefix: null };
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} >
                <Box height={50} sx={{ display: "flex", alignItems: "center", ml: 2 }} >
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0164a9" }} >{datasetOverviewState.dataset_name}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems:"baseline", justifyContent: "center", }}>
                    <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 50 }} >{formatNumber(datasetOverviewState.n_rows).value}</Typography>
                    { datasetOverviewState.n_rows >= 1000 && (<Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 25 }} >{formatNumber(datasetOverviewState.n_rows).prefix}</Typography>) }
                  </Box>
                  <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Rows </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems:"baseline", justifyContent: "center", }}>
                    <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 50 }} >{formatNumber(datasetOverviewState.n_columns).value}</Typography>
                    { datasetOverviewState.n_columns >= 1000 && (<Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 25 }} >{formatNumber(datasetOverviewState.n_columns).prefix}</Typography>) }
                  </Box>
                  <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Columns </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1, color: "#0164a9" }} > Column List </Typography>
                <CoulmnList rows={datasetOverviewState.columns} />
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
                  < NumericalVsCategoricalPieChart data={datasetOverviewState.numerical_vs_categorical_pie_chart}/>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Box height={340}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, mt: 1, color: "#0164a9" }} > Null vs Non-Null Distribution </Typography>
                  < NullVsNonNullPieChart data={datasetOverviewState.non_null_vs_null_pie_chart} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{}}>
                <Box >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: '#0164a9' } }} >
                    <Tab label={<Typography variant="body1" sx={{ fontSize: 19, fontWeight: "bold", textTransform: "none", color: "#0164a9" }} > Describe Numerical Columns</Typography>} value="one" />
                    <Tab label={<Typography variant="body1" sx={{ fontSize: 19, fontWeight: "bold", textTransform: "none", color: "#0164a9" }} > Describe Categorical Columns</Typography>} value="two" />
                  </Tabs>
                </Box>
                <TabPanel value={value} index="one" >
                  <DescribeNumericalColumnsTable rows={datasetOverviewState.describe_numerical_data} />
                </TabPanel>
                <TabPanel value={value} index="two" >
                  <DescribeCategoricalColumnsTable rows={datasetOverviewState.describe_categorical_data} />
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>

  )
}

export default DatasetOverviewMainSection;
