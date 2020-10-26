import Vuex from 'vuex';
import Vue from 'vue';
import {Loginstore} from './loginstore';
import {DataStore} from './datastore';
Vue.use(Vuex)

export const logout=()=>{localStorage.removeItem('token');
localStorage.removeItem('username')
}
export const store = new Vuex.Store({
    modules:{
        Loginstore,
        DataStore
    }
})