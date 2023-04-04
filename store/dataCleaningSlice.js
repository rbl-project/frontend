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

export const getColumnInfo = createAsyncThunk('/get-categorical-columns', async (formData) => {
    const response = await API.getColumnInfo(formData);
    return response.data;
});

export const dropByColValue = createAsyncThunk('/drop-by-column-value', async (formData) => {
    const response = await API.dropByColValue(formData);
    return response.data;
});

export const dropByNumericalValue = createAsyncThunk('/drop-by-numerical-value', async (formData) => {
    const response = await API.dropByNumericalValue(formData);
    return response.data;
});

export const dropByColName = createAsyncThunk('/drop-by-column-name', async (formData) => {
    const response = await API.dropByColName(formData);
    return response.data;
});

export const dropByRowIndex = createAsyncThunk('/drop-by-row-index', async (formData) => {
    const response = await API.dropByRowIndex(formData);
    return response.data;
});

export const renameColumn = createAsyncThunk('/rename-column', async (formData) => {
    const response = await API.renameColumn(formData);
    return response.data;
});

export const findAndReplace = createAsyncThunk('/find-and-replace', async (formData) => {
    const response = await API.findAndReplace(formData);
    return response.data;
});

export const changeDataType = createAsyncThunk('/change-data-type', async (formData) => {
    const response = await API.changeDataType(formData);
    return response.data;
});

export const changeColumnType = createAsyncThunk('/change-column-type', async (formData) => {
    const response = await API.changeColumnType(formData);
    return response.data;
});

const dataCleaningSlice = createSlice({
    name: "dataCleaning",
    initialState: initialState,
    reducers: {
        resetRequestStatus:(state,action) => {
            state.requestStatus = REQUEST_STATUS_IDLE;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

        //*  columns info
        .addCase( getColumnInfo.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
            state.message = null;
        })
        .addCase( getColumnInfo.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = null;
                state.categorical_columns = action.payload.data.categorical_columns;
                state.categorical_column_values = action.payload.data.categorical_values;
                state.numerical_columns = action.payload.data.numerical_columns;
                state.all_columns = action.payload.data.all_columns;
                state.dtypes = action.payload.data.dtypes;
                state.n_rows = action.payload.data.n_rows;
                state.n_cols = action.payload.data.n_cols;

            } else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( getColumnInfo.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //*  drop by col value
        .addCase( dropByColValue.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( dropByColValue.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( dropByColValue.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //*  drop by numerical value
        .addCase( dropByNumericalValue.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( dropByNumericalValue.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( dropByNumericalValue.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //*  drop by column name
        .addCase( dropByColName.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( dropByColName.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( dropByColName.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //*  drop by row index
        .addCase( dropByRowIndex.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( dropByRowIndex.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( dropByRowIndex.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })


        //*  rename column
        .addCase( renameColumn.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( renameColumn.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( renameColumn.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* find and replace
        .addCase( findAndReplace.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( findAndReplace.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( findAndReplace.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* change data type
        .addCase( changeDataType.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( changeDataType.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( changeDataType.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

        //* change column type
        .addCase( changeColumnType.pending, (state, action) => {
            state.requestStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( changeColumnType.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {
                state.requestStatus = REQUEST_STATUS_SUCCEEDED;
                state.message = action.payload.data.msg;
                
            }
            else {
                state.requestStatus = REQUEST_STATUS_FAILED;
                state.message = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( changeColumnType.rejected, (state, action) => {
            state.requestStatus = REQUEST_STATUS_FAILED;
            state.message = CUSTOM_ERROR_MESSAGE;
        })

    }
})

export const { resetRequestStatus } = dataCleaningSlice.actions;

export default dataCleaningSlice.reducer;