import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    FormControl,
    Typography,
    Divider,
    Select,
    MenuItem,
    InputLabel} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Components
import ColumnDescriptionPopover from './ColumnDescriptionPopover';
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";
import OneHotEncoding from './OneHotEncoding';
import OrdinalEncoding from './OrdinalEncoding';
import TargetEncoding from './TargetEncoding';
import FrequencyEncoding from './FrequencyEncoding';
import BinaryEncoding from './BinaryEncoding';


// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";

// Icons

//actions
import { resetRequestStatus } from "/store/featureEncodingSlice";


// Constants
import {
    FEATURE_ENCODING, 
    REQUEST_STATUS_FAILED, 
    REQUEST_STATUS_SUCCEEDED,

} from "/constants/Constants";

const TabPanel = ({ children, value, index, ...other }) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            height="100%"
        >
            {value === index && (
                <Box sx={{ pt: 1, height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const FeatureEncodingMainSection = () => {

    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);
    const featureEncodingState = useSelector((state) => state.featureEncoding);
    
    const dispatch = useDispatch();
    const [strategy, setStrategy] = useState("one-hot");


    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== FEATURE_ENCODING) {
            dispatch(setOpenMenuItem(FEATURE_ENCODING));
        }
    }, []);

    useEffect(() => {
        if (featureEncodingState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
            toast.success(featureEncodingState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
            dispatch(resetRequestStatus());

        } else if (featureEncodingState.requestStatus === REQUEST_STATUS_FAILED) {
            toast.error(featureEncodingState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });
            dispatch(resetRequestStatus());
        }
    }, [featureEncodingState.message])

    return (
        <Paper elevation={0}>
            <Box sx={{ minHeight: "89vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", p: 2, pt: 1 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Feature Encoding</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>


                {/* Select Column to Discretize, Strategy of Discretization, Column Description Icon */}
                < Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1, mb: 2, }}>
                    {/* Select Strategy Dropdown */}
                    <Box sx={{ width: "20%", mr: 2 }}>
                        <FormControl fullWidth size="small">
                            < InputLabel id="demo-simple-select-label-startegy">Strategy</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-strategy"
                                id="demo-simple-select"
                                value={strategy}
                                label="Strategy"
                                onChange={(e) => setStrategy(e.target.value)}
                            >
                                <MenuItem value={"one-hot"}>One-Hot Encoding</MenuItem>
                                <MenuItem value={"ordinal"}>Oridinal Encoding</MenuItem>
                                <MenuItem value={"target"}>Target Encoding</MenuItem>
                                <MenuItem value={"frequency"}>Frequency Encoding</MenuItem>
                                <MenuItem value={"binary"}>Binary Encoding</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Column Description Icon */}
                    <Box>
                        < ColumnDescriptionPopover />
                    </Box>

                </Box>


                {/* Discretization Inputs  */}
                <Box>
                    <TabPanel value={strategy} index={"one-hot"}>
                        <OneHotEncoding />
                    </TabPanel>
                    <TabPanel value={strategy} index={"ordinal"}>
                        <OrdinalEncoding />
                    </TabPanel>
                    <TabPanel value={strategy} index={"target"}>
                        <TargetEncoding />
                    </TabPanel>
                    < TabPanel value={strategy} index={"frequency"}>
                        <FrequencyEncoding />
                    </TabPanel>
                    < TabPanel value={strategy} index={"binary"}>
                        <BinaryEncoding />
                    </TabPanel>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Result Component  */}
                <Box >
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'start', color: "black" }}>
                        Result
                    </Typography>
                    <GlobalDataRepresentationContent
                        currPage={0}
                        column={''}
                        columnValue={[]}
                        numericalToValue={null}
                        numericalFromValue={null}
                        reload={false}
                        parameters={{
                            "categorical_values": {},
                            "numerical_values": {}
                        }}
                    />
                </Box>
                {/* )} */}
            </Box>
        </Paper >
    )
}

export default FeatureEncodingMainSection;