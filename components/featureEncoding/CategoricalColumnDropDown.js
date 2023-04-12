import React from 'react'

import {
    Autocomplete,
    Box,
    FormControl,
    TextField

} from '@mui/material';

import { useSelector } from 'react-redux';

const CategoricalColumnDropDown = ({ columnList, setColumnList }) => {

    const datasetUpdateState = useSelector((state) => state.datasetUpdate);

    return (
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
        </Box>
    )
}

export default CategoricalColumnDropDown