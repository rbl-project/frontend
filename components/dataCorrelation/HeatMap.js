import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import { useSelector } from 'react-redux';

const HeatMap = () => {
    
    //  Redux State
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);
    
    return (
        <Box sx={{ height: "83vh", width: "100%", px: 2, py: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
            <Box sx={{ height: "65vh", width: "55vw", position: "relative" }}>
                <Image layout="fill" fill style={{objectFit:"contain"}} src={dataCorrelationState.heatmap === null ? "/images/graph.png" : `data:image/png;base64,${dataCorrelationState.heatmap}`} />
            </Box>
        </Box>
    )
}

export default HeatMap