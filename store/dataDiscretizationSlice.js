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
    data_discretization_req_status: REQUEST_STATUS_IDLE,
    get_column_description_req_status: REQUEST_STATUS_IDLE,
    column_description:null,
    message: null,
}


export const getColumnDescription = createAsyncThunk('/get-column-description', async (formData) => {
    const response = await API.getDescribeNumericalData(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const dataDiscretization = createAsyncThunk('/data-discretization', async (formData) => {
    const response = await API.dataDiscretization(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});


const dataDiscretizationSlice = createSlice({
    name: "dataDiscretization",
    initialState: initialState,
    reducers: {
        resetRequestStatus: (state, action) => {
            state.data_discretization_req_status = REQUEST_STATUS_IDLE;
            state.get_column_description_req_status = REQUEST_STATUS_IDLE;
            state.column_description = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Get Column Description
            .addCase(getColumnDescription.pending, (state, action) => {
                state.get_column_description_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getColumnDescription.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.column_description = action.payload.data;
                    state.get_column_description_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.get_column_description_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getColumnDescription.rejected, (state, action) => {
                state.get_column_description_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Data Discretization
            .addCase(dataDiscretization.pending, (state, action) => {
                state.data_discretization_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(dataDiscretization.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.data_discretization_req_status = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                } else {
                    state.data_discretization_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(dataDiscretization.rejected, (state, action) => {
                state.data_discretization_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


    }
});

export const { resetRequestStatus } = dataDiscretizationSlice.actions;

export default dataDiscretizationSlice.reducer;