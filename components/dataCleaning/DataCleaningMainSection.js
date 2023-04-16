import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// material-ui
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
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
import ChangeColumnType from './ChangeColumnType';
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";

// icons
import DoneIcon from '@mui/icons-material/Done';

// actions
import {
    getColumnInfo,
    renameColumn,
    findAndReplace,
    changeDataType,
    dropByColValue,
    dropByNumericalValue,
    dropByColName,
    dropByRowIndex,
    changeColumnType,
    resetRequestStatus
} from "/store/dataCleaningSlice";
import { getMetaData } from "/store/datasetUpdateSlice";
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
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_LOADING,
    CHANGE_COLUMN_TYPE_API_TASK_TYPE

} from '/constants/Constants';

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
    const dataCleaningState = useSelector((state) => state.dataCleaning);


    const [apiTaskType, setApiTaskType] = useState("");

    const [dropByCategoricalQuery, setDropByCategoricalQuery] = useState({});
    const [dropByNumericalQuery, setDropByNumericalQuery] = useState({});
    const [dropByColNameQuery, setDropByColNameQuery] = useState({});
    const [changeDataTypeQuery, setChangeDataTypeQuery] = useState({});
    const [renameColumnQuery, setRenameColumnQuery] = useState({});
    const [findReplaceQuery, setFindReplaceQuery] = useState({});
    const [dropByRowIndexQuery, setDropByRowIndexQuery] = useState({});
    const [changeColumnTypeQuery, setChangeColumnTypeQuery] = useState({})

    const [value, setValue] = useState(0);

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== DATA_CLEANING) {
            dispatch(setOpenMenuItem(DATA_CLEANING));
        }
    }, []);


    // toaster for dataCleaning state
    useEffect(() => {
        if (dataCleaningState.requestStatus === REQUEST_STATUS_SUCCEEDED) {
            toast.success(dataCleaningState.message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
            });

            setRenameColumnQuery({});
            setFindReplaceQuery({});
            setChangeDataTypeQuery({});
            setDropByCategoricalQuery({});
            setDropByNumericalQuery({});
            setDropByColNameQuery({});
            setDropByRowIndexQuery({ "row_start": 0, "row_end": 0 });
            setChangeColumnTypeQuery({});

            dispatch(resetRequestStatus());

            if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
                dispatch(getColumnInfo({ dataset_name: selectedDataset }));
            }

        } else if (dataCleaningState.requestStatus === REQUEST_STATUS_FAILED) {
            toast.error(dataCleaningState.message, {
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
    }, [dataCleaningState.message])


    const applyDataChanges = () => {

        if (apiTaskType === DROP_BY_CATEGORICAL_VALUE_API_TASK_TYPE) {
            dispatch(dropByColValue({
                dataset_name: selectedDataset,
                col_value_info: dropByCategoricalQuery
            }))

        } else if (apiTaskType === DROP_BY_NUMERICAL_RANGE_API_TASK_TYPE) {
            dispatch(dropByNumericalValue({
                dataset_name: selectedDataset,
                col_value_info: dropByNumericalQuery
            }))

        } else if (apiTaskType === DROP_BY_COLUMN_NAME_API_TASK_TYPE) {
            dispatch(dropByColName({
                dataset_name: selectedDataset,
                col_list_info: dropByColNameQuery
            }))

        } else if (apiTaskType === DROP_BY_ROW_INDEX_API_TASK_TYPE) {
            dispatch(dropByRowIndex({
                dataset_name: selectedDataset,
                row_drop_info: dropByRowIndexQuery
            }))

        } else if (apiTaskType === CHANGE_DATA_TYPE_API_TASK_TYPE) {
            dispatch(changeDataType({
                dataset_name: selectedDataset,
                col_data_type_change_info: changeDataTypeQuery
            }))

        }
        else if (apiTaskType === RENAME_COLUMN_API_TASK_TYPE) {
            dispatch(renameColumn({
                dataset_name: selectedDataset,
                col_name_change_info: renameColumnQuery
            }))

        } else if (apiTaskType === FIND_AND_REPLACE_API_TASK_TYPE) {
            dispatch(findAndReplace({
                dataset_name: selectedDataset,
                find_relace_info: findReplaceQuery
            }))
        } else if (apiTaskType === CHANGE_COLUMN_TYPE_API_TASK_TYPE) {
            dispatch(changeColumnType({
                dataset_name: selectedDataset,
                col_type_change_info: changeColumnTypeQuery
            }))

        } else {
            // console.log("No API Task Type");
        }

        dispatch(getMetaData({ dataset_name: selectedDataset }));
    }


    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Item sx={{}}>
                        <Box sx={{ width: '100%' }}>
                            {/* Tabs and Buttons */}
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                                    <Tab label="Drop Rows & Columns" />
                                    <Tab label="Change Data Types" />
                                    <Tab label="Find and Replace" />
                                    <Tab label="Rename Columns" />
                                    <Tab label="Change Column Type" />
                                </Tabs>
                            </Box>

                            {/* Tab Panels */}
                            <TabPanel value={value} index={0}>
                                <DropRowsAndColumnSection
                                    setApiTaskType={setApiTaskType}

                                    dropByCategoricalQuery={dropByCategoricalQuery}
                                    setDropByCategoricalQuery={setDropByCategoricalQuery}

                                    dropByNumericalQuery={dropByNumericalQuery}
                                    setDropByNumericalQuery={setDropByNumericalQuery}

                                    dropByColNameQuery={dropByColNameQuery}
                                    setDropByColNameQuery={setDropByColNameQuery}

                                    dropByRowIndexQuery={dropByRowIndexQuery}
                                    setDropByRowIndexQuery={setDropByRowIndexQuery}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ChangeDataTypeSection
                                    setApiTaskType={setApiTaskType}
                                    changeDataTypeQuery={changeDataTypeQuery}
                                    setChangeDataTypeQuery={setChangeDataTypeQuery}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <FindAndReplaceSection
                                    setApiTaskType={setApiTaskType}
                                    findReplaceQuery={findReplaceQuery}
                                    setFindReplaceQuery={setFindReplaceQuery}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <RenameColumnSection
                                    setApiTaskType={setApiTaskType}
                                    renameColumnQuery={renameColumnQuery}
                                    setRenameColumnQuery={setRenameColumnQuery}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <ChangeColumnType
                                    setApiTaskType={setApiTaskType}
                                    changeColumnTypeQuery={changeColumnTypeQuery}
                                    setChangeColumnTypeQuery={setChangeColumnTypeQuery}
                                />
                            </TabPanel>

                            {/* Fotter Buttons */}
                            <Box sx={{ width: '100%', textAlign: 'end' }}>
                                <Button variant="contained" size="small" color="primary" sx={{ m: 1 }} onClick={applyDataChanges} startIcon={dataCleaningState.requestStatus !== REQUEST_STATUS_LOADING && (<DoneIcon />)}>
                                    {
                                        dataCleaningState.requestStatus === REQUEST_STATUS_LOADING
                                            ? <CircularProgress size={24} sx={{ color: 'white' }} />
                                            : <>Apply Changes</>
                                    }
                                </Button>
                            </Box>
                        </Box>

                        <Divider sx={{ mt: 2 }} />

                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'start', mt: 2, color: "black" }}>
                            Result
                        </Typography>
                        <GlobalDataRepresentationContent
                            currPage={0}
                            column={''}
                            columnValue={[]}
                            reload={dataCleaningState.requestStatus === REQUEST_STATUS_FAILED || dataCleaningState.requestStatus === REQUEST_STATUS_SUCCEEDED}
                            numericalToValue={null}
                            numericalFromValue={null}
                            parameters={{
                                "categorical_values": {},
                                "numerical_values": {}
                            }}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DataCleaningMainSection;