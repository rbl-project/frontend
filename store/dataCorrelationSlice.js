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
    checked_columns: [],
    num_cols_req_status: REQUEST_STATUS_IDLE,
    n_numerical_columns: 0,
    numerical_columns: [],
    corr_matrix_req_status: REQUEST_STATUS_IDLE,
    column_list: [],
    correlation_matrix: [],
    scatter_plot_req_status: REQUEST_STATUS_IDLE,
    scatter_plot: null,
    heatmap_req_status: REQUEST_STATUS_IDLE,
    heatmap: null,
}

export const getNumericalColumns = createAsyncThunk('/numerical-columns', async (formData) => {
    const response = await API.getNumericalColumns(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getCorrelationMatrix = createAsyncThunk('/correlation-matrix', async (formData) => {
    const response = await API.getCorrelationMatrix(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getScatterPlot = createAsyncThunk('/scatter-plot', async (formData) => {
    const response = await API.getScatterPlot(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getCorrelationHeatmap = createAsyncThunk('/correlation-heatmap', async (formData) => {
    const response = await API.getCorrelationHeatmap(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});


const dataCorrelationSlice = createSlice({
    name: "dataCorrelation",
    initialState: initialState,
    reducers: {
        resetRequestStatus: (state, action) => {
            state.num_cols_req_status = REQUEST_STATUS_IDLE;
            state.corr_matrix_req_status = REQUEST_STATUS_IDLE;
            state.scatter_plot_req_status = REQUEST_STATUS_IDLE;
            state.heatmap_req_status = REQUEST_STATUS_IDLE;
            state.message = null;
        },
        setCheckedColumnsRedux: (state, action) => {
            state.checked_columns = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

            // Get Numerical Columns
            .addCase(getNumericalColumns.pending, (state, action) => {
                state.num_cols_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getNumericalColumns.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.n_numerical_columns = action.payload.data.n_numerical_columns;
                    state.numerical_columns = action.payload.data.numerical_columns;
                    state.num_cols_req_status = REQUEST_STATUS_SUCCEEDED;
                } else {
                    state.num_cols_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getNumericalColumns.rejected, (state, action) => {
                state.num_cols_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


            // Get Correlation Matrix
            .addCase(getCorrelationMatrix.pending, (state, action) => {
                state.corr_matrix_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getCorrelationMatrix.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.column_list = action.payload.data.column_list;
                    state.correlation_matrix = action.payload.data.correlation_matrix;
                    state.corr_matrix_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.corr_matrix_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getCorrelationMatrix.rejected, (state, action) => {
                state.corr_matrix_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            
            // Get Scatter Plot
            .addCase(getScatterPlot.pending, (state, action) => {
                state.scatter_plot_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getScatterPlot.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.scatter_plot = action.payload.data.scatter_plot;
                    state.scatter_plot_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.scatter_plot_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error // error sent by us from our backend
                }
            })
            .addCase(getScatterPlot.rejected, (state, action) => {
                state.scatter_plot_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            
            // Get Correlation Heatmap
            .addCase(getCorrelationHeatmap.pending, (state, action) => {
                state.heatmap_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getCorrelationHeatmap.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.heatmap = action.payload.data.heatmap;
                    state.heatmap_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.heatmap_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getCorrelationHeatmap.rejected, (state, action) => {
                state.heatmap_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

    }
});

export const { resetRequestStatus,setCheckedColumnsRedux } = dataCorrelationSlice.actions;

export default dataCorrelationSlice.reducer;