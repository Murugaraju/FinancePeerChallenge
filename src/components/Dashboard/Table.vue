<template>
<div>
    <v-overlay 
    :value="loading"
    >

    </v-overlay>
     <v-dialog
      v-model="dialog"
      
      width="400"
      >
          <v-card>
        <v-card-title class="headline grey lighten-2">
          Are you sure, you want delete?
        </v-card-title>

        

        

        <v-card-actions>
            
          <v-spacer></v-spacer>
           <v-btn
            color="red"
            
            @click="deleted"
          >
           Yes
          </v-btn>
          <v-btn
            color="green"
            
            @click="dialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>

      </v-dialog>

  <v-simple-table height="70%">
     
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            <h2>UserId</h2>
          </th>
          <th class="text-center" >
            <h2>Title</h2>
          </th>
          <th class="text-center">
            <h2>Body</h2>
          </th>
          <th class="text-center" width="10%">
             
            
          </th>


        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.name"
          class="customtr"
          @mouseenter="hover=item.id"
          @mouseleave="hover=false"
        >
          <td class="text-left"  >{{ item.userId }}</td>
          <td class="text-left" >{{ item.title }}</td>
          <td class="text-left" >{{ item.body }}</td>
          <td class="text-right"  width="10%">
               <v-row v-if="hover==item.id"  class="pr-1">
                   
                  <v-spacer></v-spacer>
                   

                 <v-tooltip
                   bottom>
                   <template v-slot:activator="{on,attrs}">
                       <v-btn fab text
                   x-small
                   v-on="on"
                   v-bind="attrs"
                   @click="itemSelected(item.id)"
                   >
                      <v-icon>
                          mdi-delete
                      </v-icon>
                  </v-btn>

                   </template>

                   <span>delete</span>
                   
                   </v-tooltip>
              </v-row>
          </td>


        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
  export default {
      name:'Table',
   
    data () {
      return {
        hover:false,
        dialog:false,
        currentId:null
       
        
      }
    },
     computed:{
      ...mapGetters('DataStore',['loading','data','status'])

  },
  methods:{
      ...mapActions('DataStore',['loadData','deleteData']),
      deleted(){
          console.log("hover value",this.currentId)
          this.deleteData(this.currentId)
          this.loadData()
          this.dialog=false
          this.currentId=null
      },
      itemSelected(id){
          this.currentId=id,
          this.dialog=true
      },
      
     

  },
  mounted(){
      console.log("Loaded data")
      this.loadData();
      
  }
  }
 
  
</script>
<style  scoped>
.customtr:hover{
box-shadow: 0px 1px 1px 1px black;
background-color: green;
cursor:pointer;
z-index:1;
}
</style>
