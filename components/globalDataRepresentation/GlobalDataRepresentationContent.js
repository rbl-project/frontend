import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Chip,
    FormControl,
    TextField,
    Autocomplete,
    Stack,
    Paper
} from '@mui/material';

import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// API Endpoints
import * as API from "/api";

// actions
import { globalDataRepresentation } from '/store/datasetUpdateSlice';

// Icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

// constants
import { REQUEST_STATUS_LOADING } from '../../constants/Constants';

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const GlobalDataRepresentationContent = (props) => {

    const getMuiTheme = () => createTheme({
        components: {
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        padding: "4px 10px",
                    }
                }
            }
        }
    })

    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    const [currPage, setCurrPage] = useState(props.currPage);

    // Parameters
    const [column, setColumn] = useState(props.column);

    const [columnValue, setColumnValue] = useState(props.columnValue);

    const [numericalToValue, setNumericalToValue] = useState(props.numericalToValue);
    const [numericalFromValue, setNumericalFromValue] = useState(props.numericalFromValue);

    const [parameters, setParameters] = useState(props.parameters);

    const fetchNewDatasetView = async () => {
        setCurrPage(0);
        await dispatch(globalDataRepresentation({
            ...parameters,
            dataset_name: selectedDataset,
        }));
    }

    const handleParameterSubmit = async () => {
        let parameters_temp = parameters;

        if (datasetUpdateState.currentDatasetView?.categorical_columns.includes(column)) {
            parameters_temp['categorical_values'][column] = columnValue;

        } else if (datasetUpdateState.currentDatasetView?.numerical_columns.includes(column)) {
            parameters_temp['numerical_values'][column] = [numericalFromValue, numericalToValue];

        }
        setParameters(parameters_temp);

        await fetchNewDatasetView();

        setColumn('');
        setColumnValue([]);
        setNumericalToValue(null);
        setNumericalFromValue(null);
    }

    useEffect(() => {
        dispatch(globalDataRepresentation({
            dataset_name: selectedDataset
        }))
    }, [props.reload])

    // Fetch Dataset When Dataset is Updated
    useEffect(() => {
        if (datasetUpdateState.datasetModifyStatus === true) {
            dispatch(globalDataRepresentation({
                dataset_name: selectedDataset
            }))
        }
    }, [])

    // Fetch Dataset When DatasetUpdate.modifystatus is Updated
    useEffect(() => {
        dispatch(globalDataRepresentation({
            dataset_name: selectedDataset
        }))
    }, [datasetUpdateState.datasetModifyStatus])

    // Async Autocomplete
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let data = {
            "dataset_name": selectedDataset,
            "column_name": column,
            "search_value": inputValue
        }

        API.searchCategoricalValues(data).then((res) => {
            let newOptions = res.data['data']['search_result']
            setOptions(newOptions)
        }).catch((err) => {
            // console.log(err);
        })

    }, [inputValue, columnValue,])

    // Pagination
    const changePage = (page) => {
        setCurrPage(page);
        dispatch(globalDataRepresentation({
            ...parameters,
            dataset_name: selectedDataset,
            page: page,
        }))
    }

    const mui_datatable_options = {
        jumpToPage: true,
        filter: false,
        filterType: 'dropdown',
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        // responsive: 'vertical',
        print: false,
        search: false,

        serverSide: true,
        rowsPerPageOptions: [10],
        elevation: 0,
        tableBodyHeight: '58vh',
        fixedHeader: true,
        expandableRowsHeader: true,
        textLabels: {
            body: {
                noMatch: 'No data to show',
            }
        },
        count: datasetUpdateState.currentDatasetView?.n_rows,
        page: currPage,
        onTableChange: (action, tableState) => {

            switch (action) {
                case 'changePage':
                    changePage(tableState.page);
                    break;
                default:
                    break;
            }
        },
    };

    return (
        <>
            { 
                datasetUpdateState.fetchDatasetStatus === REQUEST_STATUS_LOADING || false
                    ? (<Box sx={{ width: "100%", height: "82vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress size="3rem" color='inherit' />
                    </Box>)
                    : (
                        <>
                            <Box sx={{ width: "100%", mt: 1, display: "flex", alignItems: "center", justifyContent: "start" }}>

                                < Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }} color="gray" >Filter Result: </Typography>
                                {/* Select Column Dropdown  */}
                                <Box sx={
                                    ((parseFloat(numericalToValue) < parseFloat(numericalFromValue)) && datasetUpdateState.currentDatasetView?.numerical_columns.includes(column))
                                        ? { width: "20vw", mr: 2, mt: "-23px" }
                                        : { width: "20vw", mr: 2 }
                                }>

                                    <FormControl fullWidth size="small">
                                        <Autocomplete
                                            disableClearable
                                            disableCloseOnSelect
                                            fullWidth={true}
                                            filterSelectedOptions={true}
                                            id="combo-box-demo"
                                            options={Object.keys(datasetUpdateState.currentDatasetView).length > 0 ? datasetUpdateState.currentDatasetView?.column_list : []}
                                            size="small"
                                            value={column}
                                            onChange={(e, value, reason) => {
                                                setColumn(value)
                                            }}
                                            renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
                                        />
                                    </FormControl>
                                </Box>

                                {/* Select Value Dropdown  */}
                                {
                                    (column.length > 0 && datasetUpdateState.currentDatasetView.categorical_columns.includes(column)) ?
                                        (
                                            <Box sx={{ width: "20vw" }}>
                                                <FormControl fullWidth size="small">
                                                    <Autocomplete
                                                        multiple
                                                        disableClearable
                                                        fullWidth={true}
                                                        filterSelectedOptions={true}
                                                        id="combo-box-demo"
                                                        filterOptions={(x) => x}
                                                        options={options}
                                                        size="small"
                                                        value={columnValue}
                                                        // onChange={(e, value, reason) => setDropValue(value)}
                                                        onChange={(event, newValue) => {
                                                            setOptions(newValue ? [newValue, ...options] : options);
                                                            setColumnValue(newValue)
                                                        }}
                                                        onInputChange={(event, newInputValue) => {
                                                            setInputValue(newInputValue);
                                                        }}
                                                        renderInput={(params) => <TextField sx={{}} {...params} label="Value" />}
                                                    />
                                                </FormControl>
                                            </Box>
                                        )
                                        : (column.length > 0 && datasetUpdateState.currentDatasetView.numerical_columns.includes(column)) ?
                                            (
                                                <Box>
                                                    <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                                                        <TextField
                                                            disabled={column.length != 0 ? false : true}
                                                            placeholder='From'
                                                            type="number"
                                                            size='small'
                                                            onChange={(e) => setNumericalFromValue(parseFloat(e.target.value))}
                                                            value={numericalFromValue} sx={{ mr: 2 }}
                                                        />
                                                        <TextField
                                                            disabled={column.length != 0 ? false : true}
                                                            placeholder='To'
                                                            type="number"
                                                            size='small'
                                                            onChange={(e) => setNumericalToValue(parseFloat(e.target.value))}
                                                            value={numericalToValue}
                                                            error={parseFloat(numericalToValue) < parseFloat(numericalFromValue)}
                                                            helperText={((parseFloat(numericalToValue) < parseFloat(numericalFromValue)) ? "To value must be greater than From" : "")}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            ) : null
                                }
                                <Box sx={
                                    ((parseFloat(numericalToValue) < parseFloat(numericalFromValue)) && datasetUpdateState.currentDatasetView?.numerical_columns.includes(column))
                                        ? { ml: "1rem", mt: "-23px" }
                                        : { ml: "1rem" }
                                }>
                                    <Button
                                        variant='outlined'
                                        disabled={(column.length != 0 && columnValue.length != 0) || (column.length != 0 && numericalFromValue != null && numericalToValue != null) ? false : true}
                                        onClick={handleParameterSubmit} >
                                        <FileDownloadDoneIcon />
                                    </Button>
                                </Box>

                            </Box>

                            <Box sx={{ mt: 2 }}>
                                {
                                    Object.keys(parameters['numerical_values']).map((col) => (
                                        <Stack
                                            key={col}
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ padding: "1px", mt: 1 }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start' }}>
                                                {col} :
                                            </Typography>
                                            <Item>
                                                {
                                                    parameters['numerical_values'][col][0] == parameters['numerical_values'][col][1]
                                                        ? (<Chip label={`${parameters['numerical_values'][col][0]}`} onDelete={
                                                            async () => {
                                                                let temp = { ...parameters };
                                                                delete temp['numerical_values'][col];
                                                                setParameters(temp);
                                                                await fetchNewDatasetView();
                                                            }
                                                        } />)
                                                        : (<Chip label={`${parameters['numerical_values'][col][0]} - ${parameters['numerical_values'][col][1]}`} onDelete={
                                                            async () => {
                                                                let temp = { ...parameters };
                                                                delete temp['numerical_values'][col];
                                                                setParameters(temp);
                                                                await fetchNewDatasetView();
                                                            }
                                                        } />)
                                                }
                                            </Item>
                                        </Stack>
                                    ))
                                }

                                {
                                    Object.keys(parameters['categorical_values']).map((col) => (
                                        <Stack
                                            key={col}
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ padding: "1px", mt: 1 }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start' }}>
                                                {col} :
                                            </Typography>
                                            {
                                                parameters['categorical_values'][col].map((val) => {
                                                    return (
                                                        <Item key={val}>
                                                            <Chip
                                                                label={val}
                                                                onDelete={async () => {
                                                                    let temp = { ...parameters };
                                                                    temp['categorical_values'][col] = temp['categorical_values'][col].filter((item) => item !== val);
                                                                    setParameters(temp)

                                                                    if (parameters['categorical_values'][col].length == 0) {
                                                                        let temp_ = { ...parameters };
                                                                        delete temp_['categorical_values'][col];
                                                                        setParameters(temp_);
                                                                    }
                                                                    await fetchNewDatasetView();

                                                                }}
                                                            />
                                                        </Item>
                                                    )
                                                })
                                            }
                                        </Stack>

                                    ))
                                }

                            </Box>

                            <Box >

                                <ThemeProvider theme={getMuiTheme()}>
                                    <MUIDataTable
                                        data={datasetUpdateState.currentDatasetView?.result?.data}
                                        columns={datasetUpdateState.currentDatasetView?.result?.columns}
                                        options={mui_datatable_options}
                                    />
                                </ThemeProvider>

                            </Box>
                        </>
                    )
            }
        </>
    );
}

export default GlobalDataRepresentationContent;
