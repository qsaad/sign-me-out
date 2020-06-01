<template>
    <v-app dark>
        <v-content>
            <v-container fluid fill-height>
                <v-layout row wrap justify-center align-center fill-height>
                    <v-flex xs12 sm10 md8>
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
