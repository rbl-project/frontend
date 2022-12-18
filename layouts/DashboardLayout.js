import React from 'react';
import Box from '@mui/material/Box';

import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';


const DashboardLayout = ({ children }) => {

    return (
        <Box sx={{ 
            display: 'flex', 
            bgcolor: "rgba(218, 223, 230,1)", 
            color: "black", 
            minHeight: "100vh" 
        }}>
            < Navbar />
            < Sidebar />
            <Box sx={{mt:6}}>
                {children}
            </Box>
        </Box>
    )
}

export default DashboardLayout;