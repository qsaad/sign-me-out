<template>
  <v-parallax
    height="100%"
    width ="100%"
    dark
    src="/landing.jpg"
  >

  
  <v-layout column align-center justify-center  fill-height>
    <!-- TITLE -->
    {{loadData}}
    <v-flex xs12 sm10 md8 class="pa-0 ma-0">
          <v-avatar size="200" class="hidden-xs-only">
            <img src="/icon.png" alt="">
          </v-avatar>
          <v-avatar size="100" class="hidden-sm-and-up">
            <img src="/icon.png" alt="">
          </v-avatar>
    </v-flex>
    <v-flex xs12 sm10 md8 class="display-1 green--text font-weight-black ma-0 pa-0">
        SIGN ME OUT
    </v-flex>
    <v-flex xs12 sm10 md8 class="subheading teal--text">
      KEEP YOUR TEAM INFORMED
    </v-flex>
    <!-- GRID -->
    <v-flex xs12 sm10 md8 class="pa-0 ma-0">
      <v-layout row wrap justify-center align-center>
        <v-card v-for="item in featureList" :key="item.key" class=" pa-1 ma-2" width=175 tile hover dark>
          <v-card-title class="pa-0 text-xs-center" justify-center align-center>
            <v-layout row justify-center align-center class="text-xs-center">
              <v-icon size=48 color="red" class="hidden-xs-only">{{item.icon}}</v-icon>
              <v-icon size=24 color="red" class="hidden-sm-and-up">{{item.icon}}</v-icon>
            </v-layout>
          </v-card-title>
          <v-card-text class="headline yellow--text font-weight-black pa-0 text-xs-center hidden-xs-only">
            {{item.title}}
          </v-card-text>
          <v-card-text class="headline yellow--text pa-0 text-xs-center hidden-sm-and-up">
            {{item.title}}
          </v-card-text>
          <v-card-actions class="caption teal--text pa-0 hidden-xs-only">
            <v-layout row justify-center align-center class="text-xs-center">
              <v-flex>{{item.description}}</v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm10 md8> 
      <v-layout row justify-space-between>
        <v-flex class="ma-1">
          <v-btn color="primary" nuxt to="/login" block>
            Login
          </v-btn>
        </v-flex>
        <v-flex class="ma-1">
            <v-btn color="primary" nuxt to="/register" block>
              Register
            </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  </v-parallax>
</template>

<script>

export default {
  layout: 'landingLayout',
  middleware:[],
  mixins:[],
  components:{},
  data(){
    return{
        featureList : [
          {key : 1 , title : 'SIMPLE', description : 'Easy Navigation', icon:'thumb_up'},
          {key : 2 , title : 'SECURE', description : 'Complete Privacy protection', icon:'lock'},
          {key : 3 , title : 'SWIFT', description : 'Realtime updates', icon:'flash_on'},
          {key : 4 , title : 'WEB APP', description : 'Compatible on any device', icon:'smartphone'}
        ]
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
     loadData(){
       this.$store.dispatch('loadData') 
     },
     getData(){
       return this.$store.state.data
     }
  },//COMPUTED
  methods:{
  
  }//METHODS
}
</script>
<style scoped>

  /* body {
    background-image: url("landing.jpg");
    background-color: #cccccc;
  } */
</style>

