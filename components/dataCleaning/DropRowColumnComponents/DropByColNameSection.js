import React, { useEffect, useState } from 'react'
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

import { styled } from '@mui/material/styles';

// icons
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// constants
import { DROP_BY_COLUMN_NAME_API_TASK_TYPE } from "/constants/Constants";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const DropByColNameSection = ({ setApiTaskType, dropByColNameQuery, setDropByColNameQuery }) => {

    const [deleteColumnList, setDeleteColumnList] = useState([]);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    const handleDeleteColSubmit = () => {
        let dropQuery_temp = dropByColNameQuery;
        dropQuery_temp.col_list = deleteColumnList;
        setDropByColNameQuery(dropQuery_temp);

        setDeleteColumnList([]);
    }

    useEffect(() => {
        setApiTaskType(DROP_BY_COLUMN_NAME_API_TASK_TYPE)
    }, [])

    return (
        <>
            {/* Drop Rows by Column Values Input */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Columns from Dropdown that is to be deleted */}
                <Box sx={{ width: "20vw" }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            multiple
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={datasetUpdateState.metadata?.column_list}
                            size="small"
                            value={deleteColumnList}
                            onChange={(e, value, reason) => setDeleteColumnList(value)}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Columns to drop" />}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(deleteColumnList.length != 0) ? false : true} onClick={handleDeleteColSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                (!dropByColNameQuery['col_list'] || dropByColNameQuery['col_list'].length == 0) ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Columns to be dropped</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key='one'>
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
                                                    > {
                                                            dropByColNameQuery['col_list']?.map((val) => {
                                                                return (
                                                                    <ListItem key={val}>
                                                                        <Chip
                                                                            label={val}
                                                                            onDelete={() => {
                                                                                setDropByColNameQuery({
                                                                                    ...dropByColNameQuery,
                                                                                    ["col_list"]: dropByColNameQuery.col_list.filter((item) => item !== val)
                                                                                })
                                                                            }}
                                                                        />
                                                                    </ListItem>
                                                                );
                                                            })
                                                        }

                                                    </Paper>
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Link href="#" underline="none">
                                                    <DeleteOutlineIcon onClick={() => {
                                                        let temp = { ...dropByColNameQuery };
                                                        temp['col_list'] = [];
                                                        setDropByColNameQuery(temp);
                                                    }} />
                                                </Link>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
            }

        </>
    )
}

export default DropByColNameSection;