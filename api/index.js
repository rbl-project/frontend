import axios from "axios";

const env = {
    "local": "http://127.0.0.1:8000/api",
    "prod": "https://rbl-project.onrender.com/api"
}

const API = axios.create({
    baseURL: env[process.env.NEXT_PUBLIC_CURRENT_ENV]
});

// //* Adding Authorization Token in req.headers
API.interceptors.request.use((req) => {
    // if Profile Exists
    if (localStorage.getItem("profile")) {
        const token = JSON.parse(localStorage.getItem("profile")).access_token;
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
})

// export const fetchPosts = () => API.get("https://jsonplaceholder.typicode.com/todos"); # RUN SEPERATELY

export const welcome = () => API.get("/");

// Authentication APIs
export const signIn = (formData) => API.post("/login", formData);
export const signOut = () => API.get("/logout");
export const signUp = (formData) => API.post("/register", formData);

// Dataset I/O and other utility APIs
export const uploadDataset = ({dataset,updateProgress}) => API.post("/upload-dataset", {dataset:dataset}, {
    headers: { "Content-Type": "multipart/form-data" }, 
    onUploadProgress: updateProgress
});
export const getAllDatasets = () => API.get("/get-datasets");
export const exportDataset = (formData) => API.post("/export-dataset",formData);
export const deleteDataset = (formData) => API.post("/delete-dataset",formData);
export const renameDataset = (formData) => API.post("/rename-dataset",formData);
export const getNumericalColumnsInfo = (formData) => API.post("/get-numerical-columns-info",formData);
export const getCategoricalColumnsInfo = (formData) => API.post("/get-categorical-columns-info",formData);
export const getColumnInfo = (formData) => API.post("/get-columns-info",formData);
export const searchCategoricalValues = (formData) => API.post("/search-categorical-value", formData)
export const saveChanges = (formData) => API.post("/save-changes",formData);
export const revertChanges = (formData) => API.post("/revert-changes",formData);
export const getMetaData = (formData) => API.post('/get-metadata', formData);

// Dataset Overview APIs
export const getBasicInformation = (formData) => API.post("/basic-information",formData);
export const getDescribeNumericalData = (formData) => API.post("/describe-numerical-data",formData);
export const getDescribeCategoricalData = (formData) => API.post("/describe-categorical-data",formData);
export const getGraphicalRepresentation = (formData) => API.post("/graphical-representation",formData);

// Data Correlation APIs
export const getNumericalColumns = (formData) => API.post("/numerical-columns",formData);
export const getCorrelationMatrix = (formData) => API.post("/correlation-matrix",formData);
export const getCorrelationHeatmap = (formData) => API.post("/correlation-heatmap",formData);
export const getScatterPlot = (formData) => API.post("/scatter-plot",formData);

// Graph APIs
export const generateGraph = (formData) => API.post("/generate-graph",formData);

// Tabular Representation APIs
export const getTabularRepresentation = (formData) => API.post("/filtered-tabular-representation",formData);
export const globalDataRepresentation = (formData) => API.post("/global-data-representation",formData);

// Missing Value Imputation APIs
export const getMissingValuePercentage = (formData) => API.post("/missing-value-percentage",formData);
export const imputeMissingValue = (formData) => API.post("/impute-missing-value",formData);

// Data Cleaning APIs
export const dropByColValue = (formData) => API.post("/drop-by-column-value",formData);
export const dropByNumericalValue = (formData) => API.post("/drop-by-numerical-value",formData);
export const dropByColName = (formData) => API.post("/drop-by-column-name",formData);
export const dropByRowIndex = (formData) => API.post("/drop-by-row-index",formData);
export const renameColumn = (formData) => API.post("/rename-column",formData);
export const findAndReplace = (formData) => API.post("/find-and-replace",formData);
export const changeDataType = (formData) => API.post("/change-data-type",formData);
export const changeColumnType = (formData) => API.post("/change-column-type",formData);

// Feature Encoding APIs
export const oneHotEncoding = (formData) => API.post("/one-hot-encoding",formData);
export const ordinalEncoding = (formData) => API.post("/ordinal-encoding",formData);
export const targetEncoding = (formData) => API.post("/target-encoding",formData);
export const binaryEncoding = (formData) => API.post("/binary-encoding",formData);
export const frequencyEncoding = (formData) => API.post("/frequency-encoding",formData);