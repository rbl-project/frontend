import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Autocomplete,
    TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// Components
import ApplyChangesButton from './ApplyChangesButton';

// actions
import { targetEncoding } from '/store/featureEncodingSlice';
import { getMetaData } from "/store/datasetUpdateSlice";


const TargetEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const datasetUpdateState = useSelector((state) => state.datasetUpdate);
    const [targetEncodingQuery, setTargetEncodingQuery] = useState({});

    const dispatch = useDispatch();

    const [columnList, setColumnList] = useState([]);
    const [targetColumn, setTargetColumn] = useState("")
    const [leaveOneOut, setLeaveOneOut] = useState(false);


    // to update the query when columnList or catName changes
    useEffect(() => {
        setTargetEncodingQuery({
            column_list: columnList,
            leaveOneOut: leaveOneOut,
            target_column: targetColumn
        })
    }, [columnList, leaveOneOut, targetColumn])

    // final API call
    const targetEncodingAPI = async() => {
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: targetEncodingQuery
        }

        await dispatch(targetEncoding(final_query));

        setColumnList([])
        setLeaveOneOut(false)
        setTargetColumn("");
        setTargetEncodingQuery({});

        await dispatch(getMetaData({ dataset_name: selectedDataset }));
    }

    return (
        <>
            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <Box sx={{ width: "20%", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            multiple
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={Object.keys(datasetUpdateState.metadata).length > 0 ? datasetUpdateState.metadata.categorical_column_list : []}
                            size="small"
                            value={columnList}
                            onChange={(e, value, reason) => setColumnList(value)}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Columns to encode" />}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: "20%", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <Autocomplete
                            disableClearable
                            disableCloseOnSelect
                            fullWidth={true}
                            filterSelectedOptions={true}
                            id="combo-box-demo"
                            options={Object.keys(datasetUpdateState.metadata).length > 0 ? datasetUpdateState.metadata.column_list : []}
                            size="small"
                            value={targetColumn}
                            // sx={{ width: "130px", padding: "0px" }}
                            onChange={(e, value, reason) => {
                                setTargetColumn(value)
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} label="Target Column" />}
                        />
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox size='small' checked={leaveOneOut == false} onClick={() => setLeaveOneOut(false)} />}
                        label={
                            <Typography sx={{ fontStyle: 'italic', fontSize: '13px', fontWeight: '400' }}>
                                Targe-Mean Method
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        control={<Checkbox size='small' checked={leaveOneOut == true} onClick={() => setLeaveOneOut(true)} />}
                        label={
                            <Typography sx={{ fontStyle: 'italic', fontSize: '13px', fontWeight: '400' }}>
                                Leave-One-Out Method
                            </Typography>
                        }
                    />
                </FormGroup>
            </Box>

            <ApplyChangesButton disableCondition={columnList.length == 0 || targetColumn == ""} applyFunction={targetEncodingAPI} />
        </>
    )
}

export default TargetEncoding;