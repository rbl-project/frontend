import React from 'react';
import { Box, FormControl, Tooltip, TextField, Checkbox,InputLabel,OutlinedInput,InputAdornment } from '@mui/material';


const RangeInputFields = () => {
    return (
        <>
            {/* Start of Range Input Field */}
            <Box sx={{ width: "17%",mr:4 }}>
                <FormControl fullWidth size="small">
                    <InputLabel htmlFor="outlined-adornment-start">Start</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-start"
                        type='number'
                        sx={{pr:0}}
                        inputProps={{ inputMode: 'numeric' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Check if you want Inclusive Start" placement="top">
                                <Checkbox defaultChecked />
                                </Tooltip>
                            </InputAdornment>
                        }
                        label="Start"
                    />
                </FormControl>
            </Box>
            {/* Start of Range Input Field */}
            <Box sx={{ width: "17%",mr:4 }}>
                <FormControl fullWidth size="small">
                    <InputLabel htmlFor="outlined-adornment-end">End</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-end"
                        type='number'
                        sx={{pr:0}}
                        inputProps={{ inputMode: 'numeric' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Check if you want Inclusive End" placement="top">
                                <Checkbox defaultChecked />
                                </Tooltip>
                            </InputAdornment>
                        }
                        label="End"
                    />
                </FormControl>
            </Box>

            {/* Category Name Input Field */}
            <Box sx={{ width: "20%", mr: 5 }}>
                <FormControl fullWidth size="small">
                    <TextField
                        fullWidth={true}
                        id="outlined-basic3"
                        label="Category Name"
                        size="small"
                        variant="outlined"
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default RangeInputFields;