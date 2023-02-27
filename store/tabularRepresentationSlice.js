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
    filterd_data: {},
    categorical_columns: [],
    categorical_column_values: {},
    numerical_columns: [],
    all_columns: [],
    n_rows: 0,
    n_cols: 0,
}

export const getTabularRepresentation = createAsyncThunk('/filtered-tabular-representation', async (formData) => {
    const response = await API.getTabularRepresentation(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getColumnInfo = createAsyncThunk('/get-categorical-columns', async (formData) => {
    const response = await API.getColumnInfo(formData);
    return response.data;
});

const tabularRepresentationSlice = createSlice({
    name: "tabularRepresentation",
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


        // tabular representation
        .addCase( getTabularRepresentation.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( getTabularRepresentation.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = null;
                state.filterd_data = action.payload.data;
            } else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( getTabularRepresentation.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })
    }
})

export default tabularRepresentationSlice.reducer;