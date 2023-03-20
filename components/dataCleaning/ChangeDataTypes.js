import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

// material-ui
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    Autocomplete,
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Link} from '@mui/material';


// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// constants
import { CHANGE_DATA_TYPE_API_TASK_TYPE } from '/constants/Constants';

const ChangeDataTypeSection = ({ setApiTaskType, changeDataTypeQuery, setChangeDataTypeQuery }) => {
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    const list_of_data_types = {
        "int16": ["int32", "int64", "float32", "float64", "str"] ,
        "int32": ["int64", "float32", "float64", "str"] ,
        "int64": ["float32", "float64", "str"] ,
        "float32": ["int16", "int32", "int64","float64", "str"] ,
        "float64": ["int16", "int32", "int64","float32", "str"] ,
        "str": [] ,
        "object": ["int16", "int32", "int64", "float32", "float64", "str"] ,
        "datetime64[ns]": [] ,
        "bool": ["str"],
        "unicode": []
    }

    const [column, setColumn] = useState('');
    const [dataType, setDataType] = useState('');
    const [dataTypeOptions, setDataTypeOptions] = useState(Object.keys(list_of_data_types));

    const handleSubmit = () => {
        setChangeDataTypeQuery({ ...changeDataTypeQuery, [column]: dataType });
        setColumn('');
        setDataType('');
    }

    useEffect(() => {
        setApiTaskType(CHANGE_DATA_TYPE_API_TASK_TYPE)
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Column Dropdown  */}
                <Box sx={{ width: "14vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataCleaningState.metadata?.column_list}
                            size="small"
                            value={column}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setColumn(value)
                                setDataType(dataCleaningState.metadata?.column_datatypes[value])
                                setDataTypeOptions(list_of_data_types[dataCleaningState.metadata?.column_datatypes[value]])
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Columns" />}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: "14vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataTypeOptions}
                            size="small"
                            value={dataType}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setDataType(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Data Type" />}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(column.length != 0 && dataType.length != 0) ? false : true} onClick={handleSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>


            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(changeDataTypeQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "50%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Column</TableCell>
                                            <TableCell>Data Type</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Numerical */}
                                        {
                                            Object.keys(changeDataTypeQuery).map((col) => (
                                                <TableRow
                                                    key={col}
                                                >
                                                    <TableCell>
                                                        {col}

                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            <Paper
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'start',
                                                                    flexWrap: 'wrap',
                                                                    listStyle: 'none',
                                                                    p: 0.5,
                                                                    m: 0,
                                                                }}
                                                                component="ul"
                                                            >
                                                                <Chip
                                                                    sx={{ m: 0.5 }}
                                                                    label={changeDataTypeQuery[col]}
                                                                />

                                                            </Paper>
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href="#" underline="none">
                                                            <DeleteOutlineIcon onClick={() => {
                                                                let temp = {...changeDataTypeQuery};
                                                                delete temp[col];
                                                                setChangeDataTypeQuery(temp);
                                                            }} />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
            }
        </Box>
    )
}

export default ChangeDataTypeSection;