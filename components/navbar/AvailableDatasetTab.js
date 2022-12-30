import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ExportIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import RenameIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';

import { getAllDatasets, updateSelectedDataset, exportDataset } from "/store/datasetSlice";
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_LOADING } from '../../constants/Constants';

const AvailableDatasetTab = ({ handleModalClose }) => {

    // Local state for choosing dataset from available datasets
    const [selectedDataset, setSelectedDataset] = useState(null);

    // Identifier for element which create any action or API Request
    const [requestCreatorId, setRequestCreatorId] = useState(null);

    const datasetState = useSelector((state) => state.dataset);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setSelectedDataset(event.target.value);
    };

    const changeSelectedDataset = () => {
        dispatch(updateSelectedDataset(selectedDataset));
        handleModalClose();
    }

    const handleExportDataset = async (dataset_name) => {

        console.log("Hello1");
        setRequestCreatorId({type:"export",name:dataset_name});
        const res = await dispatch(exportDataset({ dataset_name: dataset_name}));

        if (datasetState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
            // Download Dataset at User End
            const url = window.URL.createObjectURL(new Blob([res.payload], { type: "text/csv" }));
            const a = document.createElement('a');
            a.download = "data.csv";
            a.href = url;
            a.click();
            a.remove();

        }
        else if (datasetState.requestStatus === REQUEST_STATUS_FAILED) {

            toast.error(datasetState.errorMessage === undefined ? "Error":"Failed", {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });

        } 
    }

    useEffect(() => {
        dispatch(getAllDatasets());
    }, [])

    useEffect(() => {
        setSelectedDataset(datasetState.selectedDataset);
    }, [datasetState.selectedDataset])

    console.log(datasetState);

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
                                    {dataset.name}
                                </TableCell>
                                <TableCell  align="right" >
                                    {dataset.size} KB
                                </TableCell>
                                <TableCell >
                                    {dataset.modified}
                                </TableCell>
                                <TableCell >
                                    <IconButton aria-label="rename" >

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
                                    <IconButton aria-label="delete" onClick={() => { handleExportDataset(dataset.name) }} >
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
                <Button onClick={changeSelectedDataset} variant="contained" >Submit</Button>
            </Box>
        </Box>
    );
}

export default AvailableDatasetTab;
