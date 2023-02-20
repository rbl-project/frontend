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
    tabularRepresentation: null,
    categoricalColumns: [],
    numericalColumns: [],
}

export const getTabularRepresentation = createAsyncThunk('/filtered-tabular-representation', async (formData) => {
    const response = await API.getTabularRepresentation(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getCategoricalColumns = createAsyncThunk('/get-categorical-columns', async (formData) => {
    const response = await API.getCategoricalColumns(formData);
    return response.data;
});

const tabularRepresentationSlice = createSlice({
    name: "tabularRepresentation",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // categorical columns
        .addCase( getCategoricalColumns.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( getCategoricalColumns.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = null;
                state.categoricalColumns = action.payload.data;
            } else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( getCategoricalColumns.rejected, (state, action) => {
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
                state.tabularRepresentation = action.payload.data;
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