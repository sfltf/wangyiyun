import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
//import { Promise } from 'core-js';
const _self = this;
console.log(this)
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(function (config) {
    if (Cookies.get('wyy_uid')) {
        return config;
    } else {
        router.replace({
            path: '/login',
            query: { redirect: router.fullPath }
        })
    }
}, function (err) {
    return Promise.reject(err);
})
let request = (config) => {
    return axios(config);
};
export default request;