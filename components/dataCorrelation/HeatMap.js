import React from 'react';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import Image from 'next/image';

const HeatMap = () => {
    return (
        <Box sx={{ height: "83vh", width: "100%", px: 2, py: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
            <Box sx={{ height: "60vh", width: "70vw", position: "relative" }}>
                <Image fill layout="fill" src="/images/graph.png" />
            </Box>
        </Box>
    )
}

export default HeatMap