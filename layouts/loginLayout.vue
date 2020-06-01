<template>
    <v-app dark>
        <v-toolbar fixed app>
            <v-btn icon nuxt to="/">
                <v-icon >home</v-icon>
            </v-btn>
            
            <v-toolbar-title>
                <v-avatar>
                    <img src="\icon.png" alt="">
                </v-avatar>
            </v-toolbar-title>

        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout row justify-center align-center fill-height>
                <v-flex xs12>
                    <nuxt />
                </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app>
            <v-layout row wrap justify-center>
                <v-flex class="text-xs-center">
                    &copy; {{ new Date().getFullYear() }}
                </v-flex>
            </v-layout>
        </v-footer>
  </v-app>
</template>

<script>
export default {
    middleware:[],
    components:{},
    data () {
      return {
        title: 'SMO'
      }//RETURN
    },//DATA
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

<style scoped>

</style>


