import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    data:{}
}

const stateSlice = createSlice({
    name:"state2",
    initialState:initialState,
    reducers:{
        increment2:(state,action) => {
            state.count++;
        },
        decrement2:(state,action) => {
            state.count--;
        }
    }
});

export const {increment2,decrement2} = stateSlice.actions;

export default stateSlice.reducer;