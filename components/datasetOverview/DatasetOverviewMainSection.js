import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import NumericalVsCategoricalPieChart from "./NumericalVsCategoricalPieChart";
import NullVsNonNullPieChart from "./NullVsNonNullPieChart";
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
                <Box height={50} sx={{ display: "flex", alignItems: "center", ml: 2 }} >
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0164a9" }} >Title</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 75 }} > 45 </Typography>
                  <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Rows </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Box height={200} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <Typography variant="h2" align="center" sx={{ fontWeight: "bold", color: "#ff7f0e", fontSize: 75 }} > 10 </Typography>
                  <Typography variant="body1" align="center" sx={{ fontWeight: "bold", color: "#0066ad" }} > No of Columns </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1, color: "#0164a9" }} > Column List </Typography>
                <CoulmnList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Box height={340} width={550}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, mt: 1, color: "#0164a9" }} > Numerical vs Categorical Distribution </Typography>
                  < NumericalVsCategoricalPieChart />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Box height={340}  width={550}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, mt: 1, color: "#0164a9" }} > Null vs Non-Null Distribution </Typography>
                  < NullVsNonNullPieChart />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ pt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1, color: "#0164a9" }} > Describe Categorical Columns </Typography>
                <DescribeNumericalColumnsTable />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper elevation={0} sx={{ pt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, my: 1, color: "#0164a9" }} > Describe Numerical Columns </Typography>
            <DescribeNumericalColumnsTable />
          </Paper>
        </Grid> */}
      </Grid>
    </Box>

  )
}

export default DatasetOverviewMainSection;
