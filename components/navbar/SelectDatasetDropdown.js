import React from 'react'
import { styled } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

// Redux Actions
import { setOpenModal, setCloseModal } from '/store/globalStateSlice';
// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// Components
import SelectDatasetModal from './SelectDatasetModal';


const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "lightgray",
    },
}));


const DatasetSelectButton = () => {

    // Redux State
    const dispatch = useDispatch();
    const datasetState = useSelector((state) => state.dataset);
    const isModalOpen = useSelector((state) => state.global.openModal);

    const handleClickOpen = () => {
        dispatch(setOpenModal());
    };
    const handleClose = () => {
        dispatch(setCloseModal());
    };

    return (
        <>
            <ColorButton variant="outlined" size="large" align="left" onClick={handleClickOpen} disableElevation={true} fullWidth={true} endIcon={<KeyboardArrowDownIcon fontSize='large' />} sx={{
                mr: 2, textTransform: "none", height: 30, my: "auto", minWidth: 120, justifyContent: "space-between", px: 1
            }}>
                {datasetState.selectedDataset === null ? "No Detaset Available" : datasetState.selectedDataset}
            </ColorButton>

            < SelectDatasetModal open={isModalOpen} handleModalClose={handleClose} />
        </>
    )
}

export default DatasetSelectButton;






