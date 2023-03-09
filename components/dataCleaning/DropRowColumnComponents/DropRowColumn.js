import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    Tabs,
    Tab,
    CircularProgress,
    Autocomplete,
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Link,
    Tooltip
} from '@mui/material';

import { styled } from '@mui/material/styles';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// components
import DropByCategoricalColValueSection from './DropByCategoricalColValueSection';
import DropByNumericColValueSection from './DropByNumericColValueSection';
import DropByColNameSection from './DropByColNameSection';
import DropByRowIndexSection from './DropByRowIndexSection';

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

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const ToolTipText = styled('p')(({ theme }) => ({
    color: "white",
    backgroundColor: "grey",
    borderRadius: "50%",
    padding: "0px 8px",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "0.5rem"
}))

const DropRowsAndColumnSection = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    // local state
    const [value, setValue] = useState(0);

    const [dropByCategoricalQuery, setDropByCategoricalQuery] = useState({});
    const [dropByNumericalQuery, setDropByNumericalQuery] = useState({});
    const [dropByColNameQuery, setDropByColNameQuery] = useState({ "col_list": [] });
    const [dropByRowIndexQuery, setDropByRowIndexQuery] = useState({ "row_start": 0, "row_end": 0 });

    useEffect(() => {
        setDropByCategoricalQuery({});
        setDropByNumericalQuery({});
        setDropByColNameQuery({ "col_list": [] });
        setDropByRowIndexQuery({ "row_start": 0, "row_end": 0 });
    }, [selectedDataset])

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {/* Tabs and Buttons */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                    <Tabs textColor='secondary' indicatorColor="secondary" value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                        <Tab label="By Column Values" sx={{ textTransform: 'none' }} />
                        <Tab label="By Numerical Range" sx={{ textTransform: 'none' }} />
                        <Tab label="By Column Name" sx={{ textTransform: 'none' }} />
                        <Tab label="By Row Index" sx={{ textTransform: 'none' }} />
                    </Tabs>
                </Box>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <DropByCategoricalColValueSection
                        dropByCategoricalQuery={dropByCategoricalQuery}
                        setDropByCategoricalQuery={setDropByCategoricalQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DropByNumericColValueSection
                        dropByNumericalQuery={dropByNumericalQuery}
                        setDropByNumericalQuery={setDropByNumericalQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DropByColNameSection
                        dropByColNameQuery={dropByColNameQuery}
                        setDropByColNameQuery={setDropByColNameQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DropByRowIndexSection
                        dropByRowIndexQuery={dropByRowIndexQuery}
                        setDropByRowIndexQuery={setDropByRowIndexQuery}
                        dataCleaningState={dataCleaningState}
                    />
                </TabPanel>
            </Box>
        </>
    )
}

export default DropRowsAndColumnSection;