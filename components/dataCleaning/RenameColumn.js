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

const RenameColumnSection = () => {
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    // Local state
    const [column, setColumn] = useState('');
    const [newName, setNewName] = useState('');

    // const renameColumnQuery = {
    //     "column_name": "new_column_name"
    // }
    const [renameColumnQuery, setRenameColumnQuery] = useState({})

    const handleSubmit = () => {
        setRenameColumnQuery({ ...renameColumnQuery, [column]: newName });
        setColumn('');
        setNewName('');
        console.log(renameColumnQuery);

    }

    return (
        <>
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
                                options={dataCleaningState.all_columns}
                                size="small"
                                value={column}
                                onChange={(e, value, reason) => {
                                    setColumn(value)
                                }}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Column" />}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                            <TextField  placeholder='New Name' size='small' onChange={(e) => setNewName(e.target.value)} value={newName} sx={{ width: "14vw", mr: 2 }} />
                         </FormControl>
                    </Box>
                    <Box sx={{ ml: "1rem" }}>
                        <Button variant='outlined' disabled={(column.length != 0 && newName.length != 0) ? false : true} onClick={handleSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

                {/* Preview of the selected columns and values */}
                <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                    Current Selection
                </Typography>
                {
                    Object.keys(renameColumnQuery).length == 0 ?
                        (
                            <></>
                        ) : (
                            <Box sx={{ mt: "0.8rem", width: "50%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Column</TableCell>
                                                <TableCell>New Name</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Numerical */}
                                            {
                                                Object.keys(renameColumnQuery).map((col) => (
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
                                                                        label={renameColumnQuery[col]}
                                                                    />
                                                                </Paper>
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link href="#" underline="none">
                                                                <DeleteOutlineIcon onClick={() => {
                                                                    let temp = { ...renameColumnQuery };
                                                                    delete temp[col];
                                                                    setRenameColumnQuery(temp);
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
        </>
    )
}

export default RenameColumnSection;