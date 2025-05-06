import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// ✅ 1. Attach Access Token in Request
Axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accesstoken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ 2. Handle 401 & Refresh Token in Response
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);

                    if (newAccessToken) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return Axios(originalRequest); // ✅ Retry the original request
                    }
                } catch (refreshError) {
                    console.error("Refresh failed", refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

// 🔁 Refresh Access Token API
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });

        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem('accesstoken', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Unable to refresh token:", error);
        return null;
    }
};

export default Axios;



// import axios from "axios";
// import SummaryApi , { baseURL } from "../common/SummaryApi";

// const Axios = axios.create({
//     baseURL : baseURL,
//     withCredentials : true
// })

// //sending access token in the header
// Axios.interceptors.request.use(
//     async(config)=>{
//         const accessToken = localStorage.getItem('accesstoken')

//         if(accessToken){
//             config.headers.Authorization = `Bearer ${accessToken}`
//         }

//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )

// //extend the life span of access token with 
// // the help refresh
// Axios.interceptors.request.use(
//     (response)=>{
//         return response
//     },
//     async(error)=>{
//         let originRequest = error.config 

//         if(error.response.status === 401 && !originRequest.retry){
//             originRequest.retry = true

//             const refreshToken = localStorage.getItem("refreshToken")

//             if(refreshToken){
//                 const newAccessToken = await refreshAccessToken(refreshToken)

//                 if(newAccessToken){
//                     originRequest.headers.Authorization = `Bearer ${newAccessToken}`
//                     return Axios(originRequest)
//                 }
//             }
//         }
        
//         return Promise.reject(error)
//     }
// )


// const refreshAccessToken = async(refreshToken)=>{
//     try {
//         const response = await Axios({
//             ...SummaryApi.refreshToken,
//             headers : {
//                 Authorization : `Bearer ${refreshToken}`
//             }
//         })

//         const accessToken = response.data.data.accessToken
//         localStorage.setItem('accesstoken',accessToken)
//         return accessToken
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default Axios