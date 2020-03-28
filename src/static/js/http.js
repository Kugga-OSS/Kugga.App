import { MessageBox, Message } from 'element-ui'
import router from '../../router/index'

var axios = require("axios");
axios.defaults.withCredentials=true

// 这里的应该是从配置中读出来的，但是暂时不知道怎么做
const http = axios.create({
    baseURL: "http://localhost:5555",
    timeout: 5000
})

http.interceptors.request.use(
    config => {
        if (localStorage && localStorage.token) {
            config.headers['Authentication'] = localStorage.token;
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
        const res = response ? response.data : null;
        if (!res || (res && res.status && String(res.status) !== "200")) {
            if (String(res.status) === "401") {
                localStorage.clear();
                router.push({name : "login"});
                Message({
                    message: res.data.message || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(new Error(res.message));
            } else if (res && res.data && res.data.message) {
                Message({
                    message: res.data.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            } else {
                Message({
                    message: '请求失败',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject(new Error("请求失败"));
        } else {
            return res;
        }
    },
    error => {
        console.log('err ' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default http