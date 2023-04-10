import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Autocomplete,
    TextField,
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

// Components
import CategoricalColumnDropDown from './CategoricalColumnDropDown';
import ApplyChangesButton from './ApplyChangesButton';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

// API Endpoints
import * as API from "/api";

const OrdinalEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    const [ordinalEncodingQuery, setOrdinalEncodingQuery] = useState({});

    // Main Column
    const [column, setColumn] = useState("")

    // custom mapping
    const [customMapping, setCustomMapping] = useState(false);
    const [mapping, setMapping] = useState({}) // to set the mapping for the column
    const [columnValue, setColumnValue] = useState([]) // to store the value of the column
    const [customValue, setCustomValue] = useState("") // to store the custom value for this value
    const [mappingDailog, setMappingDailog] = useState(false)


    // to update the query when columnList or catName changes
    useEffect(() => {
        setOrdinalEncodingQuery({
            ...ordinalEncodingQuery,
            column_name: column,
            custom_mapping: customMapping,
            mapping: mapping
        })
        console.log("Ordinal Encoding Query: ", ordinalEncodingQuery);
    }, [column, customMapping, mapping])


    const handleCustomValueSubmit = () => {
        let newMapping = mapping;
        for(let i=0; i<columnValue.length; i++){
            newMapping[columnValue[i]] = customValue;
        }
        setMapping(newMapping)

        setColumnValue([]);
        setCustomValue("");

        console.log("Ordinal Encoding Query: ", ordinalEncodingQuery);
    }

    const resetEncodingData = () => {
        setColumn([])
        setCustomMapping(false)
        setColumnValue([]);
        setCustomValue("");
        setOrdinalEncodingQuery({});
        setMapping({});
        setMappingDailog(false);
    }

    // final API call
    const ordinalEncoding = () => {
        // console.log("TargetEncoding.js: ", columnList, customMapping);s
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: ordinalEncodingQuery
        }
        console.log("ordinalEncodingQuery Encoding Query: ", final_query);
        setColumn([])
        setCustomMapping(false)
        setColumnValue([]);
        setCustomValue("");
        setOrdinalEncodingQuery({});
    }

    // ============= Search Value   =================
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

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
            console.log(err);
        })

    }, [inputValue, columnValue])
    return (
        <>
            {/* Column Name  */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <Box sx={{ width: "20%", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={Object.keys(datasetUpdateState.metadata).length > 0 ? datasetUpdateState.metadata.categorical_column_list : []}
                            size="small"
                            value={column}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setColumn(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Target Column" />}
                        />
                    </FormControl>
                </Box>
            </Box>

            {/* Custom Mapping Checkbox */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <FormGroup sx={{ flexDirection: "row" }}>
                    <FormControlLabel
                        control={<Checkbox size='small' checked={customMapping == false} onClick={() => setCustomMapping(false)} />}
                        label={
                            <Typography sx={{ fontSize: '13px', fontWeight: '500' }}>
                                Alphabetical Order
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        control={<Checkbox size='small' checked={customMapping == true} onClick={() => setCustomMapping(true)} />}
                        label={
                            <Typography sx={{ fontSize: '13px', fontWeight: '500' }}>
                                Custom Mapping
                            </Typography>
                        }
                    />
                </FormGroup>

                <Tooltip title="View Mappings">
                    <IconButton onClick={() => setMappingDailog(true)} disabled={customMapping == false || column == ""} color="primary" aria-label="View Mapping" component="label">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Custom Mapping */}

            {customMapping &&
                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                    {/* Select Value Dropdown  */}
                    <Box sx={{ width: "20%" }}>
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

                    <Box sx={{ width: "20%", ml: 2 }}>
                        <FormControl fullWidth size="small">
                            <TextField
                                type='number'
                                placeholder='Custom value'
                                size='small'
                                onChange={(e) => setCustomValue(parseFloat(e.target.value))} value={customValue} sx={{ width: "14vw", mr: 2 }}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <Button variant='outlined' onClick={handleCustomValueSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

            }

            <ApplyChangesButton disableCondition={column == ""} applyFunction={ordinalEncoding} />



            <Dialog
                open={mappingDailog}
                onClose={() => setMappingDailog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {column}
                    <Tooltip title="Select another column for encoding">
                        <IconButton onClick={resetEncodingData} color="error" aria-label="View Mapping" component="label">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Categorical Value</TableCell>
                                        <TableCell>Encoded Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        Object.keys(mapping).map((categorical_value) => (
                                            <TableRow
                                                key={categorical_value}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {categorical_value}
                                                </TableCell>
                                                <TableCell>
                                                    { mapping[categorical_value] } 
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMappingDailog(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default OrdinalEncoding;