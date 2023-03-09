import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE,
    CUSTOM_ERROR_MESSAGE
} from "../constants/Constants";

import * as API from "../api";

const initialState = {
    requestStatus: REQUEST_STATUS_IDLE,
    categorical_columns: [],
    categorical_column_values: {},
    numerical_columns: [],
    all_columns: [],
    n_rows: 0,
    n_cols: 0,
}

export const getColumnInfo = createAsyncThunk('/get-categorical-columns', async (formData) => {
    const response = await API.getColumnInfo(formData);
    return response.data;
});

const dataCleaningSlice = createSlice({
    name: "dataCleaning",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // categorical columns
        .addCase( getColumnInfo.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( getColumnInfo.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = null;
                state.categorical_columns = action.payload.data.categorical_columns;
                state.categorical_column_values = action.payload.data.categorical_values;
                state.numerical_columns = action.payload.data.numerical_columns;
                state.all_columns = action.payload.data.all_columns;
                state.n_rows = action.payload.data.n_rows;
                state.n_cols = action.payload.data.n_cols;

            } else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( getColumnInfo.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })
    }
})

export default dataCleaningSlice.reducer;