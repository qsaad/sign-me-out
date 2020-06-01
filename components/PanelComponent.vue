<template>
    <!-- <v-container fluid fill-height class="pa-0 ma-0">
        <v-layout column justify-center align-center> 
           <v-flex xs12 sm10 md8> -->
               <div>
                <v-toolbar color="black" dark dense>
                    <v-spacer></v-spacer>
                    <v-icon medium left class="pa-0 ma-0">{{icon}}</v-icon>
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items justify-end align-center>
                        <slot name="toolbar"></slot>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card class="pa-0 ma-0">
                    <slot name="float"></slot>
                    <v-card-text class="pa-0 ma-0">
                        <slot name="dialog"></slot>
                        <slot></slot>
                    </v-card-text>
                    <v-card-actions>
                        <slot name="actions"></slot>
                    </v-card-actions>
                </v-card>
                </div>
            <!-- </v-flex> 
        </v-layout>
    </v-container> -->
</template>

<script>
export default {
    name:'PanelComponent',
    //props:['icon','title','isBtn','btnIcon','btnLink'],
    props:{
        icon: {type: String,default: ''},
        title: {type: String,default: ''},
        // isBtn: {type: Boolean,default: false},
        // btnIcon: {type: String,default: 'create'},
        // filePath: {type: String,default: '/edit'},
    },
    data(){
        return{
           
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

}//EXPORT DEFAULT
</script>

<style scoped>

</style>