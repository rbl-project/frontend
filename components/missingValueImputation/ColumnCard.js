import * as React from 'react';
import Link from 'next/link';
import { Card, Box, Typography } from '@mui/material';

// Constants
import { MISSING_VALUE_IMPUTATION_PATH } from '/constants/Constants';

// Components
import MissingValuePercentageBar from './MissingValuePercentageBar';


const ColumnCard = ({ allColumns=false, columnName }) => {
  return (
    <Link href={`${MISSING_VALUE_IMPUTATION_PATH}/${columnName}`} >
      <Card sx={{ width: "100%", backgroundColor: allColumns ? "#dff0fa" : "#eeeeee", borderRadius: 3, cursor: "pointer" }} elevation={0} >
        <Box sx={{ p: 2, pt: 1 }} >
          <Typography variant='h6' gutterBottom sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {columnName}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", my: 1 }}>
            Missing Value: &apos;null&apos;
          </Typography>
          <Box sx={{ width: "100%", height: "4vh", borderRadius: 10 }}>
            <MissingValuePercentageBar />
          </Box>
        </Box>
      </Card>
    </Link >
  );
}

export default ColumnCard;