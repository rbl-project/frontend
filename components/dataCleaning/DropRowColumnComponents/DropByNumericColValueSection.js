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

const DropByNumericColValueSection = ({ dropByNumericalQuery, setDropByNumericalQuery, dataCleaningState }) => {

    const [dropColumnNumerical, setDropColumnNumerical] = useState('');
    const [dropNumericalToValue, setDropNumericalToValue] = useState(undefined);
    const [dropNumericalFromValue, setDropNumericalFromValue] = useState(undefined);


    const handleDropColNumericalSubmit = () => {
        // append serachColumn as key and searchValue as value in searchQuery object
        let dropQuery_temp = dropByNumericalQuery;
        dropQuery_temp[dropColumnNumerical] = [dropNumericalFromValue, dropNumericalToValue];
        setDropByNumericalQuery(dropQuery_temp);

        console.log(dropByNumericalQuery);

        setDropColumnNumerical('');
        setDropNumericalToValue('');
        setDropNumericalFromValue('');
    }

    return (
        <>
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
                            options={dataCleaningState.numerical_columns}
                            size="small"
                            value={dropColumnNumerical}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value) => {
                                setDropColumnNumerical(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Numerical Column" />}
                            sx={parseInt(dropNumericalToValue) < parseInt(dropNumericalFromValue) ? { paddingBottom: "25px" } : {}}
                        />
                    </FormControl>
                </Box>


                <Box>
                    <FormControl fullWidth size="small" sx={{ flexDirection: 'row' }}>
                        <TextField 
                            disabled={dropColumnNumerical.length != 0 ? false: true} 
                            placeholder='From' type="number" 
                            inputProps={{ inputMode: 'numeric' }} 
                            size='small' 
                            onChange={(e) => setDropNumericalFromValue(e.target.value)} 
                            value={dropNumericalFromValue} sx={{ mr: 2 }} 
                        />
                        <TextField 
                            disabled={dropColumnNumerical.length != 0 ? false: true} 
                            placeholder='To' 
                            type="number" 
                            inputProps={{ inputMode: 'numeric' }} 
                            size='small' 
                            onChange={(e) => setDropNumericalToValue(e.target.value)} 
                            value={dropNumericalToValue} 
                            error={parseInt(dropNumericalToValue) < parseInt(dropNumericalFromValue)}
                            helperText={((parseInt(dropNumericalToValue) < parseInt(dropNumericalFromValue)) ? "To value must be greater than From" : "")}
                        />
                    </FormControl>
                </Box>

                <Box sx={parseInt(dropNumericalToValue) < parseInt(dropNumericalFromValue) ? { paddingBottom: "25px", ml: '1rem' } : { ml: '1rem'}}>
                    <Button 
                        variant='outlined' 
                        disabled={(dropColumnNumerical.length != 0 && dropNumericalFromValue != null && dropNumericalToValue != null) ? false : true} 
                        onClick={handleDropColNumericalSubmit} 
                        
                    >
                        <FileDownloadDoneIcon />
                    </Button>
                </Box>
            </Box>
            <Box>
                <Typography sx={{ textAlign: 'start', fontStyle: 'italic', fontSize: '13px', fontWeight: '500', mt: "12px" }}>
                    <b>Note</b>: For one particular value, give both FROM and TO same as that value
                </Typography>
            </Box>

            {/* Preview of the selected columns and values */}
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: 'start', mt: 3 }}>
                Current Selection
            </Typography>
            {
                Object.keys(dropByNumericalQuery).length == 0 ?
                    (
                        <></>
                    ) : (
                        <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Column</TableCell>
                                            <TableCell>Range / Value</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Numerical */}
                                        {
                                            Object.keys(dropByNumericalQuery).map((row) => (
                                                <TableRow
                                                    key={row}
                                                >
                                                    <TableCell>
                                                        {row}

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
                                                                (dropByNumericalQuery[row][0] == dropByNumericalQuery[row][1]) ?
                                                                    ( <Chip
                                                                        label={`${dropByNumericalQuery[row][0]}`}
                                                                    />) :
                                                                    ( <Chip
                                                                        
                                                                        label={`${dropByNumericalQuery[row][0]} - ${dropByNumericalQuery[row][1]}`}
                                                                    />)
                                                            }
                                                            </Paper>
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href="#" underline="none">
                                                            <DeleteOutlineIcon onClick={() => {
                                                                let temp = { ...dropByNumericalQuery };
                                                                delete temp[row];
                                                                setDropByNumericalQuery(temp);
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

export default DropByNumericColValueSection;