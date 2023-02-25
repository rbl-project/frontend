import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

// Components
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

import { useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const isNoDataset = selectedDataset === null || selectedDataset === undefined || selectedDataset === "";

    return (
        <Box sx={{
            display: 'flex',
            bgcolor: "rgba(218, 223, 230,1)",
            color: "black",
            minHeight: "100vh"
        }}>
            < Navbar />
            < Sidebar />
            <Box sx={{ mt: 8, mb: 2, width: "100%", px: 2 }}>
                {
                    isNoDataset ?
                        // (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", bgcolor: "rgba(218, 223, 230,1)" }} >
                        (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", bgcolor: "rgba(255, 255, 255,1)" }} >
                            <Box>
                                <Image src="/images/dataset_upload.jpeg" alt="No Dataset" width={800} height={400} />
                                <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Dataset Available</Typography>
                                <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",mt:1}}>
                                    <Button variant="contained" size='small' color="warning" sx={{ textTransform: "none", fontSize:"1rem", bgcolor: "gold", "&:hover": { bgcolor: "goldenrod" },mr:1 }} startIcon={<UploadIcon />}>Upload</Button>
                                    <Typography variant="h6" align="center" color="#5a5a5a" >New Dataset to Get Started</Typography>
                                </Box>
                            </Box>
                        </Box>) :
                        (children)
                }
            </Box>
            <ToastContainer position="bottom-right" autoClose={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} theme="dark" />
        </Box>
    )
}

export default DashboardLayout;