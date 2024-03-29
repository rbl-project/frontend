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
    get_missing_value_percentage_req_status: REQUEST_STATUS_IDLE,
    all_columns_missing_value_data: [],
    single_column_missing_value_data: {},
    impute_missing_value_req_status: REQUEST_STATUS_IDLE,
    message: null,
}

export const getMissingValuePercentage = createAsyncThunk('/missing-value-percentage', async (formData) => {
    const response = await API.getMissingValuePercentage(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const imputeMissingValue = createAsyncThunk('/impute-missing-value', async (formData) => {
    const response = await API.imputeMissingValue(formData);
    return response.data;
});



const missingValueImputationSlice = createSlice({
    name: "missingValueImputation",
    initialState: initialState,
    reducers: {
        resetRequestStatus: (state, action) => {
            state.get_missing_value_percentage_req_status = REQUEST_STATUS_IDLE;
            state.impute_missing_value_req_status = REQUEST_STATUS_IDLE;
        },
    },
    extraReducers: (builder) => {
        builder

            // Get Missing Value Percentage
            .addCase(getMissingValuePercentage.pending, (state, action) => {
                state.get_missing_value_percentage_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getMissingValuePercentage.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    if (action.payload.data.all_columns === true) {
                        state.all_columns_missing_value_data = action.payload.data.missing_value_data;
                    }
                    else {
                        state.single_column_missing_value_data = action.payload.data.missing_value_data;
                    }
                    state.get_missing_value_percentage_req_status = REQUEST_STATUS_SUCCEEDED;
                } else {
                    state.get_missing_value_percentage_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getMissingValuePercentage.rejected, (state, action) => {
                state.get_missing_value_percentage_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Impute Missing Value
            .addCase(imputeMissingValue.pending, (state, action) => {
                state.impute_missing_value_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(imputeMissingValue.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.impute_missing_value_req_status = REQUEST_STATUS_SUCCEEDED;
                    state.message = action.payload.data.msg;
                } else {
                    state.impute_missing_value_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(imputeMissingValue.rejected, (state, action) => {
                state.impute_missing_value_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

    }
});

export const { resetRequestStatus } = missingValueImputationSlice.actions;

export default missingValueImputationSlice.reducer;