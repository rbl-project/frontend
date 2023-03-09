import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import globalStateSlice from "./globalStateSlice";
import authSlice from "./authSlice";
import datasetSlice from "./datasetSlice";
import datasetOverviewSlice from "./datasetOverviewSlice";
import dataCorrelationSlice from "./dataCorrelationSlice";
import graphicalRepresentationSlice from "./graphicalRepresentationSlice";
import tabularRepresentationSlice from "./tabularRepresentationSlice";
import dataCleaningSlice from "./dataCleaningSlice";

const combineReducer = combineReducers({
    global:globalStateSlice,
    auth:authSlice,
    dataset:datasetSlice,
    datasetOverview:datasetOverviewSlice,
    dataCorrelation:dataCorrelationSlice,
    graphicalRepresentation:graphicalRepresentationSlice,
    tabularRepresentation:tabularRepresentationSlice,
    dataCleaning:dataCleaningSlice,
});

export const makeStore = () => configureStore({reducer:combineReducer});

export const wrapper = createWrapper(makeStore);