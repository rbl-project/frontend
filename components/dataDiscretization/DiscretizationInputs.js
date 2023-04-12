import React, { useState, } from 'react';
import { Box, FormControl, Tooltip, InputLabel, OutlinedInput, InputAdornment, CircularProgress, Button, TextField, Select } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';

// Redux Actions
import { dataDiscretization } from "/store/dataDiscretizationSlice";
import { getMetaData } from '/store/datasetUpdateSlice';

// Constants
import { REQUEST_STATUS_LOADING } from "/constants/Constants";


const DiscretizationInputs = ({ columnName, isColumnSelected, strategy, encodingType, setSearchColumn }) => {

    // Redux
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const dataDiscretizationState = useSelector((state) => state.dataDiscretization);

    const nRows = dataDiscretizationState.column_description !== null ? dataDiscretizationState.column_description.count : 0;

    // Local State for Validity of Input
    const [isValidInput, setIsValidInput] = useState(true);

    // Local State for Number of Bins
    const [numberOfBins, setNumberOfBins] = useState(2);
    // Local State for Number of Bins Error Message
    const [numberOfBinsErrorMessage, setNumberOfBinsErrorMessage] = useState("");

    // Local State for Prefix
    const [prefix, setPrefix] = useState("Bin_");

    // Chnage Handler for Number of Bins
    const handleNumberOfBinsChange = (e) => {
        // Check if the input is a number
        if (isNaN(e.target.value)) {
            setIsValidInput(false);
            setNumberOfBinsErrorMessage("Not a Valid Number");
            setNumberOfBins(0);
        }
        else if (e.target.value < 2) {
            setIsValidInput(false);
            setNumberOfBinsErrorMessage("Number of Bins should be greater than 1");
            setNumberOfBins(e.target.value);
        }
        else if (e.target.value > nRows) {
            setIsValidInput(false);
            setNumberOfBinsErrorMessage("Number of Bins should be less than or equal to number of Rows");
            setNumberOfBins(e.target.value);
        }
        else {
            setIsValidInput(true);
            setNumberOfBinsErrorMessage("");
            setNumberOfBins(e.target.value);
        }
    }

    // Handle Apply Changes Button Click
    const handleApplyChanges = async () => {
        if (dataDiscretizationState.data_discretization_req_status !== REQUEST_STATUS_LOADING) {
            await dispatch(dataDiscretization({ dataset_name: selectedDataset, column_name: columnName, strategy: strategy, encoding_type: encodingType, n_bins: numberOfBins, prefix: prefix }));
            setSearchColumn(null);
            dispatch(getMetaData({ dataset_name: selectedDataset }));
        }
    };



    return (
        <>

            <Box sx={{ display: "flex", mt: 2 }}>

                {/* Number of Bins */}
                <Box sx={{ width: "20%", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <TextField
                            id="outlined-number"
                            label="Number of Bins"
                            size='small'
                            type="text"
                            value={numberOfBins}
                            onChange={handleNumberOfBinsChange}
                            error={numberOfBinsErrorMessage !== ""}
                            helperText={numberOfBinsErrorMessage}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Box>

                {/* Prefix Input */}
                {
                    encodingType === "onehot" && (
                        <Box sx={{ width: "20%", mr: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel htmlFor="outlined-adornment-prefix">Prefix</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-prefix"
                                    type="text"
                                    sx={{ pr: 1 }}
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Tooltip arrow title="This will be used as Prefix in Name of the Bin" placement="top">
                                                < InfoIcon sx={{ cursor: "pointer" }} />
                                            </Tooltip>
                                        </InputAdornment>
                                    }
                                    label="Prefix"
                                />
                            </FormControl>
                        </Box>
                    )
                }


            </Box>

            {/* Apply Changes Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button disabled={!(isValidInput && isColumnSelected)} onClick={handleApplyChanges} variant="contained" color="primary" sx={{ mr: 1, width: "12rem" }} startIcon={dataDiscretizationState.data_discretization_req_status !== REQUEST_STATUS_LOADING && (<DoneIcon />)}>
                    {
                        dataDiscretizationState.data_discretization_req_status === REQUEST_STATUS_LOADING ?
                            <CircularProgress size={20} color="inherit" />
                            : "Apply Changes"
                    }
                </Button>
            </Box>
        </>
    )
}

export default DiscretizationInputs;