import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await api.fetchPosts();
    return response.data
})

const stateSlice = createSlice({
    name:"state2",
    initialState:initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

    }
});


export default stateSlice.reducer;