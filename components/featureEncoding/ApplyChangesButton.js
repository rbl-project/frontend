import React from 'react';

import {
    Box,
    Button
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';

const ApplyChangesButton = ({ applyFunction, disableCondition }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button disabled={disableCondition} onClick={applyFunction} variant="contained" color="primary" sx={{ mr: 1 }} startIcon={<DoneIcon />}>
                Apply Changes
            </Button>
        </Box>
    )
}

export default ApplyChangesButton