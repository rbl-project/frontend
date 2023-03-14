import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE,
    CUSTOM_ERROR_MESSAGE
} from "../constants/Constants";

import * as API from "../api";

const initialState = {
    saveChangesRequestStatus: REQUEST_STATUS_IDLE,
    revertChangesRequestStatus: REQUEST_STATUS_IDLE,
    message: null
}

export const saveChanges = createAsyncThunk('/save-changes', async (formData) => {
    const response = await API.saveChanges(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

export const revertChanges = createAsyncThunk('/revert-changes', async (formData) => {
    const response = await API.revertChanges(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

const datasetUpdateSlice = createSlice({
    name: "datasetUpdate",
    initialState: initialState,
    reducers: {
        resetRequestStatus:(state,action) => {
            state.revertChangesRequestStatus = REQUEST_STATUS_IDLE;
            state.saveChangesRequestStatus = REQUEST_STATUS_IDLE;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            
            // Save Changes
            .addCase(saveChanges.pending, (state, action) => {
                state.saveChangesRequestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(saveChanges.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.saveChangesRequestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                }
                else {
                    state.saveChangesRequestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(saveChanges.rejected, (state, action) => {
                state.saveChangesRequestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // revert Changes
            .addCase(revertChanges.pending, (state, action) => {
                state.revertChangesRequestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(revertChanges.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.revertChangesRequestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                }
                else {
                    state.revertChangesRequestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(revertChanges.rejected, (state, action) => {
                state.revertChangesRequestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })
    }

});

export const { resetRequestStatus} = datasetUpdateSlice.actions;

export default datasetUpdateSlice.reducer;