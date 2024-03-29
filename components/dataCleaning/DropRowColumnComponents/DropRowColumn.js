import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Tabs,
    Tab
} from '@mui/material';


// icons

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

const DropRowsAndColumnSection = ({
    setApiTaskType,
    dropByCategoricalQuery, setDropByCategoricalQuery,
    dropByNumericalQuery, setDropByNumericalQuery,
    dropByColNameQuery, setDropByColNameQuery,
    dropByRowIndexQuery, setDropByRowIndexQuery
}) => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);

    // local state
    const [value, setValue] = useState(0);

    useEffect(() => {
        setDropByRowIndexQuery({ "row_start": 0, "row_end": 0 });
    }, [])

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
                        setApiTaskType={setApiTaskType}
                        dropByCategoricalQuery={dropByCategoricalQuery}
                        setDropByCategoricalQuery={setDropByCategoricalQuery}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DropByNumericColValueSection
                        setApiTaskType={setApiTaskType}
                        dropByNumericalQuery={dropByNumericalQuery}
                        setDropByNumericalQuery={setDropByNumericalQuery}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DropByColNameSection
                        setApiTaskType={setApiTaskType}
                        dropByColNameQuery={dropByColNameQuery}
                        setDropByColNameQuery={setDropByColNameQuery}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DropByRowIndexSection
                        setApiTaskType={setApiTaskType}
                        dropByRowIndexQuery={dropByRowIndexQuery}
                        setDropByRowIndexQuery={setDropByRowIndexQuery}
                    />
                </TabPanel>
            </Box>
        </>
    )
}

export default DropRowsAndColumnSection;