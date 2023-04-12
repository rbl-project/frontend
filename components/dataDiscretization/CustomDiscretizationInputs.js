import React, { useEffect, useState } from 'react';
import { Box, FormControl, Tooltip, IconButton, InputLabel, OutlinedInput, InputAdornment, CircularProgress, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// Components
import RangeInputFields from './RangeInputFields';

// Icons
import AddIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';

// Redux Actions
import { dataDiscretization } from "/store/dataDiscretizationSlice";
import { getMetaData } from '/store/datasetUpdateSlice';

// Constants
import { REQUEST_STATUS_LOADING } from "/constants/Constants";


const CustomDiscretizationInputs = ({ columnName, isColumnSelected, strategy, encodingType, setSearchColumn}) => {

    // Redux
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const dataDiscretizationState = useSelector((state) => state.dataDiscretization);

    const columnMin = dataDiscretizationState.column_description !== null ? dataDiscretizationState.column_description.min : 0;
    const columnMax = dataDiscretizationState.column_description !== null ? dataDiscretizationState.column_description.max : 1;

    // Local State for Default Category Input Field
    const [defaultCategory, setDefaultCategory] = useState("Default");
    // Local State for valid Input Fields
    const [isValidInput, setIsValidInput] = useState(true);

    // Local State for Count of Range Input Fields
    const [rangeInputFieldsCount, setRangeInputFieldsCount] = useState(1);
    // Local State for Range Input Fields
    const [rangeInputFields, setRangeInputFields] = useState([{ start: { value: columnMin, included: true }, end: { value: columnMax, included: true }, category: "Category 1" }]);

    // Local State for Prefix
    const [prefix, setPrefix] = useState("Column_");

    useEffect(() => {
        setRangeInputFields([{ start: { value: columnMin, included: true }, end: { value: columnMax, included: true }, category: "Category 1" }]);
        setRangeInputFieldsCount(1);
        setDefaultCategory("Default");
        setIsValidInput(true);
    }, [isColumnSelected,columnMin, columnMax]);

    // Handle Add Range Input Field Button Click
    const handleAddRangeInputFields = () => {
        const maxEnd = Math.max(...rangeInputFields.map((rangeInputField) => rangeInputField.end.value));
        setRangeInputFields([...rangeInputFields, { start: { value: maxEnd, included: false }, end: { value: columnMax, included: true }, category: `Category ${rangeInputFieldsCount + 1}` }]);
        setRangeInputFieldsCount(rangeInputFieldsCount + 1);
    };

    // Handle Remove Range Input Field Button Click
    const handleRemoveRangeInputFields = (index) => {
        setRangeInputFields(rangeInputFields.filter((rangeInputField, i) => i !== index));
        setRangeInputFieldsCount(rangeInputFieldsCount - 1);
    };

    // Handle Apply Changes Button Click
    const handleApplyChanges = async () => {
        if (dataDiscretizationState.data_discretization_req_status !== REQUEST_STATUS_LOADING) {
            await dispatch(dataDiscretization({ dataset_name: selectedDataset, column_name: columnName, strategy: strategy, encoding_type: encodingType, default_category: defaultCategory, prefix: prefix, range_list: rangeInputFields }));
            setSearchColumn(null);
            dispatch(getMetaData({ dataset_name: selectedDataset }));
        }
    };


    return (
        <>

            <Box sx={{ display: "flex", mt: 2 }}>

                {/* Default Category Input Field  */}
                <Box sx={{ width: "20%", mr: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor="outlined-adornment-default-category">Default Category</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-default-category"
                            type='text'
                            sx={{ pr: 1 }}
                            value={defaultCategory}
                            onChange={(e) => setDefaultCategory(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip arrow title="This Will be taken as Category Name for those numbers which does not lie in given Ranges" placement="top">
                                        < InfoIcon sx={{ cursor: "pointer" }} />
                                    </Tooltip>
                                </InputAdornment>
                            }
                            label="Default Category"
                        />
                    </FormControl>
                </Box>

                {/* Prefix Input */}
                {
                    encodingType === "onehot" && (
                        <Box sx={{ width: "20%", mr: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel htmlFor="outlined-adornment-prefix">Prefix</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-prefix"
                                    type="text"
                                    sx={{ pr: 1 }}
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Tooltip arrow title="This will be used as Prefix in Name of the Bin" placement="top">
                                                < InfoIcon sx={{ cursor: "pointer" }} />
                                            </Tooltip>
                                        </InputAdornment>
                                    }
                                    label="Prefix"
                                />
                            </FormControl>
                        </Box>
                    )
                }


            </Box>

            {/* First Start, End and Category-Name Input Field Area*/}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", mt: 3, }}>
                <RangeInputFields
                    index={0}
                    min={columnMin}
                    max={columnMax}
                    inputState={rangeInputFields}
                    setInputState={setRangeInputFields}
                    setIsValidInput={setIsValidInput}
                    isColumnSelected={isColumnSelected}
                />
                {/* Add Button */}
                <Box >
                    <IconButton onClick={handleAddRangeInputFields} sx={{ p: "2px" }}>
                        <AddIcon sx={{ fontSize: "2rem" }} color="success" />
                    </IconButton>
                </Box>
            </Box>

            {/* Loop on Range Input Fields */}
            <>
                {
                    [...Array(rangeInputFieldsCount - 1)].map((e, idx) => {
                        return (
                            <>
                                {/* Start, End and Category-Name Input Field Area*/}
                                < Box key={idx + 1} sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", mt: 1 }}>
                                    <RangeInputFields
                                        index={idx + 1}
                                        min={columnMin}
                                        max={columnMax}
                                        inputState={rangeInputFields}
                                        setInputState={setRangeInputFields}
                                        setIsValidInput={setIsValidInput}
                                        isColumnSelected={isColumnSelected}
                                    />
                                    {/* Add Button */}
                                    <Box >
                                        <IconButton onClick={() => { handleRemoveRangeInputFields(idx + 1) }} sx={{ p: "2px" }}>
                                            <RemoveIcon sx={{ fontSize: "2rem" }} color="error" />
                                        </IconButton>
                                    </Box>
                                </Box >
                            </>
                        )
                    })

                }
            </>

            {/* Apply Changes Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button disabled={!(isValidInput && isColumnSelected)} onClick={handleApplyChanges} variant="contained" color="primary" sx={{ mr: 1, width: "12rem" }} startIcon={dataDiscretizationState.data_discretization_req_status !== REQUEST_STATUS_LOADING && (<DoneIcon />)}>
                    {
                        dataDiscretizationState.data_discretization_req_status === REQUEST_STATUS_LOADING ?
                            <CircularProgress size={20} color="inherit" />
                            : "Apply Changes"
                    }
                </Button>
            </Box>
        </>
    )
}

export default CustomDiscretizationInputs;