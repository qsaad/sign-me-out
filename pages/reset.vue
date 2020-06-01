<template>
    <panel-component icon="send" title="RESET PASSWORD">
        <slot>
            <v-layout column class="pa-2">
                    <v-flex xs12>
                        <v-text-field label="Email" v-model="email" clearable required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-btn color="primary" @click="reset" block>
                            Reset
                        </v-btn>
                    </v-flex>
            </v-layout>
        </slot>
        <slot name="actions">
            <v-layout column align-center class="text-xs-center">
                <v-flex>
                    <span class="caption teal--text">New user ?</span>
                    <span class="caption teal--text"><nuxt-link to="/register">Click here</nuxt-link></span>
                </v-flex>
                <v-flex>
                    <span class="caption teal--text">Already a user ?</span>
                    <span class="caption teal--text"><nuxt-link to="/login">Click Here</nuxt-link></span>
                </v-flex>
            </v-layout>
        </slot>
    </panel-component>
</template>

<script>
import firebase from 'firebase'
import PanelComponent from '@/components/PanelComponent.vue'
import Swal from 'sweetalert2'

export default {
    layout:'loginLayout',
    middleware:[],
    mixins:[],
    components:{PanelComponent},
    asyncData({store}){
        return {
            
        } 
        },//ASYNCDATA
    data(){
        return{
            email : ""
        }//RETURN
    },//DATA
    
    created(){

    },//CREATED
    mounted(){

    },//MOUNTED
    computed:{
    },//COMPUTED
    methods:{
        reset(){
            firebase.auth().sendPasswordResetEmail(this.email)
            .then(() => {
                Swal.fire({
                        type: 'info',
                        title: 'EMAIL SENT',
                        text: 'Check your email for password reset link',
                    })
                this.$router.replace('login');
            }
            )
             .catch(function(err) {
               Swal.fire({
                        type: 'warning',
                        title: 'ACCOUNT NOT FOUND',
                        text: 'Please try again',
                    })
             });
        }

    }//METHODS
    }
</script>

