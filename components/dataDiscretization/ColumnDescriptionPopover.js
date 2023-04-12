import React from 'react';
import { Popover, Box, Grid, Typography } from '@mui/material';

// Icons
import InfoIcon from '@mui/icons-material/Info';

const ColumnDescriptionPopover = () => {

    // Local State for Popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openColumnDescription = Boolean(anchorEl);
    const popoverId = openColumnDescription ? 'simple-popover' : undefined;

    const handlePopoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            < InfoIcon color="primary" sx={{ cursor: "pointer" }} aria-describedby={popoverId} onClick={handlePopoverClick} />
            {/* Popover  /*/}
            <Popover
                id={popoverId}
                open={openColumnDescription}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                < Box sx={{ p: 2,width:"20vw" }} >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography component="span" variant="body2" sx={{fontWeight:600}} >No of Rows: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >Min: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >Max: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >Mean: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >Std: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >25%: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >50%: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="span" variant="body2" sx={{fontWeight:500}} >75%: </Typography>
                            <Typography component="span" variant="body2" >40</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </>
    )
}

export default ColumnDescriptionPopover