import * as React from 'react';
import { CircularProgress, Typography, Box, Tooltip } from '@mui/material';

const MissingValuePercentageCircle = ({ value=0}) => {
    return (
        <Tooltip title={value > 0 ? "Missing Value Percentage" : "Correct Value Percentage"}>
            <Box sx={{ position: 'relative', display: 'inline-flex',mr:1 }}>
                <CircularProgress variant="determinate" value={100} size='2.5rem' thickness={3} sx={{ color: "#e5e2e2" }} />
                <CircularProgress variant="determinate" value={value > 0 ? value : 100} size='2.5rem' thickness={3} color={value > 0 ? "error" : "success"} sx={{ position: "absolute", left: 0 }} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="green" sx={{ fontSize: "0.7rem", fontWeight: 'bold' }}>
                        {`${Math.round(value > 0 ? value : 100)}%`}
                    </Typography>
                </Box>

            </Box >
        </Tooltip>
    );
}

export default MissingValuePercentageCircle;
