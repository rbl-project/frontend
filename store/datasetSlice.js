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
    message: null
}

export const uploadDataset = createAsyncThunk('/upload-dataset', async ({ dataset, updateProgress }) => {
    const response = await API.uploadDataset({ dataset, updateProgress });
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getAllDatasets = createAsyncThunk('/get-all-datasets', async () => {
    const response = await API.getAllDatasets();
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const exportDataset = createAsyncThunk('/export-dataset', async (formData) => {
    const response = await API.exportDataset(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

export const deleteDataset = createAsyncThunk('/delete-dataset', async (formData) => {
    const response = await API.deleteDataset(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

export const renameDataset = createAsyncThunk('/rename-dataset', async (formData) => {
    const response = await API.renameDataset(formData);
    return response.data ; // response.data is your entire object that is seen in postman as the response
});

const datasetSlice = createSlice({
    name: "dataset",
    initialState: initialState,
    reducers: {
        updateSelectedDataset:(state,action) => {
            state.selectedDataset = action.payload;
        },
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
                    state.message = "Dataset Uploaded Successfully";
                } else {
                    state.datasetUploadStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(uploadDataset.rejected, (state, action) => {
                state.datasetUploadStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Get All Datasets
            .addCase(getAllDatasets.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(getAllDatasets.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.availableDatasets = action.payload.data.datasets;
                    state.datasetCount = action.payload.data.db_count;
                    if (action.payload.data.db_count > 0 && state.selectedDataset === null) {
                        state.selectedDataset = action.payload.data.datasets[0].name;
                    }
                    state.message = null;
                } else {
                    state.requestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getAllDatasets.rejected, (state, action) => {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Export Dataset
            .addCase(exportDataset.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(exportDataset.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = "Dataset Exported Successfully";
                } else {
                    state.requestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(exportDataset.rejected, (state, action) => {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Delete Dataset
            .addCase(deleteDataset.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(deleteDataset.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = "Dataset Deleted Successfully";
                } else {
                    state.requestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(deleteDataset.rejected, (state, action) => {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Rename Dataset
            .addCase(renameDataset.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS_LOADING;
            })
            .addCase(renameDataset.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                    state.message = "Dataset Renamed Successfully";
                } else {
                    state.requestStatus = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(renameDataset.rejected, (state, action) => {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

    }

});

export const {updateSelectedDataset} = datasetSlice.actions;

export default datasetSlice.reducer;