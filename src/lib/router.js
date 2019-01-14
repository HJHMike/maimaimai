import vue from 'vue';
import vueRouter from 'vue-router';

vue.use(vueRouter);

import login from '../components/login.vue';
import main from '../components/main.vue';
import users from '../components/users.vue';


// 写规则
let routes = [
    {
        path:'/',
        component : main,
        children:[
            {
                path:'users',
                component : users
            }
        ]
    },
    {
        path:'/login',
        component : login
    }
]

// 实例化
let router = new vueRouter({
    routes
})

// 导航守卫
router.beforeEach((to,from,next)=>{
    next();
    if(to.path === '/login'){
        next();
    }else{
        let token = window.sessionStorage.getItem('token')
        if(token){
            next();
        }else{
            vue.prototype.$message.error('请先登录');
            next('/login');
        }
    }
})

// 暴露出去
export default router;