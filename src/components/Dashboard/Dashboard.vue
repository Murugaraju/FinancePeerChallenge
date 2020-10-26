<template>
  <v-row class="px-3">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <v-card>
      <v-toolbar
          dark
          color="primary"
        >
          
          <v-toolbar-title>Preview</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <Table/>

    </v-card>
    </v-dialog>
    <v-col cols="12">
      
      <a-upload-dragger
        name="file"
        :multiple="false"
       :showUploadList="false"
        :customRequest="upload"
        
      
        
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          Click or drag Json file to this area to upload Json file
        </p>
        <p class="ant-upload-hint">Upload single Json file</p>
      </a-upload-dragger>
    </v-col>
<v-row class="pr-6">
      <v-spacer></v-spacer>
      <v-btn color="green" @click="dialog=!dialog">ViewData</v-btn>
    </v-row>
  </v-row>
  
</template>
<script>
import axob from "../../axio";
import Table from './Table';
import {mapActions} from 'vuex';

export default {
  name: "Dashboard",
  components:{
    Table
  },
  data() {
    return {
     dialog:false
    };
  },
  methods: {
    ...mapActions('DataStore',['loadData',]),
   handlechange(e){
     console.log("printing change",e)
   },
    upload(e) {
      console.log('posting file')
      let f=new FormData()
      f.append('file',e.file)
      
      axob.post("/api/jsonupload", f).then(r=>{ r;
      
        this.$message.success(`${e.file.name} file uploaded successfully.`);
        this.loadData()

        return Promise.resolve()
      }).catch(er=>{
        er;
        this.$message.error(`${e.file.name} file upload failed.`);

      });
    },
  },
  watch: {
   
  },
};
</script>