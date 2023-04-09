import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    FormControlLabel,
    FormGroup,
    Checkbox
} from '@mui/material';
import { useSelector } from 'react-redux';

// Components
import CategoricalColumnDropDown from './CategoricalColumnDropDown';
import ApplyChangesButton from './ApplyChangesButton';


const FrequencyEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const [frequencyEncodingQuery, setFrequencyEncodingQuery] = useState({});


    const [columnList, setColumnList] = useState([]);
    const [normalize, setNormalize] = useState(false);


    // to update the query when columnList or catName changes
    useEffect(() => {
        console.log("frequencyEncoding.js: ", columnList, normalize);
        setFrequencyEncodingQuery({
            column_list: columnList,
            normalize: normalize
        })
    }, [columnList, normalize])

    // final API call
    const frequencyEncoding = () => {
        console.log("frequencyEncoding.js: ", columnList, normalize);
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: frequencyEncodingQuery
        }
        console.log("Frequency Encoding Query: ", final_query);
        setColumnList([])
        setNormalize(false)
        setFrequencyEncodingQuery({});
    }

    return (
        <>
            <CategoricalColumnDropDown columnList={columnList} setColumnList={setColumnList} />

            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox size='small' checked={normalize == true} onClick={() => setNormalize(!normalize)} />}
                        label={
                            <Typography sx={{ fontStyle: 'italic', fontSize: '13px', fontWeight: '400' }}>
                               Normalize the frequency values
                            </Typography>
                        }
                    />
                </FormGroup>
            </Box>

            <ApplyChangesButton disableCondition={columnList.length == 0} applyFunction={frequencyEncoding} />
        </>
    )
}

export default FrequencyEncoding