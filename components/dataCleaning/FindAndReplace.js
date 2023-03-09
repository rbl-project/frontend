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


const FindAndReplaceSection = () => {
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    // REdux state
    const dataCleaningState = useSelector((state) => state.dataCleaning);

    // Local state
    const [column, setColumn] = useState('');
    const [find, setFind] = useState('');
    const [replace, setReplace] = useState('');

    // const findReplaceQuery = {
    //     "column_name": [
    //         {
    //             "find": "find",
    //             "replace": "replace"
    //         },
    //         {
    //             "find": "find",
    //             "replace": "replace"
    //         }
    //     ]
    // }
    const [findReplaceQuery, setFindReplaceQuery] = useState({})

    const handleSubmit = () => {
        let query = findReplaceQuery;
        if (query[column] == null) {
            query[column] = [];
        }
        query[column].push({
            "find": find,
            "replace": replace
        })
        setFindReplaceQuery(query);
        console.log(query);

        setFind('');
        setReplace('');
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
                                // sx={{ width: "130px", padding: "0px" }}
                                onChange={(e, value, reason) => {
                                    setColumn(value)
                                }}
                                renderInput={(params) => <TextField sx={{}} {...params} label="Categorical Column" />}
                            />
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Box>
                        <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                            <TextField  placeholder='Find' size='small' onChange={(e) => setFind(e.target.value)} value={find} sx={{ width: "14vw", mr: 2 }} />
                            <TextField placeholder='Replace' size='small' onChange={(e) => setReplace(e.target.value)} value={replace} sx={{ width: "14vw" }} />
                        </FormControl>
                    </Box>

                    <Box sx={{ ml: "1rem" }}>
                        <Button variant='outlined' disabled={(column.length != 0 && find.length != 0 && replace.length != 0) ? false : true} onClick={handleSubmit} >
                            <FileDownloadDoneIcon />
                        </Button>
                    </Box>
                </Box>

                {/* Preview of the selected columns and values */}
                <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                    Current Selection
                </Typography>
                {
                    Object.keys(findReplaceQuery).length == 0 ?
                        (
                            <></>
                        ) : (
                            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Column</TableCell>
                                                <TableCell>Find/Replace</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Numerical */}
                                            {
                                                Object.keys(findReplaceQuery).map((col) => (
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
                                                                >{
                                                                        findReplaceQuery[col].map((item) => (
                                                                            <Chip
                                                                                sx={{ m: 0.5 }}
                                                                                label={<Typography>{item['find']} &#8594; {item['replace']}</Typography>}
                                                                                onDelete={() => {
                                                                                    setFindReplaceQuery({
                                                                                        ...findReplaceQuery,
                                                                                        [col]: findReplaceQuery[col].filter((obj) => obj['find'] != item['find'] && obj['replace'] != item['replace'])
                                                                                    })
                                                                                    if(findReplaceQuery[col].length == 1) {
                                                                                        let temp = { ...findReplaceQuery };
                                                                                        delete temp[col];
                                                                                        setFindReplaceQuery(temp);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Paper>
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link href="#" underline="none">
                                                                <DeleteOutlineIcon onClick={() => {
                                                                    let temp = { ...findReplaceQuery };
                                                                    delete temp[col];
                                                                    setFindReplaceQuery(temp);
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

export default FindAndReplaceSection;