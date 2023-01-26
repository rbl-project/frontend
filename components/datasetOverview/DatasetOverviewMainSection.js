import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import NumericalVsCategoricalPieChart from './NumericalVsCategoricalPieChart';

const DatasetOverviewMainSection = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} > <Box sx={{backgroundColor:"#f2f2f2"}}height={50}>Title</Box> </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={200}>Box 1</Box> </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={200}>Box 2</Box> </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0}> <Box height={500}>List 1</Box> </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <Paper elevation={0}> <Box sx={{backgroundColor:"#f2f2f2"}} height={416}>Table 1</Box> </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={350}>< NumericalVsCategoricalPieChart/></Box> </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}> <Box height={350}>< NumericalVsCategoricalPieChart/></Box> </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0}><Box height={600}>Table 2</Box></Paper>
        </Grid>
      </Grid>
    </Box>

  )
}

export default DatasetOverviewMainSection;
