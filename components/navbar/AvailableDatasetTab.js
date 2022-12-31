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
import * as API from "/api";

import { getAllDatasets, updateSelectedDataset, exportDataset, deleteDataset, renameDataset, resetRequestStatus } from "/store/datasetSlice";
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING, CUSTOM_ERROR_MESSAGE, CUSTOM_SUCCESS_MESSAGE } from '../../constants/Constants';

const AvailableDatasetTab = ({ handleModalClose }) => {

    // Local state for choosing dataset from available datasets
    const [selectedDataset, setSelectedDataset] = useState(null);

    // Identifier for element which create any action or API Request
    const [requestCreatorId, setRequestCreatorId] = useState(null);

    //LocalState when Rename button is Clicked
    const [isRenameActive, setIsRenameActive] = useState(false);
    const [newDatasetName, setNewDatasetName] = useState(null);


    const datasetState = useSelector((state) => state.dataset);
    const dispatch = useDispatch();

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
    }

    const handleExportDataset = async (dataset_name) => {
        setRequestCreatorId({ type: "export", name: dataset_name });
        API.exportDataset(dataset_name).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data], { type: "text/csv" }));
            const a = document.createElement('a');
            a.download = dataset_name + ".csv";
            a.href = url;
            a.click();
            a.remove();
        }).catch((err) => {
            console.log(err);
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
            toast.error(datasetState.message !== undefined || datasetState.message !== null ? datasetState.message : CUSTOM_ERROR_MESSAGE, {
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
                                                inputProps={{ style: { fontSize: "0.875rem" }, pattern:"[ a-zA-Z0-9_-]*" }}
                                                value={newDatasetName}
                                                onChange={handleRenameInputChange}
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
                                                <IconButton aria-label="confirm" onClick={() => { handleConfirmRenameDataset(dataset.name) }} >
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
