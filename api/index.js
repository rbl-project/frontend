import axios from "axios";

const API = axios.create({baseURL:"https://jsonplaceholder.typicode.com"});

// //* Adding Authorization Token in req.headers
// API.interceptors.request.use((req)=>{
//     // if Profile Exists
//     if(localStorage.getItem("profile")){
//         const token = JSON.parse(localStorage.getItem("profile")).token;
//         req.headers.authorization = `Bearer ${token}`;
//     }
//     return req;
// })

export const fetchPosts = () => API.get("/todos");
