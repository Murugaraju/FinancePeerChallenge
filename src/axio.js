import axios from 'axios';
import {store} from './store/index';
// import {mapActions} from 'vuex';


const axob = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // timeout: 1000,
    // headers: {
      // "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": "true",
      
    // }
  });

  
axob.interceptors.request.use(req=>{

  let token=''
  if (localStorage.getItem('token')!= undefined && localStorage.getItem('token')!=null){
    token=localStorage.getItem('token')
    req.headers.Authorization='Token '+token

  }

  console.log("printing request",req,`${req.method} ${req.url}`)
return req

});
axob.interceptors.response.use(res=>{

  console.log("printing the response",res)
  if(res.status==401){
store.dispatch('Loginstore/logout')

  }
  return res
},(reserror)=>{
console.log("response error ---------->",reserror.response.status)
// let a={...mapActions('Loginstore',['logout'])}
// console.log("I am liking it",a['logout'])
if(reserror.response.status==401){
store.dispatch('Loginstore/logout')

}
})
export default axob;
