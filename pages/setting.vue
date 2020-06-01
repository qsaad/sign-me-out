<template>
  <panel-component icon="settings" title="SETTING">
          <v-layout column justify-center align-center fill-height class="text-xs-center">
            <v-flex>
             Edit Setting
            </v-flex>
          </v-layout>
  </panel-component>
</template>

<script>
import PanelComponent from '@/components/PanelComponent.vue'

export default {
  middleware:['auth'],
  mixins:[],
  components:{PanelComponent},
  data(){
    return{
  
    }//RETURN
  },//DATA
  asyncData({store}){
      return {
          
      }
    },//ASYNCDATA
  created(){

  },//CREATED
  mounted(){

  },//MOUNTED
  computed:{
    
  },//COMPUTED
  methods:{
   
  }//METHODS
}
</script>
