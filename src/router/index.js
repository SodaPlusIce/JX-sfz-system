import Vue from 'vue'   //引入Vue
import VueRouter from 'vue-router'  //引入vue-router
import Login from "@/components/Login"
 import App from "../App.vue"

Vue.use(VueRouter)  //Vue全局使用Router
 
const routes= [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
    //登录界面
      path: '/login',         //链接路径
      name: 'login',     //路由名称，
      component: Login  //对应的组件模板
    },
    //社防部界面
    {
      path:'/social-defense-department',
      name:'sfb',
      component:App
    }
]

const router = new VueRouter({
    routes
})

export default router