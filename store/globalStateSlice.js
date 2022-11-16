import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openSidebar: false 
}

const stateSlice = createSlice({
    name:"global",
    initialState:initialState,
    reducers:{
        toggleSidebar:(state) => {
            state.openSidebar = !state.openSidebar;
        },
    }
});

export const {toggleSidebar} = stateSlice.actions;

export default stateSlice.reducer;