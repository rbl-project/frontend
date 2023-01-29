import React from 'react';
import Box from '@mui/material/Box';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
            <Box sx={{ mt: 8,mb:2,width:"100%",px:2 }}>
                {children}
            </Box>
         
            <ToastContainer
                position="bottom-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                theme="dark" />
        </Box>
    )
}

export default DashboardLayout;