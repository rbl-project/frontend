import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import globalStateSlice from "./globalStateSlice";
import authSlice from "./authSlice";
import datasetSlice from "./datasetSlice";
import datasetOverviewSlice from "./datasetOverviewSlice";
import dataCorrelationSlice from "./dataCorrelationSlice";
import graphicalRepresentationSlice from "./graphicalRepresentationSlice";
import tabularRepresentationSlice from "./tabularRepresentationSlice";
import missingValueImputationSlice from "./missingValueImputationSlice";
import dataCleaningSlice from "./dataCleaningSlice";
import datasetUpdateSlice from "./datasetUpdateSlice";
import dataDiscretizationSlice from "./dataDiscretizationSlice";
import featureEncodingSlice from "./featureEncodingSlice";
import dataTransformationSlice from "./dataTransformationSlice";

const combineReducer = combineReducers({
    global:globalStateSlice,
    auth:authSlice,
    dataset:datasetSlice,
    datasetOverview:datasetOverviewSlice,
    dataCorrelation:dataCorrelationSlice,
    graphicalRepresentation:graphicalRepresentationSlice,
    tabularRepresentation:tabularRepresentationSlice,
    missingValueImputation:missingValueImputationSlice,
    dataCleaning:dataCleaningSlice,
    datasetUpdate:datasetUpdateSlice,
    dataDiscretization:dataDiscretizationSlice,
    featureEncoding:featureEncodingSlice,
    dataTransformation:dataTransformationSlice,
});

export const makeStore = () => configureStore({reducer:combineReducer});

export const wrapper = createWrapper(makeStore);