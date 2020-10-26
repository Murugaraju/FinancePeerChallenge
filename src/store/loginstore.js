
import axob from '../axio';
import router from '../router/index';
import {logout} from '../store/index';
import {message} from 'ant-design-vue';


let isAuthenticated=false;

if (localStorage.getItem('token')!= undefined && localStorage.getItem('token')!=null){
  
    isAuthenticated=true
}
const state={
    isAuthenticated:isAuthenticated,
    status:0,
    loading:false,
    data:{} ,//always the api success 2xx response,
    error:{} //always the api 4xx and 5xx response
    
}


const getters={
    //mapping all state keys to respective components getters or extent of data of the componet
    isAuthenticated:state=>state.isAuthenticated,
    status:state=>state.status,
    loading:state=>state.loading
    
   
}



const actions={
    login({commit},credentials){
        console.log("printing the context",commit)
        console.log("printing data",credentials)
        commit('setLoading');
        axob.post('/authenticate/',credentials).then(
            res=>{
                console.log("printing success",res)
                commit('success',res.data,res.status)
                commit('resetLoading');
                console.log("hurray")
                message.success('Successfully loggedin')

           
                
            }
        ).catch(
            er=>{
                console.log(er)
                commit('resetLoading');
            }
        )
    },
    logout({commit}){
        axob.get('/logout/').then(res=>{
                    console.log('loggedout',res)
            commit('loggingout')
            message.warning('Successfully loggedout')

            router.push('/Login')

        }).catch((er)=>{
            console.log('error occured',er)
        })
    },
}



const mutations={
    setLoading(state){
        state.loading=true
    },
    resetLoading(state){
        state.loading=false
    },
    success(state,data,status){
        state.isAuthenticated=true;
        state.status=status;
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',data.username)
        router.push('/Dashboard')
        
    },
    loggingout(state){
        state.isAuthenticated=false;
        console.log('came in logged out')
        logout();
    }
}



export const Loginstore= {
namespaced:true,

state,
getters,
actions,
mutations
}