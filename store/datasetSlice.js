import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE
} from "../constants/Constants";

import * as API from "../api";

const initialState = {
    datasetStatus: REQUEST_STATUS_IDLE,
    errorMessage: null
}

export const uploadDataset = createAsyncThunk('/dataset-upload', async (formData) => {
    const response = await API.uploadDataset(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

const datasetSlice = createSlice({
    name: "dataset",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

        // Login
        .addCase( uploadDataset.pending, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( uploadDataset.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {

                state.authenticationStatus = REQUEST_STATUS_SUCCEEDED;
                state.errorMessage = null;
            } else {
                state.authenticationStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( uploadDataset.rejected, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_FAILED;
            state.errorMessage = action.error.message; // unknow error in request
        })

    }

});

export default datasetSlice.reducer;