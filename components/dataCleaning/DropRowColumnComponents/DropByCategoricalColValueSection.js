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

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const ToolTipText = styled('p')(({ theme }) => ({
    color: "white",
    backgroundColor: "grey",
    borderRadius: "50%",
    padding: "0px 8px",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "0.5rem"
}))

const DropByCategoricalColValueSection = ({ dropByCategoricalQuery, setDropByCategoricalQuery, dataCleaningState }) => {

    const [dropColumn, setDropColumn] = useState('');
    const [dropValue, setDropValue] = useState([]);

    const [categoricalColValuesOptions, setCategoricalColValuesOptions] = useState([]);

    const handleDropColSubmit = () => {
        console.log("Drop Column: ", dropColumn);
        console.log("Drop Values: ", dropValue);

        let dropQuery_temp = dropByCategoricalQuery;
        dropQuery_temp[dropColumn] = dropValue;
        setDropByCategoricalQuery(dropQuery_temp);

        setDropColumn('');
        setDropValue([]);

        console.log("Drop Query: ", dropByCategoricalQuery);
    }
    return (
        <>
            {/* Drop Rows by Column Values Input */}
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                {/* Select Column Dropdown  */}
                <Box sx={{ width: "20vw", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={dataCleaningState.categorical_columns}
                            size="small"
                            value={dropColumn}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setDropColumn(value)
                                setCategoricalColValuesOptions(dataCleaningState.categorical_column_values[value])
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Categorical Column" />}
                        />
                    </FormControl>
                </Box>

                {/* Select Value Dropdown  */}
                <Box sx={{ width: "20vw" }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            multiple
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={categoricalColValuesOptions}
                            size="small"
                            value={dropValue}
                            onChange={(e, value, reason) => setDropValue(value)}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Value" />}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ ml: "1rem" }}>
                    <Button variant='outlined' disabled={(dropColumn.length != 0 && dropValue.length != 0) ? false : true} onClick={handleDropColSubmit} >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(dropByCategoricalQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Column</TableCell>
                                            <TableCell>Value(s)</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            Object.keys(dropByCategoricalQuery).map((col, values) => (
                                                <TableRow
                                                    key={col}
                                                >
                                                    <TableCell component="th" scope="row">
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
                                                            > {
                                                                    dropByCategoricalQuery[col].map((val) => {
                                                                        return (
                                                                            <ListItem key={val}>
                                                                                <Chip
                                                                                    label={val}
                                                                                    onDelete={() => {
                                                                                        setDropByCategoricalQuery({
                                                                                            ...dropByCategoricalQuery,
                                                                                            [col]: dropByCategoricalQuery[col].filter((item) => item !== val)
                                                                                        })
                                                                                        if (dropByCategoricalQuery[col].length == 1) {
                                                                                            let temp = { ...dropByCategoricalQuery };
                                                                                            delete temp[col];
                                                                                            setDropByCategoricalQuery(temp);
                                                                                        }
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
                                                                let temp = { ...dropByCategoricalQuery };
                                                                delete temp[col];
                                                                setDropByCategoricalQuery(temp);
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
        </>
    )
}

export default DropByCategoricalColValueSection