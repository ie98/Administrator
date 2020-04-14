import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import ShopKeeper from '../components/ShopKeeper.vue'
import Food from '../components/Food.vue'
import Case from '../components/Case.vue'
import AdminInfo from '../components/info/AdminInfo.vue'
import UserInfo from '../components/info/UserInfo.vue'
import RecordInfo from '../components/info/RecordInfo.vue'
import AddUser from '../components/add/AddUser.vue'
import EditUser from '../components/edit/EditUser.vue'
import AddAdmin from '../components/add/AddAdmin.vue'
import EditAdmin from '../components/edit/EditAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/shopKeeper',
    component: ShopKeeper
  },
  {
    path:'/admin',
    component: Admin,
    children:[
      {
        path:'/adminInfo' ,
        component:AdminInfo ,
        children:[
          {
            path:'/addAdmin',
            component:AddAdmin
          },
          {
            path:'/editAdmin',
            component:EditAdmin
          }
        ]
      },
      {
        path:'/userInfo',
        component:UserInfo,
        children:[
          {
            path:'/addUser',
            component:AddUser
          },
          {
            path:'/editUser/:user',
            component:EditUser
          }
        ]
      },
      {
        path:'/recordInfo',
        component:RecordInfo
      }
    ]
  },
  {
    path: '/food',
    component: Food
  },
  {
    path: '/case',
    component: Case
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //to是要去哪个页面
  //from是从哪个页面过来
  //next是一个函数表示放行
  //next 有两种用法
  //1. next() 表示直接放行 2.next('/login') 强制跳转到login
  if (to.path === '/login' ) return next()
  const bool = window.sessionStorage.getItem('token')
  if (!bool) return next('/login')
  if (to.path == '/admin') {
   if(window.sessionStorage.getItem('authority') == 'A') return next()
   else return next('/login')
  } 
  if (to.path == '/shopKeeper') {
    if(window.sessionStorage.getItem('authority') == 'B') return next()
    else return next('/login')
   } 
  next()
})

export default router
