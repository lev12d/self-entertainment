import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router';
import { Toast } from 'vant'

//响应时间
axios.defaults.timeout = 10000
//设置Post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true
//配置请求拦截器
const loading = (status) => {
     if(status){
        Toast.loading({
            mask:true,
            forbidClick:true,
            duration:0,
            message:'正在加载中...'
     })
     return ;
  }
  Toast.loading({
    mask:true,
    forbidClick:true,
    duration:1,
    message:'正在加载中...'
})
}
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    // const token = store.state.token;        
    // token && (config.headers.Authorization = token);
    loading(true)
    return config;
},
    error => Promise.error(error)
)

//配置响应拦截

axios.interceptors.response.use(response => {
    if (response.status === 200) {
        loading(false)
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
},
    error => {
        if (error.response.status) {
             switch (error.response.status) {
                      case 400:
                      Toast({
                          message: '请求失败，无效的关键字！',
                          duration: 1000,
                          forbidClick: true
                         });
                    break;
            //     case 401:
            //         router.replace({
            //             path: '/login',
            //             query: {
            //                 redirect: router.currentRoute.fullPath
            //             }
            //         })
            //         break;
            //     case 403:
            //         Toast({
            //             message: '登录过期，请重新登录',
            //             duration: 1000,
            //             forbidClick: true
            //         });
            //         // 清除token
            //         localStorage.removeItem('token');
            //         store.commit('loginSuccess', null);
            //         // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
            //         setTimeout(() => {
            //             router.replace({
            //                 path: '/login',
            //                 query: {
            //                     redirect: router.currentRoute.fullPath
            //                 }
            //             });
            //         }, 1000);
            //         break;
            //     // 404请求不存在
            //     case 404:
            //         Toast({
            //             message: '网络请求不存在',
            //             duration: 1500,
            //             forbidClick: true
            //         });
            //         break;

                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    })

/**
* get方法，对应get请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


