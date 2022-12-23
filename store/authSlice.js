import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    REQUEST_STATUS_LOADING,
    REQUEST_STATUS_SUCCEEDED,
    REQUEST_STATUS_FAILED,
    REQUEST_STATUS_IDLE
} from "../constants/Constants";

import * as API from "../api";

const initialState = {
    authenticationStatus: REQUEST_STATUS_IDLE,
    registrationStatus: REQUEST_STATUS_IDLE,
    errorMessage: null
}

export const login = createAsyncThunk('auth/login', async (formData) => {
    const response = await API.signIn(formData);
    return response.data; // response.data is your entire object that is seen in postman as the response
});

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await API.signOut();
    return response.data;
});

export const register = createAsyncThunk('auth/register', async (formData) => { 
    const response = await API.signUp(formData);
    return response.data;
});

export const welcome = createAsyncThunk('auth/welcome', async () => {
    const response = await API.welcome();
    return response.data;
});


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

        // Login
        .addCase( login.pending, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( login.fulfilled, (state, action) => { // action.payload is the response.data
            if (action.payload.status) {

                state.authenticationStatus = REQUEST_STATUS_SUCCEEDED;
                state.errorMessage = null;

                localStorage.setItem("profile", JSON.stringify({ ...action.payload.data }));
            } else {
                state.authenticationStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = action.payload.error; // error sent by us from our backend
            }
        })
        .addCase( login.rejected, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_FAILED;
            state.errorMessage = action.error.message; // unknow error in request
        })

        // Logout
        .addCase( logout.pending, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( logout.fulfilled, (state, action) => { 
            if (action.payload.status) {

                state.authenticationStatus = REQUEST_STATUS_IDLE;
                state.errorMessage = null;

                localStorage.clear();
            } else {
                state.authenticationStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = action.payload.error;
            }
        })
        .addCase( logout.rejected, (state, action) => {
            state.authenticationStatus = REQUEST_STATUS_FAILED;
            state.errorMessage = action.error.message;
        })

        // Register
        .addCase( register.pending, (state, action) => {
            state.registrationStatus = REQUEST_STATUS_LOADING;
        })
        .addCase( register.fulfilled, (state, action) => {
            if (action.payload.status) {

                state.registrationStatus = REQUEST_STATUS_SUCCEEDED;
                state.errorMessage = null;
            } else {
                state.registrationStatus = REQUEST_STATUS_FAILED;
                state.errorMessage = action.payload.error;
            }
        })
        .addCase( register.rejected, (state, action) => {
            state.registrationStatus = REQUEST_STATUS_FAILED;
            state.errorMessage = action.error.message;
        })
    }

});

export default authSlice.reducer;