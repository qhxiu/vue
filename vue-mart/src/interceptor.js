//用于拦截请求和响应,不用每次发请求的时候必须把请求头放在里面
const axios = require('axios');

export default function (vm) {
    //设置请求拦截器 在请求被then或catch处理前拦截它们
    axios.interceptors.request.use(config => {
        //在发送请求之前做些什么
        const token = localStorage.getItem('token');
        //如果存在令牌则添加token请求头
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }, response => {
        //对请求错误做些什么
    });
    //响应拦截器
    //参数1表示成功响应
    //这里只关心失败响应
    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) { // 没有登录或者令牌过期
            //清空vuex和localStorage
            vm.$store.dispatch('logout');
            //跳转login
            vm.$router.push('/login');
        }
        return Promise.reject(err);
    })
}