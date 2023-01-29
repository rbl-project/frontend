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

// Dataset I/O APIs
export const uploadDataset = ({dataset,updateProgress}) => API.post("/upload-dataset", {dataset:dataset}, {
    headers: { "Content-Type": "multipart/form-data" }, 
    onUploadProgress: updateProgress
});
export const getAllDatasets = () => API.get("/get-datasets");
export const exportDataset = (formData) => API.post("/export-dataset",formData);
export const deleteDataset = (formData) => API.post("/delete-dataset",formData);
export const renameDataset = (formData) => API.post("/rename-dataset",formData);

// Datset Overview APIs
export const getBasicInformation = (formData) => API.post("/basic-information",formData);
export const getDescribeNumericalData = (formData) => API.post("/describe-numerical-data",formData);
export const getDescribeCategoricalData = (formData) => API.post("/describe-categorical-data",formData);
export const getGraphicalRepresentation = (formData) => API.post("/graphical-representation",formData);
