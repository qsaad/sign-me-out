<template>
    <panel-component icon="lock" title="Login">
        <slot>
            <v-layout column class="pa-2">
                    <!-- <v-flex>{{loadData}}</v-flex> -->
                    <v-flex xs12>
                        <v-text-field 
                            label="email" 
                            v-model="email" 
                            :rules="[rules.required, rules.email]"
                            prepend-icon="email"
                            clearable 
                            required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field 
                            label="password" 
                            type="password"
                            v-model="password" 
                            :rules="[rules.required, rules.counter]"
                            counter
                            prepend-icon="vpn_key"
                            clearable 
                            required>
                        </v-text-field>
                    </v-flex>
                    <v-flex class="text-xs-center">
                        <v-btn 
                            color="primary" 
                            @click="login" 
                            :disabled="!validation"
                            block
                        >
                            Login
                        </v-btn>
                        <!-- <span v-else class="title red--text mt-2">
                            Invalid Email/Password
                        </span> -->
                    </v-flex>
                    <v-flex>
                        {{findCompanyName}}
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
                    <span class="caption teal--text">Need to reset password ?</span>
                    <span class="caption teal--text"><nuxt-link to="/reset">Click Here</nuxt-link></span>
                </v-flex>
            </v-layout>
        </slot>
    </panel-component>
</template>

<script>
import {fireDb, fireAuth} from '~/plugins/firebase.js'
import PanelComponent from '@/components/PanelComponent.vue'
import Swal from 'sweetalert2'
import {orderBy, filter, map, capitalize, trim, startCase, uniq, compact, size} from "lodash"

export default {
    layout:'loginLayout',
    middleware:['loadData'],
    mixins:[],
    components:{PanelComponent},
    // async fetch ({ store, params }) {
    //     await store.dispatch('loadData');
    // },
    data(){
        return{
            company : '',
            email : '',
            password : '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length > 6 || 'Min 6 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }//EMAIL RULE
            },//RULES
        }//RETURN
    },//DATA
    created(){

    },//CREATED
    mounted(){

    },//MOUNTED
    computed:{
        // loadData(){
        //     return this.$store.state.data
        // },
        validation(){
            return (this.email == '' || this.password.length < 6) ? false : true
        },//VALIDATION

        findCompanyName(){
            let arr = map(this.$store.state.data, item =>{
                if (item.email == this.email) {
                    return item.company 
                }
            })

            this.company = compact(arr) 
        },

        adminList(){
            let arr =  map(filter(this.$store.state.data,{company : startCase(this.company).trim()}),(item) =>{
                    if(item.role == 'admin'){
                        return item.fname + ' ' + item.lname
                    }
                }
            ) 

            return filter(arr, size);
        }//ADMIN LIST
    },//COMPUTED
    methods:{
        login(){
            let verified = _.map(_.filter(this.$store.state.data,{email : this.email}),'verified')

            if(verified[0]){
                fireAuth.signInWithEmailAndPassword(this.email, this.password)
                .then((authData) =>{
                    if(authData.user.emailVerified){
                        this.$store.dispatch('setUser',{uid : authData.user.uid})
                    }
                    else{
                        authData.user.sendEmailVerification()
                        Swal.fire({
                            type: 'warning',
                            title: 'VERIFY EMAIL',
                            text: 'Check your email for verification link',
                        })
                    }
                })
                .catch( (error) => {
                    console.log(error)
                    Swal.fire({
                        type: 'warning',
                        title: 'LOGIN FAILED',
                        text: 'login credentials not found',
                    })
                })
            }
            else{
                Swal.fire({
                    type: 'warning',
                    title: 'ACCOUNT VERIFICATION',
                    text: 'Check with Admin -  ' + this.adminList +' for account verification',
                })
            }
            
        }//LOGIN
    }//METHODS
}
</script>

