<template>
    <div>
     <v-overlay
     :value="loading"
     >

     </v-overlay>
     <v-navigation-drawer
      v-model="drawer"
      app
      id="navigation-drawer"
    >
    <v-list>
        <v-list-item>

        </v-list-item>
    </v-list>
    <v-divider></v-divider>
      <v-list dense>
         

        <v-list-item class="actclass"  link :to="'/Dashboard'">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>FinancePeer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
          <template v-slot:activator="{on,attrs}">
              <v-btn v-on="on" v-bind="attrs" text @click="logout" color="white" fab>
                <v-icon>
                    mdi-logout
                </v-icon>
             </v-btn>
              
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>

    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    name:"Navbar",
    data:()=>{ return{
          drawer: null,
    }
    },
    computed:{
      ...mapGetters('Loginstore',['loading'])
    },
    props: {
      source: String,
    },
    methods:{
        ...mapActions('Loginstore',['logout'])
    }
}
</script>

<style scoped>
  #navigation-drawer{
    right-margin:0
  }
  .actclass{
      background:#b6b0eb;
      color: green
  }
</style>