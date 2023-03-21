import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Fab,
    CircularProgress,
    Chip,
    FormControl,
    TextField,
    Autocomplete,
    Stack,
    Paper
} from '@mui/material';

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// API Endpoints
import * as API from "/api";

// actions
import { globalDataRepresentation } from '/store/datasetUpdateSlice';

// Icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

// constants
import { REQUEST_STATUS_LOADING } from '../../constants/Constants';

import { styled } from '@mui/material/styles';

import GlobalDataRepresentationContent from './GlobalDataRepresentationContent';

const GlobalDataRepresentationMainSection = () => {

    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);

    const [openGlobalDataRepresentation, setOpenGlobalDataRepresentation] = useState(false);

    // Modal
    const handleModalOpen = async () => {
        setOpenGlobalDataRepresentation(true);
        await dispatch(globalDataRepresentation({
            dataset_name: selectedDataset
        }))
    }

    return (
        <>
            <Fab
                variant="extended"
                size="large"
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    textTransform: "none",
                    color: "white",
                }}
                onClick={handleModalOpen}
            >
                <RemoveRedEyeIcon fontSize="large" />
            </Fab>

            <Dialog
                fullWidth={true}
                maxWidth="xl"
                scroll='paper'
                open={openGlobalDataRepresentation}
                onClose={() => setOpenGlobalDataRepresentation(false)}

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
                    <Button onClick={() => setOpenGlobalDataRepresentation(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GlobalDataRepresentationMainSection;
