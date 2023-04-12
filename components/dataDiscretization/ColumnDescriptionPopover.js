import React from 'react';
import { Popover, Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';


// Icons
import InfoIcon from '@mui/icons-material/Info';
import { REQUEST_STATUS_LOADING } from '/constants/Constants';

const ColumnDescriptionPopover = () => {

    // Redux
    const dataDiscretizationState = useSelector(state => state.dataDiscretization);
    const columnDescription = dataDiscretizationState.column_description;

    // Local State for Popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openColumnDescription = Boolean(anchorEl);
    const popoverId = openColumnDescription ? 'simple-popover' : undefined;

    const handlePopoverClick = (event) => {
        if (columnDescription !== null){
            setAnchorEl(event.currentTarget);
        }
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            < InfoIcon color={columnDescription === null? "disabled":"primary"} disabled sx={{ cursor: "pointer" }} aria-describedby={popoverId} onClick={handlePopoverClick} />
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
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                < Box sx={{ p: 2, width: "20vw" }} >
                    {
                        dataDiscretizationState.get_column_description_req_status === REQUEST_STATUS_LOADING ?  // loading
                            (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:"center", height:"10rem" }}>
                                    <CircularProgress color='inherit' size="1rem" />
                                </Box>

                            ) : (

                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography component="span" variant="body1" sx={{ fontWeight: 800 }} >{columnDescription?.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >No of Rows: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.count}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >Min: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.min?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >Max: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.max?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >Mean: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.mean?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >Std: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.std?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >25%: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.["25%"]?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >50%: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.["50%"]?.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }} >75%: </Typography>
                                        <Typography component="span" variant="body2" >{columnDescription?.["75%"]?.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>

                            )
                    }

                </Box>
            </Popover>
        </>
    )
}

export default ColumnDescriptionPopover