import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Tooltip, CircularProgress, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { saveAs } from "file-saver";
import { useRouter } from 'next/router';

// Icons
import ExportIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import RenameIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmIcon from '@mui/icons-material/DoneOutlined';

// API Endpoints
import * as API from "/api";

// Actions from Redux State
import { getAllDatasets, updateSelectedDataset, deleteDataset, renameDataset, resetRequestStatus, setRequestStatus } from "/store/datasetSlice";
// Constants
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING, CUSTOM_ERROR_MESSAGE, CUSTOM_SUCCESS_MESSAGE, SMALLEST_VALID_STRING_LENGTH, LARGEST_VALID_STRING_LENGTH, REQUEST_STATUS_IDLE, DATASET_OVERVIEW_PATH } from '/constants/Constants';


const AvailableDatasetTab = ({ handleModalClose }) => {

    const router = useRouter();
    // Dataset State from Redux Store
    const datasetState = useSelector((state) => state.dataset);
    const dispatch = useDispatch();

    // temp state for export dataset
    const [exportDatasetLoader, setExportDatasetLoader] = useState(false);

    // Local state for choosing dataset from available datasets
    const [selectedDataset, setSelectedDataset] = useState(null);

    // Identifier for element which create any action or API Request
    const [requestCreatorId, setRequestCreatorId] = useState(null);

    //LocalState when Rename button is Clicked
    const [isRenameActive, setIsRenameActive] = useState(false);
    const [newDatasetName, setNewDatasetName] = useState(null);

    //LocalState for checking whether new dataset name is valid or not
    const [isValidName, setIsValidName] = useState(true);
    const [validationErrorMessage, setValidationErrorMessage] = useState(null);

    //Validation Functions
    const isDuplicate = (dataset_name, new_dataset_name) => {
        let flag = false;
        datasetState.availableDatasets.map((dataset) => {
            if (dataset.name.toLowerCase() !== dataset_name.toLowerCase() && dataset.name.toLowerCase() === new_dataset_name.toLowerCase()) {
                flag = true;
            }
        })
        return flag;
    }

    const isAlphaNumeric = (new_dataset_name) => {
        const reg = new RegExp(/^\w[ \w-]*[\w]$/g);
        return reg.test(new_dataset_name);
    }

    const isLengthTooSmall = (new_dataset_name) => {
        return new_dataset_name.length < SMALLEST_VALID_STRING_LENGTH;
    }

    const isLengthTooLarge = (new_dataset_name) => {
        return new_dataset_name.length > LARGEST_VALID_STRING_LENGTH;
    }

    const validateString = (dataset_name, new_dataset_name) => {

        // Check for Duplicate Name
        if (isDuplicate(dataset_name, new_dataset_name)) {
            setIsValidName(false);
            setValidationErrorMessage("Duplicate Name not Allowed");
        }

        //Check if Length is not Too Small 
        else if (isLengthTooSmall(new_dataset_name)) {
            setIsValidName(false);
            setValidationErrorMessage("Atleast 2 Characters are Required");
        }

        //Check if it is Alphanemric
        else if (!isAlphaNumeric(new_dataset_name)) {
            setIsValidName(false);
            setValidationErrorMessage("Only Alphabets(a-z & A-Z), Digits(0-9) and Some Special Characters(_, ,-) are allowed.");
        }

        //Check if Length is not Too Small 
        else if (isLengthTooLarge(new_dataset_name)) {
            setIsValidName(false);
            setValidationErrorMessage("Maximum 30 Characters are Allowed");
        }

        // Valid Dataset Name
        else {
            setIsValidName(true);
            setValidationErrorMessage(null);
        }

    }

    const handleClick = (event) => {
        setSelectedDataset(event.target.value);
    };

    const handleSelectDataset = () => {
        dispatch(updateSelectedDataset(selectedDataset));
        handleModalClose();
        router.push(DATASET_OVERVIEW_PATH);
    }

    const handleDeleteDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "delete", name: dataset_name });
        await dispatch(deleteDataset({ dataset_name: dataset_name }));
        dispatch(getAllDatasets());
    }

    const handleRenameDataset = (dataset_name) => {
        setRequestCreatorId({ type: "rename", name: dataset_name });
        setNewDatasetName(dataset_name);
        setIsRenameActive(true);
    }

    const handleConfirmRenameDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "confirm-rename", name: dataset_name });
        await dispatch(renameDataset({ dataset_name: dataset_name, new_dataset_name: newDatasetName }))
        setIsRenameActive(false);
        dispatch(getAllDatasets());
    }

    const handleRenameInputChange = (event) => {
        setNewDatasetName(event.target.value);
        validateString(requestCreatorId.name, event.target.value);
    }

    const handleExportDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "export", name: dataset_name });
        // setExportDatasetLoader(true);
        dispatch(setRequestStatus({ requestStatus: REQUEST_STATUS_LOADING }));
        API.exportDataset({ "dataset_name": dataset_name }).then((res) => {

            // ============================= Download File Traditional Method ========================= 
            // console.log(res);
            // const url = window.URL.createObjectURL(new Blob([res.data], { type: "text/csv" }));
            // const a = document.createElement('a');
            // a.download = dataset_name + ".csv";
            // a.href = url;
            // a.click();
            // a.remove();

            saveAs(new Blob([res.data], { type: "text/csv" }), dataset_name + ".csv");

            setExportDatasetLoader(false);
            dispatch(setRequestStatus({ requestStatus: REQUEST_STATUS_IDLE }));
            setRequestCreatorId(null);
        }).catch((err) => {
            toast.error(err, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            dispatch(setRequestStatus({ requestStatus: REQUEST_STATUS_IDLE }));
            setRequestCreatorId(null);
        })
        // ====================== Using Redux Toolkit ======================
        // const res = await dispatch(exportDataset({ dataset_name: dataset_name }));
        // console.log(datasetState.requestStatus);
        // if (datasetState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
        //     // Download Dataset at User End
        //     const url = window.URL.createObjectURL(new Blob([res.payload], { type: "text/csv" }));
        //     const a = document.createElement('a');
        //     a.download = dataset_name + ".csv";
        //     a.href = url;
        //     a.click();
        //     a.remove();

        // }
    }

    // useEffect(() => {
    //     dispatch(getAllDatasets());
    // }, [])

    useEffect(() => {
        setSelectedDataset(datasetState.selectedDataset);
    }, [datasetState.selectedDataset])

    // Show Alert Messages
    useEffect(() => {
        if (datasetState.requestStatus === REQUEST_STATUS_FAILED) {
            toast.error([undefined, null, ""].includes(datasetState.message) ? CUSTOM_ERROR_MESSAGE : datasetState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            dispatch(resetRequestStatus());
            setRequestCreatorId(null);
        }
        else if (datasetState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
            if (datasetState.message !== null) {
                toast.success(datasetState.message !== undefined ? datasetState.message : CUSTOM_SUCCESS_MESSAGE, {
                    position: "bottom-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            }
            dispatch(resetRequestStatus());
            setRequestCreatorId(null);
        }
    }, [datasetState.requestStatus])


    return (
        <Box sx={{ height: "100%" }}>
            <TableContainer sx={{ height: datasetState.availableDatasets.length > 0 ? "40vh" : "inherit" }}>
                <Table sx={{ width: "100%" }} size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell > Name </TableCell>
                            <TableCell align="right"> Size </TableCell>
                            <TableCell > Last Modified </TableCell>
                            <TableCell align="center"> Actions </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId === null ?

                            (
                                <TableRow>
                                    <TableCell colSpan={5} >
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", height: "30vh" }}>
                                            <CircularProgress size="1rem" color="inherit" />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) :
                            //  Available Datasets
                            datasetState.availableDatasets.map((dataset) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={dataset.name === selectedDataset}
                                    tabIndex={-1}
                                    key={dataset.name}
                                >
                                    {/* Dataset Name  */}
                                    <TableCell padding="checkbox" onClick={handleClick}>
                                        <Checkbox
                                            color="primary"
                                            checked={dataset.name === selectedDataset}
                                            inputProps={{
                                                'aria-labelledby': dataset.name,
                                            }}
                                            value={dataset.name}
                                        />
                                    </TableCell>

                                    {/* When user enables Rename Dataset option  */}
                                    <TableCell width="40%" >
                                        {
                                            isRenameActive && requestCreatorId?.type === "rename" && requestCreatorId?.name === dataset.name ?
                                                (<TextField
                                                    hiddenLabel
                                                    fullWidth
                                                    id="rename-field"
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{ style: { fontSize: "0.875rem" } }}
                                                    value={newDatasetName}
                                                    onChange={handleRenameInputChange}
                                                    error={!isValidName}
                                                    helperText={validationErrorMessage}
                                                />)
                                                : (dataset.name)
                                        }
                                    </TableCell>

                                    {/* Dataset Size  */}
                                    <TableCell align="right" >
                                        {dataset.size} KB
                                    </TableCell>

                                    {/* Last Modified  */}
                                    <TableCell >
                                        {dataset.modified}
                                    </TableCell>

                                    {/* Action Buttons  */}
                                    {/* Rename / Confirm Button */}
                                    <TableCell >
                                        {
                                            // If Rename is going on then show Confirm Button else show Rename Button
                                            isRenameActive && requestCreatorId?.type === "rename" && requestCreatorId?.name === dataset.name ?
                                                (
                                                    // Confirm Button
                                                    <IconButton disabled={!isValidName} aria-label="confirm" onClick={() => { handleConfirmRenameDataset(dataset.name) }} >
                                                        {
                                                            datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId?.type === "confirm-rename" && requestCreatorId?.name === dataset.name
                                                                ? (<CircularProgress size="1rem" color="inherit" />)
                                                                : (
                                                                    <Tooltip title="Confirm" placement="right-start">
                                                                        <ConfirmIcon />
                                                                    </Tooltip>
                                                                )
                                                        }
                                                    </IconButton>
                                                ) : (
                                                    // Rename Button
                                                    <IconButton aria-label="rename" onClick={() => { handleRenameDataset(dataset.name) }} >
                                                        {
                                                            datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId?.type === "rename" && requestCreatorId?.name === dataset.name
                                                                ? (<CircularProgress size="1rem" color="inherit" />)
                                                                : (
                                                                    <Tooltip title="Rename" placement="right-start">
                                                                        <RenameIcon />
                                                                    </Tooltip>
                                                                )
                                                        }
                                                    </IconButton>

                                                )
                                        }

                                        {/* Export Button  */}
                                        <IconButton aria-label="export" onClick={() => { handleExportDataset(dataset.name) }} >
                                            {
                                                (exportDatasetLoader && requestCreatorId?.name === dataset.name) || (datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId?.type === "export" && requestCreatorId?.name === dataset.name)
                                                    ? (<CircularProgress size="1rem" color="inherit" />)
                                                    : (
                                                        <Tooltip title="Export" placement="right-start">
                                                            <ExportIcon />
                                                        </Tooltip>
                                                    )
                                            }
                                        </IconButton>

                                        {/* Delete Button  */}
                                        <IconButton aria-label="delete" onClick={() => { handleDeleteDataset(dataset.name) }} >
                                            {
                                                datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId?.type === "delete" && requestCreatorId?.name === dataset.name
                                                    ? (<CircularProgress size="1rem" color="inherit" />)
                                                    : (
                                                        <Tooltip title="Delete" placement="right-start">
                                                            <DeleteIcon />
                                                        </Tooltip>
                                                    )
                                            }
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))}

                    </TableBody>
                </Table>
            </TableContainer >

            {/* When No Dataset is available */}
            {datasetState.availableDatasets.length === 0 && datasetState.requestStatus !== REQUEST_STATUS_LOADING && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", height: "40vh" }}>
                    <Typography variant="h6" >No Dataset Available</Typography>
                </Box>
            )}

            {/* Select Button */}
            {datasetState.availableDatasets.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}  >
                    <Button onClick={handleSelectDataset} variant="contained" disabled={datasetState.requestStatus === REQUEST_STATUS_LOADING} >Select</Button>
                </Box>
            )}

        </Box>
    );
}

export default AvailableDatasetTab;
