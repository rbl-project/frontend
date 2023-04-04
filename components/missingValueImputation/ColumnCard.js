import * as React from 'react';
import Link from 'next/link';
import { Card, Box, Typography, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

// Constants
import { MISSING_VALUE_IMPUTATION_PATH } from '/constants/Constants';

// Components
import MissingValuePercentageBar from './MissingValuePercentageBar';


const ColumnCard = ({ allColumns = false, isDeleted = false, columnName, missingValuePercentage, correctValuePercentage }) => {

  const router = useRouter();
  // Convert column name to url encoded string and convert back
  const url = `${MISSING_VALUE_IMPUTATION_PATH}/${encodeURIComponent(columnName)}`;

  const clickHandler = () => {
    if (!isDeleted) {
      router.push(url);
    }
  }
      
  return (
      <Card onClick={clickHandler} sx={{ width: "100%", backgroundColor: allColumns ? "#dff0fa" : "#eeeeee", borderRadius: 3, cursor: isDeleted ? "not-allowed" : "pointer" }} elevation={0} >
        <Box sx={{ p: 2, pt: 1 }} >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant='h6' gutterBottom sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {columnName}
            </Typography>
            {isDeleted && <Typography variant='body1' gutterBottom sx={{ color: "red", ml: 1, fontWeight: "bold" }}>
              [Deleted]
            </Typography>}
          </Box>
          <Tooltip title={isDeleted ? null : <><Typography variant="caption" component="div">Correct Values: {correctValuePercentage}%</Typography><Typography variant="caption" component="div" >Missing Values: {missingValuePercentage}%</Typography></>}>
            <Box sx={{ width: "100%", height: "4.5vh", mt: 2 }}>
              <MissingValuePercentageBar correctValuePercentage={correctValuePercentage} missingValuePercentage={missingValuePercentage} isDeleted={isDeleted} />
            </Box>
          </Tooltip>
          <Typography sx={{ fontSize: "0.85rem", mt: 1, color: isDeleted ? "gray" : "black" }} align="center">
            Missing Value Percentage
          </Typography>
        </Box>
      </Card>
  );
}

export default ColumnCard;