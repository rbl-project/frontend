import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import {
    Box,
    Dialog,
    Divider,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip,
    IconButton
} from '@mui/material';


// API Endpoints

// actions
import { globalDataRepresentation } from '/store/datasetUpdateSlice';
import { setOpenGlobalDataRepresentation } from '/store/globalStateSlice';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// constants


import GlobalDataRepresentationContent from './GlobalDataRepresentationContent';

const GlobalDataRepresentationMainSection = () => {

    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const openGlobalDataRepresentation = useSelector((state) => state.global.openGlobalDataRepresentation);


    return (
        <>
            {/* <Fab
                variant="extended"
                size="small"
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: 10,
                    textTransform: "none",
                    color: "white",
                    zIndex: 10000
                }}
                onClick={handleModalOpen}
            >
                <RemoveRedEyeIcon fontSize="medium" />
            </Fab> */}

            <Dialog
                fullWidth={true}
                maxWidth="xl"
                scroll='paper'
                open={openGlobalDataRepresentation}
                PaperProps={{
                    sx: {
                        m:1,
                        maxHeight:"92vh",
                        overflowY:"hidden"
                    }
                }}
                onClose={() => {
                    dispatch(setOpenGlobalDataRepresentation(false));
                    dispatch(globalDataRepresentation({
                        dataset_name: selectedDataset
                    }))
                }}

            >
                <DialogTitle sx={{pt:1,pb:1}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            Dataset View:
                            <Chip label={selectedDataset} sx={{ ml: 1, fontSize: "1rem", padding: "0px 3px" }} />
                        </Box>
                        <Box>
                            <IconButton
                                onClick={() => {
                                    dispatch(setOpenGlobalDataRepresentation(false))
                                    dispatch(globalDataRepresentation({
                                        dataset_name: selectedDataset
                                    }))
                                }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                        {/* <Divider /> */}
                </DialogTitle>
                <DialogContent sx={{maxHeight:"87vh"}}>
                    {/* <DialogContentText> */}
                        <GlobalDataRepresentationContent
                            currPage={0}
                            column={''}
                            columnValue={[]}
                            numericalToValue={null}
                            numericalFromValue={null}
                            parameters={{
                                "categorical_values": {},
                                "numerical_values": {}
                            }}
                        />
                    {/* </DialogContentText> */}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default GlobalDataRepresentationMainSection;
