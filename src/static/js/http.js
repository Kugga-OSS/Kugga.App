import { MessageBox, Message } from 'element-ui'

var axios = require("axios");
axios.defaults.withCredentials=true

const http = axios.create({
    baseURL: "http://localhost:5555",
    timeout: 5000
})

http.interceptors.request.use(
    config => {
        if (localStorage && localStorage.token) {
            config.headers['authentication'] = localStorage.token;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status && String(res.status) !== "200") {
            Message({
                message: res.data.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message));
        } else {
            return res;
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default http