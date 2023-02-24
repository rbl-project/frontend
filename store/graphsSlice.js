import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE,
    CUSTOM_ERROR_MESSAGE
} from "../constants/Constants";

import * as API from "../api";

const initialBlankGraph = {
    line: "",
    scatter: "",
    bar: "",
    hist: "",
    density: "",
    hexbin: "",
    pie: "",
    box: "",
}

const initialState = {
    n_numerical_columns: 0,
    numerical_columns: [],
    num_cols_req_status: REQUEST_STATUS_IDLE,
    n_categorical_columns: 0,
    categorical_columns: [],
    cat_cols_req_status: REQUEST_STATUS_IDLE,
    graph_type: "",
    graph: initialBlankGraph,
    graph_req_status: REQUEST_STATUS_IDLE,
}

export const getNumericalColumnsInfo = createAsyncThunk('/get-numerical-columns-info', async (formData) => {
    const response = await API.getNumericalColumnsInfo(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const getCategoricalColumnsInfo = createAsyncThunk('/get-categorical-columns-info', async (formData) => {
    const response = await API.getCategoricalColumnsInfo(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const generateGraph = createAsyncThunk('/generate-graph', async (formData) => {
    const response = await API.generateGraph(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});


const graphsSlice = createSlice({
    name: "graphs",
    initialState: initialState,
    reducers: {
        resetRequestStatus: (state, action) => {
            state.num_cols_req_status = REQUEST_STATUS_IDLE;
            state.cat_cols_req_status = REQUEST_STATUS_IDLE;
            state.graph_req_status = REQUEST_STATUS_IDLE;
            state.message = null;
        },
        resetGraphState: (state, action) => {
            state.graph = initialBlankGraph;
            state.graph_type = ""
        }
    },
    extraReducers: (builder) => {
        builder

            // Get Numerical Columns Info
            .addCase(getNumericalColumnsInfo.pending, (state, action) => {
                state.num_cols_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getNumericalColumnsInfo.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.n_numerical_columns = action.payload.data.n_numerical_columns;
                    state.numerical_columns = action.payload.data.numerical_columns;
                    state.num_cols_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.num_cols_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error // error sent by us from our backend
                }
            })
            .addCase(getNumericalColumnsInfo.rejected, (state, action) => {
                state.num_cols_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


            // Get Categorical Columns Info
            .addCase(getCategoricalColumnsInfo.pending, (state, action) => {
                state.cat_cols_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(getCategoricalColumnsInfo.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.n_categorical_columns = action.payload.data.n_categorical_columns;
                    state.categorical_columns = action.payload.data.categorical_columns;
                    state.cat_cols_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.cat_cols_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error // error sent by us from our backend
                }
            })
            .addCase(getCategoricalColumnsInfo.rejected, (state, action) => {
                state.cat_cols_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


            // Generate Graph
            .addCase(generateGraph.pending, (state, action) => {
                state.graph_req_status = REQUEST_STATUS_LOADING;
            })
            .addCase(generateGraph.fulfilled, (state, action) => { // action.payload.data is the response.data
                if (action.payload.status) {
                    state.graph_type = action.payload.data.graph_type;
                    state.graph[action.payload.data.graph_type] = action.payload.data.graph;
                    state.graph_req_status = REQUEST_STATUS_SUCCEEDED;
                }
                else {
                    state.graph_req_status = REQUEST_STATUS_FAILED;
                    state.message = action.payload.error // error sent by us from our backend
                }
            })
            .addCase(generateGraph.rejected, (state, action) => {
                state.graph_req_status = REQUEST_STATUS_FAILED;
                state.message = CUSTOM_ERROR_MESSAGE; // unknow error in request
            })


    }
});

export const { resetRequestStatus, resetGraphState } = graphsSlice.actions;

export default graphsSlice.reducer;