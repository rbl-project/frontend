import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import NumericalVsCategoricalPieChart from "./NumericalVsCategoricalPieChart";
import DescribeCategoricalColumnsTable from "./DescribeCategoricalColumnsTable";
import CoulmnList from './ColumnList';
import DescribeNumericalColumnsTable from './DescribeNumericalColumnsTable';

const DatasetOverviewMainSection = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} >
                <Box height={50} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "blue" }} >Title</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <Typography variant="h1" align="center" sx={{ fontWeight: "bold", color: "orange" }} > 45 </Typography>
                  <Typography variant="h6" align="center" sx={{ fontWeight: "bold", color: "blue" }} > No of Rows </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <Typography variant="h1" align="center" sx={{ fontWeight: "bold", color: "orange" }} > 10 </Typography>
                  <Typography variant="h6" align="center" sx={{ fontWeight: "bold", color: "blue" }} > No of Columns </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }} > Column List </Typography>
                <CoulmnList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }} > Describe Categorical Columns </Typography>
                <DescribeCategoricalColumnsTable />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={350}>< NumericalVsCategoricalPieChart /></Box> </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={350}>< NumericalVsCategoricalPieChart /></Box> </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ pt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }} > Describe Numerical Columns </Typography>
            <DescribeNumericalColumnsTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>

  )
}

export default DatasetOverviewMainSection;
