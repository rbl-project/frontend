import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openSidebar: false,
    openMenuItem:"", 
}

const stateSlice = createSlice({
    name:"global",
    initialState:initialState,
    reducers:{
        toggleSidebar:(state) => {
            state.openSidebar = !state.openSidebar;
        },
        setOpenMenuItem:(state,action) => {
            state.openMenuItem = action.payload;
        }
    }
});

export const {toggleSidebar,setOpenMenuItem} = stateSlice.actions;

export default stateSlice.reducer;