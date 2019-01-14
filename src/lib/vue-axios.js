import axios from 'axios';
import {Message} from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 设置axios拦截器
// 修改请求的设置
axios.interceptors.request.use(config=>{
    // 判断请求的是login还是其他url
    // console.log(config)
    if(config.url.indexOf('login') != -1){
        // 登录接口
    }else{
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
},error => {
    return Promise.reject(error);
})

// 响应回来后，会触发这个函数
axios.interceptors.response.use(response=>{
    if(response.data.meta.status === 200){
        // Message.success(response.data.meta.msg);
    } else if(response.data.meta.status === 400){
        Message.error(response.data.meta.msg);
    }
    return response;
},error=>{
    return Promise.reject(error);
})

export default {
    // 写vue的插件
    install(Vue){
        Vue.prototype.$axios = axios;
    }
}