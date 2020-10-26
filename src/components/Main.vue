<template>

    <v-app>
        <v-main>
            <Navbar/>
            <router-view></router-view>
        </v-main>

  </v-app>
</template>


<script>
import Navbar from './Navbar';
  export default {
      name: 'Main',
      components:{
          Navbar,
          
      }
    //
  }
</script>
