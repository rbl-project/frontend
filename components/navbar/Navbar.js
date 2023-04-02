import React, { useEffect } from 'react';
import { styled, useTheme, } from '@mui/material/styles';
import { Toolbar, IconButton, Typography, Box } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import MenuIcon from '@mui/icons-material/Menu';

// Actions from Redux
import { toggleSidebar } from "/store/globalStateSlice";
import { getAllDatasets } from '/store/datasetSlice';

// Components
import ProfileMenu from "./ProfileMenu";
import SelectDatasetDropdown from './SelectDatasetDropdown';


const Navbar = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector((state) => state.global.openSidebar);
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);

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

    // Get all datasets on page load
    useEffect(() => {
        if (selectedDataset === null || selectedDataset === undefined || selectedDataset === "") {
            dispatch(getAllDatasets());
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
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
                    < SelectDatasetDropdown />
                    < ProfileMenu />
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar;




