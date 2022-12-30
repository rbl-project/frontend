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
    requestStatus: REQUEST_STATUS_IDLE,
    datasetUploadStatus: REQUEST_STATUS_IDLE,
    availableDatasets: [],
    selectedDataset: null,
    datasetCount: 0,
    errorMessage: null
}

export const uploadDataset = createAsyncThunk('/dataset-upload', async ({ dataset, updateProgress }) => {
    const response = await API.uploadDataset({ dataset, updateProgress });
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getAllDatasets = createAsyncThunk('/get-all-datasets', async () => {
    const response = await API.getAllDatasets();
    return response.data; // response.data is your entire object that is seen in postman as the response
});

const datasetSlice = createSlice({
    name: "dataset",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Dataset Upload
            .addCase(uploadDataset.pending, (state, action) => {
                state.datasetUploadStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(uploadDataset.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.datasetUploadStatus = REQUEST_STATUS_SUCCEEDED;
                    state.errorMessage = null;
                } else {
                    state.datasetUploadStatus = REQUEST_STATUS_FAILED;
                    state.errorMessage = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(uploadDataset.rejected, (state, action) => {
                state.datasetUploadStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Get All Dataset
            .addCase(getAllDatasets.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(getAllDatasets.fulfilled, (state, action) => { // action.payload is the response.data
                console.log(action.payload)
                if (action.payload.status) {
                    state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.availableDatasets = action.payload.data.datasets;
                    state.datasetCount = action.payload.data.db_count;
                    if (action.payload.data.db_count > 0) {
                        state.selectedDataset = action.payload.data.datasets[0];
                    }
                } else {
                    state.requestStatus = REQUEST_STATUS_FAILED;
                    state.errorMessage = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getAllDatasets.rejected, (state, action) => {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

    }

});

export default datasetSlice.reducer;