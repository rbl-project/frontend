import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE,
    CUSTOM_ERROR_MESSAGE
} from "/constants/Constants";

import * as API from "/api";

const initialState = {
    data_transformation_req_status: REQUEST_STATUS_IDLE,
    message: null,
}


export const dataTransformation = createAsyncThunk('/data-transformation', async (formData) => {
    const response = await API.dataTransformation(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});


const dataTransformationSlice = createSlice({
    name: "dataTransformation",
    initialState: initialState,
    reducers: {
        resetRequestStatus: (state, action) => {
            state.data_transformation_req_status = REQUEST_STATUS_IDLE;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Data Transformation
            .addCase(dataTransformation.pending, (state, action) => {
                state.data_transformation_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(dataTransformation.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.data_transformation_req_status = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                } else {
                    state.data_transformation_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(dataTransformation.rejected, (state, action) => {
                state.data_transformation_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


    }
});

export const { resetRequestStatus } = dataTransformationSlice.actions;

export default dataTransformationSlice.reducer;