import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";

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
    Divider
} from '@mui/material';

import { styled } from '@mui/material/styles';

// components
import DropRowsAndColumnSection from './DropRowColumnComponents/DropRowColumn';
import ChangeDataTypeSection from './ChangeDataTypes';
import FindAndReplaceSection from './FindAndReplace';
import RenameColumnSection from './RenameColumn';

// icons
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';

// actions
import { getColumnInfo, renameColumn } from "/store/dataCleaningSlice";
import { setOpenMenuItem } from "/store/globalStateSlice";

// constant
import { 
    DATA_CLEANING,
    DROP_BY_CATEGORICAL_VALUE_API_TASK_TYPE,
    DROP_BY_NUMERICAL_RANGE_API_TASK_TYPE,
    DROP_BY_COLUMN_NAME_API_TASK_TYPE,
    DROP_BY_ROW_INDEX_API_TASK_TYPE,
    RENAME_COLUMN_API_TASK_TYPE,
    CHANGE_DATA_TYPE_API_TASK_TYPE,
    FIND_AND_REPLACE_API_TASK_TYPE,
} from '../../constants/Constants';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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

const DataCleaningMainSection = () => {
    
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    const [apiTaskType, setApiTaskType] = useState("");

    const [renameColumnQuery, setRenameColumnQuery] = useState({})

    const [value, setValue] = useState(0);

    // Calling backend APIs
    useEffect(() => {
        if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
            dispatch(getColumnInfo({ dataset_name: selectedDataset }));
        }
    }, [selectedDataset])

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== DATA_CLEANING) {
            dispatch(setOpenMenuItem(DATA_CLEANING));
        }
    }, []);

    const applyChanges = () => {
        console.log(apiTaskType);
        if(apiTaskType === DROP_BY_CATEGORICAL_VALUE_API_TASK_TYPE) {
            console.log("drop by categorical value");
        } else if(apiTaskType === DROP_BY_NUMERICAL_RANGE_API_TASK_TYPE) {
            console.log("drop by numerical range");
        } else if(apiTaskType === DROP_BY_COLUMN_NAME_API_TASK_TYPE) {
            console.log("drop by column name");
        } else if(apiTaskType === DROP_BY_ROW_INDEX_API_TASK_TYPE) { 
            console.log("drop by row index");
        } else if(apiTaskType === CHANGE_DATA_TYPE_API_TASK_TYPE) {
            console.log("change data type");
        }
        else if(apiTaskType === RENAME_COLUMN_API_TASK_TYPE) {
            dispatch(renameColumn({ 
                dataset_name: selectedDataset, 
                col_name_change_info: renameColumnQuery 
            }))
        } else if (apiTaskType === FIND_AND_REPLACE_API_TASK_TYPE) {
            console.log("find and replace");
        } else {
            console.log("No API Task Type");
        }
    }

    const saveChanges = () => {
        
    }

    // temp
    const columns = ["Name", "Company", "City", "State"];

    const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["James Houston", "Test Corp", "Dallas", "TX"]
    ];

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        rowsPerPage: 10,
        elevation: 0,
        fixedHeader: true,
        textLabels: {
            body: {
                noMatch: 'No data to show',
            }
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item sx={{}}>
                        <Box sx={{ width: '100%' }}>
                            {/* Tabs and Buttons */}
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                                    <Tab label="Drop Rows & Columns" />
                                    <Tab label="Changing Data Types" />
                                    <Tab label="Find and Replace" />
                                    <Tab label="Rename Columns" />
                                </Tabs>
                                <Box>
                                    {/* Will be diabled if no changes are applied */}
                                    <Button variant='contained' color='success' sx={{ float: 'right' }}>Save Changes</Button>
                                </Box>
                            </Box>

                            {/* Tab Panels */}
                            <TabPanel value={value} index={0}>
                                <DropRowsAndColumnSection />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ChangeDataTypeSection />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <FindAndReplaceSection setApiTaskType={setApiTaskType} />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <RenameColumnSection setApiTaskType={setApiTaskType} renameColumnQuery={renameColumnQuery} setRenameColumnQuery={setRenameColumnQuery} />
                            </TabPanel>

                            {/* Fotter Buttons */}
                            <Box sx={{ width: '100%', textAlign: 'end' }}>
                                <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={applyChanges}>
                                    <DoneIcon /> 
                                </Button>
                                <Button variant="contained" color='warning' sx={{ m: 1 }} onClick={saveChanges}>
                                    <ReplayIcon />
                                </Button>
                            </Box>
                        </Box>

                         <Divider sx={{mt: 2}}/>

                        <MUIDataTable
                            data={data}
                            columns={columns}
                            options={options}
                            />
                    </Item>
                </Grid>
                {/* <Grid item xs={12} >
                    <Item>
                        <Typography variant="h6" component="div" gutterBottom>Result</Typography>
                    </Item>
                </Grid> */}
            </Grid>
        </Box>
    )
}

export default DataCleaningMainSection;