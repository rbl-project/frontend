import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openSidebar: false,
    openMenuItem: "",
    openModal: false,
    modalTabIndex: 0,
}

const stateSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.openSidebar = !state.openSidebar;
        },
        setOpenMenuItem: (state, action) => {
            state.openMenuItem = action.payload;
        },
        setOpenModal: (state, action) => {
            state.openModal = true;
        },
        setCloseModal: (state, action) => {
            state.openModal = false;
        },
        setModalTabIndex: (state, action) => {
            state.modalTabIndex = action.payload;
        }
    }
});

export const { toggleSidebar, setOpenMenuItem, setOpenModal, setCloseModal,setModalTabIndex } = stateSlice.actions;

export default stateSlice.reducer;