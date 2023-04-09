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


const OneHotEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const [oneHotEncodingQuery, setOneHotEncodingQuery] = useState({});


    const [columnList, setColumnList] = useState([]);
    const [catName, setUseCatName] = useState(false);


    // to update the query when columnList or catName changes
    useEffect(() => {
        console.log("OneHotEncoding.js: ", columnList, catName);
        setOneHotEncodingQuery({
            column_list: columnList,
            use_cat_name: catName
        })
    }, [columnList, catName])

    // final API call
    const oneHotEncoding = () => {
        console.log("OneHotEncoding.js: ", columnList, catName);
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: oneHotEncodingQuery
        }
        console.log("One Hot Encoding Query: ", final_query);
        setColumnList([])
        setUseCatName(false)
        setOneHotEncodingQuery({});
    }

    return (
        <>
            <CategoricalColumnDropDown columnList={columnList} setColumnList={setColumnList} />

            <Box sx={{ mt: "0.8rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox size='small' checked={catName == false} onClick={() => setUseCatName(false)} />}
                        label={
                            <Typography sx={{ fontStyle: 'italic', fontSize: '13px', fontWeight: '400' }}>
                                Use Column Name and Category indices as new column names eg. City_1
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        control={<Checkbox size='small' checked={catName == true} onClick={() => setUseCatName(true)} />}
                        label={
                            <Typography sx={{ fontStyle: 'italic', fontSize: '13px', fontWeight: '400' }}>
                                Use Column Name and Category names as new column names eg. City_Bangalore
                            </Typography>
                        }
                    />
                </FormGroup>
            </Box>

            <ApplyChangesButton disableCondition={columnList.length == 0} applyFunction={oneHotEncoding} />
        </>
    )
}

export default OneHotEncoding