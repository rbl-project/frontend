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
    CircularProgress
} from '@mui/material';

import MUIDataTable from "mui-datatables";

// actions
import { globalDataRepresentation } from '/store/datasetUpdateSlice';

// Icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REQUEST_STATUS_LOADING } from '../../constants/Constants';


const GlobalDataRepresentationMainSection = () => {

    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    const [openGlobalDataRepresentation, setOpenGlobalDataRepresentation] = useState(false);
    const [currPage, setCurrPage] = useState(0);

    const handleModalOpen = () => {
        setOpenGlobalDataRepresentation(true);
        setCurrPage(0);
        
        dispatch(globalDataRepresentation({
            dataset_name: selectedDataset
        }))
    }

    const changePage = (page) => {
        setCurrPage(page);
        dispatch(globalDataRepresentation({
            dataset_name: selectedDataset,
            page: page,
        }))
    }

    const options = {
        jumpToPage: true,
        filter: true,
        filterType: 'dropdown',
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        responsive: 'vertical',
        serverSide: true,
        rowsPerPageOptions:[10],
        elevation: 0,
        tableBodyHeight: "100%",
        fixedHeader: true,
        expandableRowsHeader: true,
        textLabels: {
            body: {
                noMatch: 'No data to show',
            }
        },
        count: datasetUpdateState.currentDatasetView?.n_rows,
        page: currPage,
        onTableChange: (action, tableState) => {
            console.log(action, tableState);
    
            switch (action) {
              case 'changePage':
                changePage(tableState.page);
                break;
              default:
                console.log('action not handled.');
            }
          },
    };

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
                open={openGlobalDataRepresentation}
                onClose={() => setOpenGlobalDataRepresentation(false)}
            >
                <DialogTitle>Current Dataset View</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can view the current dataset here and explore the changes you did so far.
                    </DialogContentText>
                    <Box sx={{ height: "100vh" }}>
                        {
                            datasetUpdateState.fetchDatasetStatus === REQUEST_STATUS_LOADING
                                ? <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <CircularProgress size="3rem" color='inherit' />
                                </Box>
                                : <MUIDataTable
                                    data={datasetUpdateState.currentDatasetView?.result?.data}
                                    columns={datasetUpdateState.currentDatasetView?.result?.columns}
                                    options={options}
                                />
                        }

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGlobalDataRepresentation(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GlobalDataRepresentationMainSection;
