import React from 'react';
import {Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

//Icons
import CloseIcon from '@mui/icons-material/Close';

//Components
import AvailableDatasetTab from './AvailableDatasetTab';
import UploadDatasetTab from "./UploadDatasetTab"

//Redux Actions
import { setModalTabIndex } from '/store/globalStateSlice';

// Custom styled Modal
const ModalContainer = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

// Tab Panel component
const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            height="100%"
        >
            {value === index && (
                <Box sx={{ pt:3, px: 1,height:"100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const DatasetSelectModal = ({ open, handleModalClose }) => {

    const dispatch = useDispatch();
    const value = useSelector((state) => state.global.modalTabIndex);
    const handleChange = (event, newValue) => {
        dispatch(setModalTabIndex(newValue));
    };

    return (
        <ModalContainer onClose={handleModalClose} aria-labelledby="customized-dialog-title" fullWidth={true} maxWidth="md" open={open}>

            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
                Select Dataset
                {handleModalClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>

            <DialogContent>
                <Box sx={{ minWidth: 550, minHeight: 450 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Available" {...a11yProps(0)} />
                            <Tab label="Add New" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        < AvailableDatasetTab handleModalClose={handleModalClose} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        < UploadDatasetTab  handleModalClose={handleModalClose} />
                    </TabPanel>
                </Box>
            </DialogContent>
        </ModalContainer>
    )
}

export default DatasetSelectModal;