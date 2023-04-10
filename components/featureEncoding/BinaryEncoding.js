import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import CategoricalColumnDropDown from './CategoricalColumnDropDown';
import ApplyChangesButton from './ApplyChangesButton';

// actions
import { binaryEncoding } from '/store/featureEncodingSlice';
import { getMetaData } from "/store/datasetUpdateSlice";


const BinaryEncoding = () => {

    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const [binaryEncodingQuery, setBinaryEncodingQuery] = useState({});

    const dispatch = useDispatch();

    const [columnList, setColumnList] = useState([]);

    // to update the query when columnList or catName changes
    useEffect(() => {
        setBinaryEncodingQuery({
            column_list: columnList,
        })
    }, [columnList])

    // final API call
    const binaryEncodingAPI = async() => {
        let final_query = {
            dataset_name: selectedDataset,
            encoding_info: binaryEncodingQuery
        }

        await dispatch(binaryEncoding(final_query));

        setColumnList([])
        setBinaryEncodingQuery({});

        await dispatch(getMetaData({ dataset_name: selectedDataset }));
    }

    return (
        <>
            <CategoricalColumnDropDown columnList={columnList} setColumnList={setColumnList} />
            <ApplyChangesButton disableCondition={columnList.length == 0} applyFunction={binaryEncodingAPI} />
        </>
    )
}

export default BinaryEncoding