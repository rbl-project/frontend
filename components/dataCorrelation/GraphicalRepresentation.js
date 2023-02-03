import React, { useState } from 'react'
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import Image from 'next/image';

const plotOptions = ["1", "2", "3",]

const GraphicalRepresentation = () => {

    const [plot, setPlot] = useState('');
    const handleChange = (event) => {
        setPlot(event.target.value);
    };

    return (
        <Box sx={{ height: "83vh", width: "100%", px: 2, py: 1 }} >
            <Box sx={{ width: "20rem" }}>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={plot}
                        onChange={handleChange}
                        sx={{ height: "2rem" }}
                    >
                        {
                            plotOptions.map((plotOption) => {
                                return (
                                    <MenuItem value={plotOption}>{plotOption}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ height: "78vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ height: "60vh", width: "70vw", position:"relative" }}>
                    <Image fill layout="fill" src="/images/graph.png" />
                </Box>
            </Box>
        </Box>
    )
}

export default GraphicalRepresentation;
