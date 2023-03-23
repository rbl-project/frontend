import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openSidebar: false,
    openMenuItem: "",
    openModal: false,
    modalTabIndex: 0,
    openGlobalDataRepresentation: false
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
        },
        setOpenGlobalDataRepresentation: (state, action) => {
            state.openGlobalDataRepresentation = action.payload;
        }
    }
});

export const { toggleSidebar, setOpenMenuItem, setOpenModal, setCloseModal,setModalTabIndex,setOpenGlobalDataRepresentation } = stateSlice.actions;

export default stateSlice.reducer;