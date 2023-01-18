import React from 'react'
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DatasetSelectModal from './SelectDatasetModal';

const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "lightgray",
    },
}));


const DatasetSelectButton = () => {

    const datasetState = useSelector((state) => state.dataset);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ColorButton variant="outlined" size="large" align="left" onClick={handleClickOpen} disableElevation={true} fullWidth={true} endIcon={<KeyboardArrowDownIcon fontSize='large' />} sx={{
                mr: 2, textTransform: "none", height: 30, my: "auto", minWidth: 120, justifyContent: "space-between", px: 1
            }}>
                {datasetState.selectedDataset === null ? "No Detaset Selected" : datasetState.selectedDataset}
            </ColorButton>

            < DatasetSelectModal open={open} handleModalClose={handleClose} />
        </>
    )
}

export default DatasetSelectButton;






