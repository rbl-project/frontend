import * as React from 'react';
import Link from 'next/link';
import { Card, Box, Typography, Tooltip } from '@mui/material';

// Constants
import { MISSING_VALUE_IMPUTATION_PATH } from '/constants/Constants';

// Components
import MissingValuePercentageBar from './MissingValuePercentageBar';
import MissingValuePercentagePie from './MissingValuePercentagePie';


const ColumnCard = ({ allColumns = false, columnName, missingValuePercentage, correctValuePercentage }) => {

  // Convert column name to url encoded string and convert back
  const url = `${MISSING_VALUE_IMPUTATION_PATH}/${encodeURIComponent(columnName)}`;

  return (
    <Link href={url} >
      <Card sx={{ width: "100%", backgroundColor: allColumns ? "#dff0fa" : "#eeeeee", borderRadius: 3, cursor: "pointer" }} elevation={0} >
        <Box sx={{ p: 2, pt: 1 }} >
          <Typography variant='h6' gutterBottom sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {columnName}
          </Typography>
          <Tooltip title={<><Typography variant="caption" component="div">Correct Values: {correctValuePercentage}%</Typography><Typography variant="caption" component="div" >Missing Values: {missingValuePercentage}%</Typography></>}>
            <Box sx={{ width: "100%", height: "4.5vh", mt: 2 }}>
              <MissingValuePercentageBar correctValuePercentage={correctValuePercentage} missingValuePercentage={missingValuePercentage} />
            </Box>
          </Tooltip>
          <Typography sx={{ fontSize: "0.85rem", mt: 1 }} align="center">
            Missing Value Percentage
          </Typography>
        </Box>
      </Card>
    </Link >
  );
}

export default ColumnCard;