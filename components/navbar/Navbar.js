import React, { useEffect } from 'react';
import { styled, useTheme, } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Toolbar, IconButton, Typography, Box, Button, Tooltip, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MuiAppBar from '@mui/material/AppBar';

// Icons
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import RevertIcon from '@mui/icons-material/Replay';

// Actions from Redux
import { saveChanges, revertChanges, getMetaData, resetRequestStatus as resetDatasetUpdateRequestStatus } from "/store/datasetUpdateSlice";
import { toggleSidebar } from "/store/globalStateSlice";
import { getAllDatasets } from '/store/datasetSlice';

// Components
import ProfileMenu from "./ProfileMenu";
import SelectDatasetDropdown from './SelectDatasetDropdown';

// Constants
import { REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_FAILED, REQUEST_STATUS_LOADING } from '/constants/Constants';

const Navbar = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector((state) => state.global.openSidebar);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    // Custom styled AppBar
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }));

    // Function to save dataset changes
    const saveDatasetChanges = async () => {
        await dispatch(saveChanges({ dataset_name: selectedDataset }));
        dispatch(getMetaData({ dataset_name: selectedDataset }));
    }

    // Function to revert dataset changes
    const revertDatasetChanges = async () => {
        await dispatch(revertChanges({ dataset_name: selectedDataset }));
        dispatch(getMetaData({ dataset_name: selectedDataset }));
    }


    // toaster for dataset state
    useEffect(() => {

        // In case of success
        if (datasetUpdateState.revertChangesRequestStatus === REQUEST_STATUS_SUCCEEDED || datasetUpdateState.saveChangesRequestStatus === REQUEST_STATUS_SUCCEEDED) {
            toast.success(datasetUpdateState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
        }
        // In case of failure
        else if (
            datasetUpdateState.revertChangesRequestStatus === REQUEST_STATUS_FAILED ||
            datasetUpdateState.saveChangesRequestStatus === REQUEST_STATUS_FAILED ||
            datasetUpdateState.getMetadataRequestStatus === REQUEST_STATUS_FAILED
        ) {
            toast.error(datasetUpdateState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
        }

        // dispatch(resetDatasetUpdateRequestStatus());

    }, [datasetUpdateState.revertChangesRequestStatus, datasetUpdateState.saveChangesRequestStatus, datasetUpdateState.getMetadataRequestStatus])

    // Get all datasets on page load
    useEffect(() => {
        if (selectedDataset === null || selectedDataset === undefined || selectedDataset === "") {
            dispatch(getAllDatasets());
        }
        else {
            dispatch(getMetaData({ dataset_name: selectedDataset }));
        }
    }, [selectedDataset])

    return (
        <AppBar position="fixed" open={open} sx={{ bgcolor: "white", color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={1} >
            <Toolbar variant='dense'>
                {/* Menu Icon */}
                <IconButton color="inherit" aria-label="open drawer" onClick={() => { dispatch(toggleSidebar()) }} edge="start" sx={{ marginRight: 5 }} >
                    <MenuIcon />
                </IconButton>

                {/* Dashboard Title */}
                <DataThresholdingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                {/* Profile Menu and Select Dataset Dropdown */}
                <Box sx={{ display: "flex", mr: 1, alignItems: "center" }}>
                    < SelectDatasetDropdown />
                    <Box sx={{ mr: 1, width: "5.5rem" }}>
                        <Tooltip title="Once You Click on this Button, All the Changes will be made into Original Dataset Permanently">
                            <Button variant="contained" fullWidth size="small" color="success" startIcon={<SaveIcon />} onClick={saveDatasetChanges} >
                                {
                                    datasetUpdateState.saveChangesRequestStatus === REQUEST_STATUS_LOADING
                                        ? <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                                        : <Typography variant="subtitle2">
                                            Save
                                            {
                                                (datasetUpdateState.dataset_modify_status)
                                                    ? <sup> &#x2a; </sup>
                                                    : null
                                            }
                                        </Typography>
                                }
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ mr: 1, width: "5.5rem" }}>
                        <Tooltip title="Once You Click on this Button, All the Changes will be Reverted Back to Original Dataset">
                            <Button variant="outlined" fullwidth size="small" color="error" startIcon={<RevertIcon />} onClick={revertDatasetChanges}>Revert</Button>
                        </Tooltip>
                    </Box>
                    < ProfileMenu />
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar;




