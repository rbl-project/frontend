import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    data:{}
}

const stateSlice = createSlice({
    name:"state1",
    initialState:initialState,
    reducers:{
        increment:(state,action) => {
            state.count++;
        },
        decrement:(state,action) => {
            state.count--;
        }
    }
});

export const {increment,decrement} = stateSlice.actions;

export default stateSlice.reducer;