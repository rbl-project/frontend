import React from 'react';
import Image from 'next/image';
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";

// Icons
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

// Components
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

// Redux Actions
import { setOpenModal, setModalTabIndex } from '/store/globalStateSlice';


const DashboardLayout = ({ children }) => {

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const isNoDataset = selectedDataset === null || selectedDataset === undefined || selectedDataset === "";

    const clickHandler = () => {
        dispatch(setModalTabIndex(1));
        dispatch(setOpenModal());
    }

    return (
        <Box sx={{
            display: 'flex',
            bgcolor: "rgba(218, 223, 230,1)",
            color: "black",
            minHeight: "100vh",
            maxWidth: "100vw",
        }}>
            < Navbar />
            < Sidebar />
            <Box sx={{ mt: 8, mb: 2, width: "100%", px: 2, overflow: "hidden" }}>
                {
                    // If no dataset is selected, show the no dataset component
                    isNoDataset ?
                        (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", bgcolor: "rgba(255, 255, 255,1)" }} >
                            <Box>
                                <Image src="/images/dataset_upload.jpeg" alt="No Dataset" width={800} height={400} />
                                <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Dataset Available</Typography>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                                    <Button variant="contained" size='small' onClick={clickHandler} color="warning" sx={{ textTransform: "none", fontSize: "1rem", bgcolor: "gold", color: "black", "&:hover": { bgcolor: "goldenrod", color: "white" }, mr: 1 }} startIcon={<UploadIcon />}>Upload</Button>
                                    <Typography variant="h6" align="center" color="#5a5a5a" >New Dataset to Get Started</Typography>
                                </Box>
                            </Box>
                        </Box>) :
                        // If dataset is selected, show the children component
                        (children)
                }
            </Box>
            <ToastContainer position="bottom-right" autoClose={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} theme="dark" />
        </Box>
    )
}

export default DashboardLayout;