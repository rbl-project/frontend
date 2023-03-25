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
    basic_info_req_status: REQUEST_STATUS_IDLE,
    message: null,
    dataset_name: "",
    n_columns: 0,
    n_rows: 0,
    columns: [],
    head: [],
    desc_num_cols_req_status: REQUEST_STATUS_IDLE,
    describe_numerical_data: [],
    desc_cat_cols_req_status: REQUEST_STATUS_IDLE,
    describe_categorical_data: [],
    graph_rep_req_status: REQUEST_STATUS_IDLE,
    n_categorical_columns: -1,
    n_numerical_columns: -1,
    percent_categorical_columns: 0,
    percent_numerical_columns: 0,
    numerical_vs_categorical_pie_chart: [],
    n_values: 0, // Total no of values in the dataset i.e. n_rows*n_columns
    n_null_values: 0,
    n_non_null_values: 0,
    percent_null_values: 0,
    percent_non_null_values: 0,
    non_null_vs_null_pie_chart: [],
}

export const getBasicInformation = createAsyncThunk('/basic-information', async (dataset_name) => {
    const response = await API.getBasicInformation({ dataset_name: dataset_name });
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getDescribeNumericalData = createAsyncThunk('/describe-numerical-data', async (dataset_name) => {
    const response = await API.getDescribeNumericalData({ dataset_name: dataset_name });
    return response.data; // response.data is your entire object that is seen in postman as the response
});
export const getDescribeCategoricalData = createAsyncThunk('/describe-categorical-data', async (dataset_name) => {
    const response = await API.getDescribeCategoricalData({ dataset_name: dataset_name });
    return response.data; // response.data is your entire object that is seen in postman as the response
});
export const getGraphicalRepresentation = createAsyncThunk('/graphical-representation', async (dataset_name) => {
    const response = await API.getGraphicalRepresentation({ dataset_name: dataset_name });
    return response.data; // response.data is your entire object that is seen in postman as the response
});


const datasetOverviewSlice = createSlice({
    name: "datasetOverview",
    initialState: initialState,
    reducers: {
        resetRequestStatus:(state,action) => {
            state.basic_info_req_status = REQUEST_STATUS_IDLE;
            state.desc_num_cols_req_status = REQUEST_STATUS_IDLE;
            state.desc_cat_cols_req_status = REQUEST_STATUS_IDLE;
            state.graph_rep_req_status = REQUEST_STATUS_IDLE;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Get Basic Information
            .addCase(getBasicInformation.pending, (state, action) => {
                console.log(" GetBasicInfo Loading");
                state.basic_info_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getBasicInformation.fulfilled, (state, action) => { // action.payload is the response.data
                console.log(" GetBasicInfo Fulfilled",action.payload);
                if (action.payload.status) {
                    state.dataset_name = action.payload.data.dataset_name;
                    state.n_columns = action.payload.data.n_columns;
                    state.n_rows = action.payload.data.n_rows;
                    state.columns = action.payload.data.columns;
                    state.head = action.payload.data.head;
                    state.basic_info_req_status = REQUEST_STATUS_SUCCEEDED;
                } else {
                    state.basic_info_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getBasicInformation.rejected, (state, action) => {
                console.log(" GetBasicInfo Rejected",action.payload);
                state.basic_info_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Get Describe Numerical Data
            .addCase(getDescribeNumericalData.pending, (state, action) => {
                state.desc_num_cols_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getDescribeNumericalData.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.describe_numerical_data = action.payload.data.columns;
                    state.n_numerical_columns = action.payload.data.n_numerical_columns;
                    state.n_categorical_columns = action.payload.data.n_categorical_columns;
                    state.desc_num_cols_req_status = REQUEST_STATUS_SUCCEEDED;
                } else {
                    state.desc_num_cols_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getDescribeNumericalData.rejected, (state, action) => {
                state.desc_num_cols_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Get Describe Categorical Data
            .addCase(getDescribeCategoricalData.pending, (state, action) => {
                state.desc_cat_cols_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getDescribeCategoricalData.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.describe_categorical_data = action.payload.data.columns;
                    state.n_numerical_columns = action.payload.data.n_numerical_columns;
                    state.n_categorical_columns = action.payload.data.n_categorical_columns;
                    state.desc_cat_cols_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.desc_cat_cols_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getDescribeCategoricalData.rejected, (state, action) => {
                state.desc_cat_cols_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })

            // Get Graphical Representation
            .addCase(getGraphicalRepresentation.pending, (state, action) => {
                state.graph_rep_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getGraphicalRepresentation.fulfilled, (state, action) => { // action.payload is the response.data
                if (action.payload.status) {
                    state.n_values = action.payload.data.n_values;
                    state.n_null_values = action.payload.data.n_null_values;
                    state.n_non_null_values = action.payload.data.n_non_null_values;
                    state.percent_null_values = action.payload.data.percent_null_values;
                    state.percent_non_null_values = action.payload.data.percent_non_null_values;
                    state.non_null_vs_null_pie_chart = action.payload.data.non_null_vs_null_pie_chart;
                    state.n_columns = action.payload.data.n_columns;
                    state.n_numerical_columns = action.payload.data.n_numerical_columns;
                    state.n_categorical_columns = action.payload.data.n_categorical_columns;
                    state.percent_categorical_columns = action.payload.data.percent_categorical_columns;
                    state.percent_numerical_columns = action.payload.data.percent_numerical_columns;
                    state.numerical_vs_categorical_pie_chart = action.payload.data.numerical_vs_categorical_pie_chart;
                    state.graph_rep_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.graph_rep_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error; // error sent by us from our backend
                }
            })
            .addCase(getGraphicalRepresentation.rejected, (state, action) => {
                state.graph_rep_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


    }
});

export const {resetRequestStatus } = datasetOverviewSlice.actions;

export default datasetOverviewSlice.reducer;