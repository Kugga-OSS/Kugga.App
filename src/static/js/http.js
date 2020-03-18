var axios = require("axios");
axios.defaults.withCredentials=true
const http = axios.create({
    baseURL: "http://localhost:1080"
})

// 设置拦截器
// http.interceptors.response.use(res => {
//     return res;
// }, err => {
//     Vue.prototype.$message({
//         type: "error",
//         message: err.response.data.message, 
//     })
//     if (err.response.data.status === 401) {
//         router.push("/login");
//     }
//     return Promise.reject(err);
// });

// 请求头上加入token 
// http.interceptors.request.use(function (config) {
//     config.headers.Authorization = "Bearer " + localStorage.token;
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// })

export default http