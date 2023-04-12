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
    categorical_columns: [],
    categorical_column_values: {},
    numerical_columns: [],
    all_columns: [],
    dtypes: {},
    n_rows: 0,
    n_cols: 0,
    message: null,
}


export const oneHotEncoding = createAsyncThunk('/one-hot-encoding', async (formData) => {
    const response = await API.oneHotEncoding(formData);
    return response.data;
});

export const ordinalEncoding = createAsyncThunk('/ordinal-encoding', async (formData) => {
    const response = await API.ordinalEncoding(formData);
    return response.data;
});

export const targetEncoding = createAsyncThunk('/target-encoding', async (formData) => {
    const response = await API.targetEncoding(formData);
    return response.data;
});

export const frequencyEncoding = createAsyncThunk('/frequency-encoding', async (formData) => {
    const response = await API.frequencyEncoding(formData);
    return response.data;
});

export const binaryEncoding = createAsyncThunk('/binary-encoding', async (formData) => {
    const response = await API.binaryEncoding(formData);
    return response.data;
});


const featureEncodingSlice = createSlice({
    name: "featureEncoding",
    initialState: initialState,
    reducers: {
        resetRequestStatus:(state,action) => {
            state.requestStatus = REQUEST_STATUS_IDLE;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

        //* 1. one hot encoding
        .addCase( oneHotEncoding.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( oneHotEncoding.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( oneHotEncoding.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* 2. ordinal encoding
        .addCase( ordinalEncoding.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( ordinalEncoding.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( ordinalEncoding.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* 3. binary encoding
        .addCase( binaryEncoding.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( binaryEncoding.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( binaryEncoding.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* 4. target encoding
        .addCase( targetEncoding.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( targetEncoding.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( targetEncoding.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* 5. frequency encoding
        .addCase( frequencyEncoding.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( frequencyEncoding.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( frequencyEncoding.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

    }
})

export const { resetRequestStatus } = featureEncodingSlice.actions;

export default featureEncodingSlice.reducer;