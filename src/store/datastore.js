import axob from '../axio';

const state={
    status:0,
    data:[],
    error:{},
    loading:false
}

const getters ={
    status:state=>state.status,
    data:state=>state.data,
    error:state=>state.error,
    loading:state=>state.loading
}

const actions={
    loadData({commit}){
        commit('setLoading');
        axob.get('/api/data').then(res=>{
            commit('setData',res.data);
            commit('resetLoading');
        }).catch(er=>{
            let error=er.response
            console.log("Error is",error)
        })
    },
    deleteData({commit},id){
        commit('setLoading');
        axob.delete('/api/data/'+id).then(res=>{
            res
            // commit('setData')
            commit('resetLoading');

        }).catch(er=>{
            let error=er.response
            commit('resetLoading',error);
            
            
        })
    }

}

const mutations={
 setLoading(state){
        state.loading=true
    },
    resetLoading(state){
        state.loading=false
    },
    setData(state,data){
        console.log("checking the data----->",data)
        state.data=data
    },
    resetStatus(state,status){
            state,status
    }
}





export const DataStore={
    namespaced:true,
    state,
    getters,
    actions,
    mutations

}