import React, { useState, useEffect} from 'react'
import { Box, MenuItem, FormControl, Select, Button, InputLabel } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import {getScatterPlot} from "/store/dataCorrelationSlice";

const GraphicalRepresentation = () => {
    
    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const checkedColumns = useSelector((state) => state.dataCorrelation.checked_columns);
    const dataCorrelationState = useSelector((state) => state.dataCorrelation);

    // State Variable for Scatter Plot Column1 Options and Column2 Options
    const [column1_options, set_column1_options] = useState([]);
    const [column2_options, set_column2_options] = useState([]);

    // State Variables for Scatter plot X and Y
    const [column1, setColumn1] = useState('');
    const handleCoulmn1Change = (event) => {
        setColumn1(event.target.value);
        set_column2_options(checkedColumns.filter((column) => column !== event.target.value));
    };

    const [column2, setColumn2] = useState('');
    const handleCoulmn2Change = (event) => {
        setColumn2(event.target.value);
        set_column1_options(checkedColumns.filter((column) => column !== event.target.value));
    };

    // Generate Scatter Plot Submit button Hnadler
    const handleSubmit = () => {
        dispatch(getScatterPlot({ dataset_name: selectedDataset, column1: column1, column2: column2 }))
    }

    // Update Scatter Plot Column1 and Column2 Options
    useEffect(() => {
        set_column1_options(checkedColumns.filter((column) => column !== column2));
        set_column2_options(checkedColumns.filter((column) => column !== column1));
    },[checkedColumns]);

    return (
        <Box sx={{ height: "83vh", width: "100%", px: 2, py: 2 }} >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ width: "20vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Column1</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={column1}
                            onChange={handleCoulmn1Change}
                            label="Column1"
                        >
                            {
                                column1_options.map((column1_option) => {
                                    return (
                                        <MenuItem value={column1_option} key={column1_option}>{column1_option}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: "20vw" }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label-2">Column2</InputLabel>
                        <Select
                            labelId="demo-simple-select-label-2"
                            id="demo-simple-select-2"
                            value={column2}
                            onChange={handleCoulmn2Change}
                            label="Column2"
                        >
                            {
                                column2_options.map((column2_option) => {
                                    return (
                                        <MenuItem value={column2_option} key={column2_option}>{column2_option}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: "30vw", display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" disabled={column1 === "" || column2 === ""} onClick={handleSubmit} >Submit</Button>
                </Box>
            </Box>
            <Box sx={{ height: "76vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ height: "65vh", width: "55vw", position: "relative" }}>
                    <Image layout="fill" src={dataCorrelationState.scatter_plot === null ? "/images/graph.png" : `data:image/png;base64,${dataCorrelationState.scatter_plot}`} />
                </Box>
            </Box>
        </Box>
    )
}

export default GraphicalRepresentation;
