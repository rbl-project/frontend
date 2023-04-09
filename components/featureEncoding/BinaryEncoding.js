import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import CategoricalColumnDropDown from './CategoricalColumnDropDown';
import ApplyChangesButton from './ApplyChangesButton';


const BinaryEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const [binaryEncodingQuery, setBinaryEncodingQuery] = useState({});


    const [columnList, setColumnList] = useState([]);


    // to update the query when columnList or catName changes
    useEffect(() => {
        console.log("BinaryEncoding.js: ", columnList);
        setBinaryEncodingQuery({
            column_list: columnList,
        })
    }, [columnList])

    // final API call
    const binaryEncoding = () => {
        console.log("BinaryEncoding.js: ", columnList);
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: binaryEncodingQuery
        }
        console.log("Binary Encoding Query: ", final_query);
        setColumnList([])
        setBinaryEncodingQuery({});
    }

    return (
        <>
            <CategoricalColumnDropDown columnList={columnList} setColumnList={setColumnList} />
            <ApplyChangesButton disableCondition={columnList.length == 0} applyFunction={binaryEncoding} />
        </>
    )
}

export default BinaryEncoding