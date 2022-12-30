import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import { Box, Button } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import { getAllDatasets } from "/store/datasetSlice";

const AvailableDatasetTab = ({ handleModalClose }) => {

    // Local state for choosing dataset from available datasets
    const [selectedDataset, setSelectedDataset] = useState();

    const datasetState = useSelector((state) => state.dataset);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setSelectedDataset(event.target.value);
    };

    useEffect(() => {
        console.log(datasetState);
        dispatch(getAllDatasets());
    }, [])



    return (
        <Box sx={{ height: "100%" }}>
            <TableContainer>
                <Table sx={{ width: "100%" }} size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell > Name </TableCell>
                            <TableCell > Size </TableCell>
                            <TableCell > Actions </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasetState.availableDatasets.map((dataset) => (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={dataset.name === selectedDataset}
                                tabIndex={-1}
                            >
                                <TableCell padding="checkbox"  onClick={handleClick}>
                                    <Checkbox
                                        color="primary"
                                        checked={dataset.name === selectedDataset}
                                        inputProps={{
                                            'aria-labelledby': dataset.name,
                                        }}
                                        value={dataset.name}
                                    />
                                </TableCell>
                                <TableCell padding="none" >
                                    {dataset.name}
                                </TableCell>
                                <TableCell padding="none" >
                                    {dataset.size} KB
                                </TableCell>
                                <TableCell padding="none">
                                    Actions
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AvailableDatasetTab;
