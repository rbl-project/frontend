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
    fetchDatasetStatus: REQUEST_STATUS_IDLE,
    message: null,
    saveChangesStatus: true,
    currentDatasetView: {},
    getMetadataRequestStatus: REQUEST_STATUS_IDLE,
    metadata: {},
    dataset_modify_status: false,
}

export const getMetaData = createAsyncThunk('/get-metadata', async (formData) => {
    const response = await API.getMetaData(formData);
    return response.data;
})

export const saveChanges = createAsyncThunk('/save-changes', async (formData) => {
    const response = await API.saveChanges(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

export const revertChanges = createAsyncThunk('/revert-changes', async (formData) => {
    const response = await API.revertChanges(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

export const globalDataRepresentation = createAsyncThunk('/global-data-representation', async (formData) => {
    const response = await API.globalDataRepresentation(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

const datasetUpdateSlice = createSlice({
    name: "datasetUpdate",
    initialState: initialState,
    reducers: {
        resetRequestStatus:(state,action) => {
            state.revertChangesRequestStatus = REQUEST_STATUS_IDLE;
            state.saveChangesRequestStatus = REQUEST_STATUS_IDLE;
            state.getMetadataRequestStatus = REQUEST_STATUS_IDLE;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // get Metadata
            .addCase(getMetaData.pending, (state, action) => {
                state.getMetadataRequestStatus = REQUEST_STATUS_LOADING;
                state.message = null;
            })
            .addCase(getMetaData.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.metadata = action.payload.data.metadata;
                    state.message = null;
                    state.dataset_modify_status = action.payload.data.metadata.is_copy && action.payload.data.metadata.is_copy_modified;
                    state.getMetadataRequestStatus = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.getMetadataRequestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error;
                }
            })
            .addCase(getMetaData.rejected, (state, action) => {
                state.getMetadataRequestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE;
            })
            
            // Save Changes
            .addCase(saveChanges.pending, (state, action) => {
                state.saveChangesRequestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(saveChanges.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.saveChangesRequestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                    state.saveChangesStatus = true;
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

            // Global Data Representation
            .addCase(globalDataRepresentation.pending, (state, action) => {
                state.fetchDatasetStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(globalDataRepresentation.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.fetchDatasetStatus = REQUEST_STATUS_SUCCEEDED;
                    state.currentDatasetView = action.payload.data;
                }
                else {
                    state.fetchDatasetStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(globalDataRepresentation.rejected, (state, action) => {
                state.fetchDatasetStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

    }

});

export const { resetRequestStatus} = datasetUpdateSlice.actions;

export default datasetUpdateSlice.reducer;