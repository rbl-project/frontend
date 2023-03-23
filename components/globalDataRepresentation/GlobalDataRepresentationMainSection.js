import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Chip
} from '@mui/material';


// API Endpoints

// actions
import { globalDataRepresentation } from '/store/datasetUpdateSlice';
import { setOpenGlobalDataRepresentation } from '/store/globalStateSlice';

// Icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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
                onClose={() => {
                    dispatch(setOpenGlobalDataRepresentation(false));
                    dispatch(globalDataRepresentation({
                        dataset_name: selectedDataset
                    }))
                }}

            >
                <DialogTitle>
                    Current Dataset View:
                    <Chip label={selectedDataset} sx={{ ml: 1, fontSize: "1rem", padding: "0px 3px" }} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        dispatch(setOpenGlobalDataRepresentation(false))
                        dispatch(globalDataRepresentation({
                            dataset_name: selectedDataset
                        }))
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GlobalDataRepresentationMainSection;
