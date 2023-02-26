import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

const HeatMap = () => {

    //  Redux State
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);

    return (
        <Box sx={{ height: "83vh", width: "100%", px: 2, py: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
            {dataCorrelationState.checked_columns.length < 2 ?
                (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Content to Show</Typography>
                        <Typography variant="h6" >Please Select Two or More Columns</Typography>
                    </Box>

                ) : (
                    <Box sx={{ height: "65vh", width: "55vw", position: "relative" }}>
                        <Image layout="fill" fill style={{ objectFit: "contain" }} src={`data:image/png;base64,${dataCorrelationState.heatmap}`} />
                    </Box>
                )}
        </Box>
    )
}

export default HeatMap