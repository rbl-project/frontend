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
    Link
} from '@mui/material';


// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// constants
import { CHANGE_COLUMN_TYPE_API_TASK_TYPE, COLUMN_TYPE_OPTIONS } from '/constants/Constants';

const ChangeColumnType = ({ setApiTaskType, changeColumnTypeQuery, setChangeColumnTypeQuery }) => {
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    const [column, setColumn] = useState('');
    const [columnType, setColumnType] = useState('');
    
    const columnTypeOptions = COLUMN_TYPE_OPTIONS;

    const handleSubmit = () => {
        setChangeColumnTypeQuery({ ...changeColumnTypeQuery, [column]: columnType });
        setColumn('');
        setColumnType('');
    }

    useEffect(() => {
        setApiTaskType(CHANGE_COLUMN_TYPE_API_TASK_TYPE)
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
                            onChange={(e, value, reason) => {
                                setColumn(value)
                                // setColumnType(dataCleaningState.dtypes[value])
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
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
                            disabled={(column.length != 0) ? false : true}
                            options={columnTypeOptions}
                            size="small"
                            value={
                                (dataCleaningState.metadata?.categorical_column_list.includes(column)) 
                                ? "Categorical" 
                                : (dataCleaningState.metadata?.numerical_column_list.includes(column)) ? "Numerical" : ""
                            }
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setColumnType(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Column Type" />}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(column.length != 0 && columnType.length != 0) ? false : true} onClick={handleSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>


            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(changeColumnTypeQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "50%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Column</TableCell>
                                            <TableCell>Column Type</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Numerical */}
                                        {
                                            Object.keys(changeColumnTypeQuery).map((col) => (
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
                                                                    label={changeColumnTypeQuery[col]}
                                                                />

                                                            </Paper>
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href="#" underline="none">
                                                            <DeleteOutlineIcon onClick={() => {
                                                                let temp = {...changeColumnTypeQuery};
                                                                delete temp[col];
                                                                setChangeColumnTypeQuery(temp);
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

export default ChangeColumnType;