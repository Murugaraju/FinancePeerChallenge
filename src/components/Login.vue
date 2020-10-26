<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login to FinacePeer</v-toolbar-title>
                <v-spacer></v-spacer>
                
               
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="mdi-account" v-model="username" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field id="password" @keyup.enter="login({username,password})" v-model="password" prepend-icon="mdi-lock" name="password" label="Password" type="password"></v-text-field>
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login({username,password})"   :loading="loading" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// "

import {mapGetters,mapActions} from 'vuex';
import axob from '../axio';
  export default {
    data: () => ({
      drawer: null,
      username:null,
      password:null
    }),
    computed:{
        ...mapGetters('Loginstore',['loading'])
    },
    methods:{
        ...mapActions('Loginstore',['login']),
        check(){
          axob.get('/sample/')
        }
    },
    props: {
      source: String
    }
    ,watch:{
        loading(n,o){
            console.log('printing new and old',n,o)
        },
    destroyed(){
      console.log("came in destroyed")
      this.$notification['success']({
        message:'Successfully loggedin'
      })
    },
    mounted(){
      console.log("I am in mounted")
    }
    }
  }
</script>