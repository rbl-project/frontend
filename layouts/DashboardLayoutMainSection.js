import React, { useEffect } from 'react';
import Image from 'next/image';
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

// Icons
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

// Redux Actions
import { setOpenModal, setModalTabIndex } from '/store/globalStateSlice';

// Constants
import { REQUEST_STATUS_LOADING, DATASET_OVERVIEW_PATH } from '/constants/Constants';


const DashboardLayoutMainSection = ({ component }) => {

    const router = useRouter();

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetRequestStatus = useSelector((state) => state.dataset.requestStatus);
    const isNoDataset = selectedDataset === null || selectedDataset === undefined || selectedDataset === "";

    // useEffect(() => {
    //     if (isNoDataset && router.pathname !== DATASET_OVERVIEW_PATH) {
    //         router.push(DATASET_OVERVIEW_PATH);
    //     }
    // }, [isNoDataset])

    const clickHandler = () => {
        dispatch(setModalTabIndex(1));
        dispatch(setOpenModal());
    } 

    return (
        <Box sx={{ mb: 2, mt: 8, width: "100%", px: 2, overflow: "hidden" }}>
            {
                // If dataset is loading, show the loading component
                datasetRequestStatus === REQUEST_STATUS_LOADING && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", bgcolor: "rgba(255, 255, 255,1)" }} >
                        <CircularProgress size="3rem" color='inherit' />
                    </Box>
                ) 
            }
            
            {                    
                // If no dataset is selected, show the no dataset component
                isNoDataset ?
                    (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", bgcolor: "rgba(255, 255, 255,1)" }} >
                        <Box>
                            <Image src="/images/dataset_upload.jpg" alt="No Dataset" width={800} height={500} />
                            <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center" >No Dataset Available</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                                <Button variant="contained" size='small' onClick={clickHandler} color="error" sx={{ textTransform: "none", fontSize: "1rem", mr: 1 }} startIcon={<UploadIcon />}>Upload</Button>
                                <Typography variant="h6" align="center" color="#5a5a5a" >New Dataset to Get Started</Typography>
                            </Box>
                        </Box>
                    </Box>) :
                    // If dataset is selected, show the children component 
                    (component)
            }

        </Box>

    )
}

export default DashboardLayoutMainSection;