import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DashboardLayout = ({ children }) => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleToggleDrawer = () => {
        setOpen((o) => !o);
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: "rgba(218, 223, 230,1)", color: "black", minHeight: "100vh" }}>
            <CssBaseline />
            < Navbar handleToggleDrawer={handleToggleDrawer} open={open} />
            < Sidebar open={open} drawerWidth={drawerWidth} DrawerHeader={DrawerHeader} />
            <Box sx={{mt:8}}>
                {children}
            </Box>
        </Box>
    )
}

export default DashboardLayout;