import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ExportIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import RenameIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmIcon from '@mui/icons-material/DoneOutlined';
import { toast } from 'react-toastify';

import { getAllDatasets, updateSelectedDataset, exportDataset, deleteDataset, renameDataset, resetRequestStatus } from "/store/datasetSlice";
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING, CUSTOM_ERROR_MESSAGE, CUSTOM_SUCCESS_MESSAGE, SMALLEST_VALID_STRING_LENGTH, LARGEST_VALID_STRING_LENGTH } from '../../constants/Constants';

const AvailableDatasetTab = ({ handleModalClose }) => {

    // Dataset State from Redux Store
    const datasetState = useSelector((state) => state.dataset);
    const dispatch = useDispatch();

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
    const isDuplicate = (dataset_name,new_dataset_name) => {
        let flag = false;
        datasetState.availableDatasets.map((dataset) => {
            if(dataset.name.toLowerCase() !== dataset_name.toLowerCase() && dataset.name.toLowerCase() === new_dataset_name.toLowerCase()) {   
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

    const validateString = (dataset_name,new_dataset_name) => {
        
        // Check for Duplicate Name
        if(isDuplicate(dataset_name,new_dataset_name)){
            setIsValidName(false);
            setValidationErrorMessage("Duplicate Name not Allowed");
        }

         //Check if Length is not Too Small 
         else if(isLengthTooSmall(new_dataset_name)){
            setIsValidName(false);
            setValidationErrorMessage("Atleast 2 Characters are Required");
        }

        //Check if it is Alphanemric
        else if(!isAlphaNumeric(new_dataset_name)){
            setIsValidName(false);
            setValidationErrorMessage("Only Alphabets(a-z & A-Z), Digits(0-9) and Some Special Characters(_, ,-) are allowed.");
        }

        //Check if Length is not Too Small 
        else if(isLengthTooLarge(new_dataset_name)){
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
    }

    const handleDeleteDataset = async(dataset_name) => {
        setRequestCreatorId({ type: "delete", name: dataset_name });
        await dispatch(deleteDataset({dataset_name:dataset_name}));
        dispatch(getAllDatasets());
    }

    const handleRenameDataset = (dataset_name) => {
        setRequestCreatorId({ type: "rename", name: dataset_name });
        setNewDatasetName(dataset_name);
        setIsRenameActive(true);
    }

    const handleConfirmRenameDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "confirm-rename", name: dataset_name });
        await dispatch(renameDataset({dataset_name:dataset_name,new_dataset_name:newDatasetName}))
        setIsRenameActive(false);
        dispatch(getAllDatasets());
    }

    const handleRenameInputChange = (event) => {
        setNewDatasetName(event.target.value);
        validateString(requestCreatorId.name,event.target.value);
    }

    const handleExportDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "export", name: dataset_name });
        const res = await dispatch(exportDataset({ dataset_name: dataset_name }));

        // if (datasetState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
            // Download Dataset at User End
            const url = window.URL.createObjectURL(new Blob([res.payload], { type: "text/csv" }));
            const a = document.createElement('a');
            a.download = dataset_name + ".csv";
            a.href = url;
            a.click();
            a.remove();

        // }
    }

    useEffect(() => {
        dispatch(getAllDatasets());
    }, [])

    useEffect(() => {
        setSelectedDataset(datasetState.selectedDataset);
    }, [datasetState.selectedDataset])

    // Show Alert Messages
    useEffect(()=>{
        // console.log(datasetState,requestCreatorId);
        if(datasetState.requestStatus === REQUEST_STATUS_FAILED){
            toast.error(datasetState.message !== undefined && datasetState.message !== null ? datasetState.message : CUSTOM_ERROR_MESSAGE, {
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
        else if(datasetState.requestStatus === REQUEST_STATUS_SUCCEEDED){
            if( datasetState.message !== null){
                toast.success( datasetState.message !== undefined ? datasetState.message : CUSTOM_SUCCESS_MESSAGE, {
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
    },[datasetState.requestStatus])


    return (
        <Box sx={{ height: "100%" }}>
            <TableContainer sx={{ height: "40vh" }}>
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
                        {datasetState.availableDatasets.map((dataset) => (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={dataset.name === selectedDataset}
                                tabIndex={-1}
                                key={dataset.name}
                            >
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
                                <TableCell width="40%" >
                                    {
                                        isRenameActive && requestCreatorId?.type === "rename" && requestCreatorId?.name === dataset.name ?
                                            (<TextField
                                                hiddenLabel
                                                fullWidth
                                                id="rename-field"
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ style: { fontSize: "0.875rem" }}}
                                                value={newDatasetName}
                                                onChange={handleRenameInputChange}
                                                error={!isValidName}
                                                helperText={validationErrorMessage}
                                            />)
                                            : (dataset.name)
                                    }
                                </TableCell>
                                <TableCell align="right" >
                                    {dataset.size} KB
                                </TableCell>
                                <TableCell >
                                    {dataset.modified}
                                </TableCell>
                                <TableCell >
                                    {
                                        isRenameActive && requestCreatorId?.type === "rename" && requestCreatorId?.name === dataset.name ?
                                            (
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
                                    <IconButton aria-label="export" onClick={() => { handleExportDataset(dataset.name) }} >
                                        {
                                            datasetState.requestStatus === REQUEST_STATUS_LOADING && requestCreatorId?.type === "export" && requestCreatorId?.name === dataset.name
                                                ? (<CircularProgress size="1rem" color="inherit" />)
                                                : (
                                                    <Tooltip title="Export" placement="right-start">
                                                        <ExportIcon />
                                                    </Tooltip>
                                                )
                                        }
                                    </IconButton>
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
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}  >
                <Button onClick={handleSelectDataset} variant="contained" >Submit</Button>
            </Box>
        </Box>
    );
}

export default AvailableDatasetTab;
