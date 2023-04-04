import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Box,} from '@mui/material';

// Components
import Navbar from '/components/navbar/Navbar';
import Sidebar from '/components/sidebar/Sidebar';
import DashboardLayoutMainSection from './DashboardLayoutMainSection';
import GlobalDataRepresentationMainSection from '/components/globalDataRepresentation/GlobalDataRepresentationMainSection';


const DashboardLayout = ({ children }) => {  

    return (
        <Box sx={{ display: 'flex', bgcolor: "rgba(218, 223, 230,1)", color: "black", minHeight: "100vh", maxWidth: "100vw", }}>
            < Navbar />
            < Sidebar />
            < DashboardLayoutMainSection component={children} />
            <GlobalDataRepresentationMainSection />
        </Box>
    )
}

export default DashboardLayout;