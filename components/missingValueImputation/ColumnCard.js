import * as React from 'react';
import { Card, CardActions, CardContent, Box, Typography } from '@mui/material';

// Components
import MissingValuePercentageBar from './MissingValuePercentageBar';

const ColumnCard = ({allColumns}) => {
  return (
    <Card sx={{ width: "100%",backgroundColor:allColumns?"#dff0fa":"#eeeeee", borderRadius:3,}} elevation={0} >
      <Box sx={{p:2,pt:1}} >
        <Typography variant='h6' gutterBottom sx={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace: "nowrap"}}>
          Column Name
        </Typography>
        <Typography sx={{ fontSize: "0.85rem",my:1 }}>
          Missing Value: 'null'
        </Typography>
        <Box sx={{ width: "100%", height: "4vh",borderRadius:10 }}>
          <MissingValuePercentageBar />
        </Box>
      </Box>
    </Card>
  );
}

export default ColumnCard;