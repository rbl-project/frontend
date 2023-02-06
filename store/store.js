import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import globalStateSlice from "./globalStateSlice";
import state1Slice from "./stateSlice";
import state2Slice from "./stateSlice2";
import authSlice from "./authSlice";
import datasetSlice from "./datasetSlice";
import datasetOverviewSlice from "./datasetOverviewSlice";
import dataCorrelationSlice from "./dataCorrelationSlice";

const combineReducer = combineReducers({
    global:globalStateSlice,
    state1:state1Slice,
    state2:state2Slice,
    auth:authSlice,
    dataset:datasetSlice,
    datasetOverview:datasetOverviewSlice,
    dataCorrelation:dataCorrelationSlice
});

export const makeStore = () => configureStore({reducer:combineReducer});

export const wrapper = createWrapper(makeStore);