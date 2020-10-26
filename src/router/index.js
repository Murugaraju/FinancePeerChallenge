import Vue from 'vue';
import VueRouter from 'vue-router';
import P404 from '../views/P404.vue';
import Login from '../components/Login';
import {store} from '../store/index.js';
import Dashboard from '../components/Dashboard/Dashboard';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/Dashboard',
    name: 'Home',
    component: () => import('../components/Main.vue'),
    children:[
      {
        path:'Dashboard',
        name:'dashboard',
        component:Dashboard
      },
     
    ]
  },
  
  {
    path:'/Login',
    name:'login',
    component:Login,
    
  },
  {
    path:'/Pagenotfound',
    component:P404

  },
  {
    path:'**',
    redirect:'/Pagenotfound'
  }

]
console.log("printing process.env",process.env.BASE_URL)
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
// configuring router guard
router.beforeResolve((to,from,next)=>{
  // console.log("printing to------->",to)
  // console.log("printing from ----------->",from)
  // console.log("printing next --------->",next)
  console.log("store logging",store.getters['Loginstore/isAuthenticated'],store)
  
  let isAuthenticated=store.getters['Loginstore/isAuthenticated'];

  // if (localStorage.getItem('token')!= undefined && localStorage.getItem('token')!=null){
    
  //     isAuthenticate=true
  // }
  if (to.path!='/Login' && !isAuthenticated){
  next({name:'login'})

  }
  else if(to.path=='/Login' && isAuthenticated){
    next('/')
  }
 
  else{
    next()
  }
})

export default router
