<template>
<v-layout row justify-center align-center fill-height>
    <v-flex xs12 sm10 md6>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">User</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Confirmation</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3">Email</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4" step="4">Complete</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- STEP 1 - FILL FORM -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <v-stepper-content step="1">
                    <v-card>
                        <v-card-text class="title yellow--text">
                            <panel-component icon="how_to_reg" title="Register">
                                <slot>
                                    <v-layout column class="pa-2">
                                        <v-flex xs12>
                                            <v-text-field 
                                                label="First Name" 
                                                v-model="fname" 
                                                :rules="[rules.required]"
                                                hint="What is your first name? No abbreviations"
                                                prepend-icon="person" 
                                                clearable 
                                                required
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                                label="Last Name" 
                                                v-model="lname" 
                                                :rules="[rules.required]"
                                                hint="What is your last name? No abbreviations"
                                                prepend-icon="person" 
                                                clearable 
                                                required
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                                label="Email" 
                                                v-model="email" 
                                                :rules="[rules.required, rules.email]"
                                                hint="Preferred email address "
                                                prepend-icon="email" 
                                                clearable 
                                                required
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                                label="Password" 
                                                type="password"
                                                v-model="password" 
                                                hint="At least 6 characters"
                                                prepend-icon="vpn_key"  
                                                counter
                                                clearable 
                                                required
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-checkbox
                                            v-model="createCompany"
                                            label="Create New Company"
                                            ></v-checkbox>
                                        </v-flex>
                                        
                                        <v-flex xs12 v-if="createCompany">
                                            <v-text-field 
                                                label="Company" 
                                                v-model="company"
                                                :rules="[rules.required, rules.company]"
                                                hint="What Company do you work for?"
                                                prepend-icon="work" 
                                                clearable 
                                                required
                                            >
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 v-else>
                                            <v-combobox
                                                v-model="company"
                                                :items="companyList"
                                                label="Select Company"
                                                browser-autocomplete
                                            >
                                            </v-combobox>
                                        </v-flex>
                                        <v-flex xs12>
                                            <!-- <v-text-field 
                                                label="City" 
                                                v-model="city" 
                                                :rules="[rules.required]"
                                                hint="What City do you work in?"
                                                prepend-icon="place" 
                                                clearable 
                                                required
                                            >
                                            </v-text-field> -->
                                            <v-combobox
                                                v-model="city"
                                                :items="cityListItems"
                                                label="City"
                                                browser-autocomplete
                                            >
                                            </v-combobox>
                                        </v-flex>
                                        <v-flex xs12>
                                            <!-- <v-text-field 
                                                label="Department" 
                                                v-model="department"
                                                :rules="[rules.required]"
                                                hint="Which Department do you work for?"
                                                prepend-icon="build"  
                                                clearable 
                                                required>
                                            </v-text-field> -->
                                            <v-combobox
                                                v-model="department"
                                                :items="departmentListItems"
                                                label="Department"
                                                browser-autocomplete
                                            >
                                            </v-combobox>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-layout row justify-center align-center>
                                                <v-flex xs5>
                                                    <v-checkbox label="Agreement" v-model="agreement"></v-checkbox>
                                                </v-flex>
                                                <v-flex xs7 >
                                                    <smo-agreement></smo-agreement>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </slot>
                            </panel-component>
                        </v-card-text>
                    </v-card>
                    <v-card-actions>
                        <v-layout row wrap justify-center align-center>
                            <v-btn color="blue-grey text-xs-center" nuxt to="/" block>
                                <v-icon left dark>close</v-icon>
                                Cancel
                            </v-btn>
                             <v-btn color="primary text-xs-center" @click="createUser" :disabled="!validation"  block>
                                Verify Details
                                <v-icon right dark>navigate_next</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                
                </v-stepper-content>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- STEP 2 - CONFIRM DETAILS -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <v-stepper-content step="2">
                     <v-card class="mb-5"  height="200px">
                        <v-card-text> 
                            <v-layout column justify-center align-center class="heading white--text">
                                <v-flex> Name : <span class="yellow--text">{{newUserData.fname}}  {{newUserData.lname}}</span></v-flex>
                                <v-flex> Email : <span class="yellow--text">{{newUserData.email}} </span></v-flex>
                                <v-flex v-if="newUserData.verified"> 
                                    You will 
                                    <span class="red--text title">CREATE </span>
                                    <span class="yellow--text">{{newUserData.company}} </span> 
                                    team
                                </v-flex>
                                <v-flex v-else> 
                                    You will 
                                    <span class="red--text title">JOIN</span> 
                                    <span class="yellow--text">{{newUserData.company}} </span> 
                                    team
                                </v-flex>
                                <v-flex> Role : <span class="yellow--text">{{newUserData.role}} </span></v-flex>
                                <v-flex> City : <span class="yellow--text">{{newUserData.city}} </span></v-flex>
                                <v-flex> Department : <span class="yellow--text">{{newUserData.department}} </span></v-flex>
                                
                                <v-flex> 
                                    &#42; Account Status : 
                                    <span class="yellow--text" v-if="newUserData.verified">
                                        Approved
                                        <v-avatar color="green" size=32>
                                            <v-icon dark>check</v-icon>
                                        </v-avatar>
                                    </span>
                                    <span class="yellow--text" v-else>
                                        Pending Approval
                                        <v-avatar color="red" size=32>
                                            <v-icon color="black">warning</v-icon>
                                        </v-avatar>
                                    </span>
                                </v-flex>
                                <v-flex class="caption teal--text" v-if="!newUserData.verified">
                                    &#42; admin to approve account
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-card-actions>
                        <v-layout row wrap justify-center align-center>
                            <v-btn color="blue-grey text-xs-center" @click="e1 = 1" block>
                                <v-icon left dark>navigate_before</v-icon>
                                Back
                            </v-btn>
                            <v-btn color="primary text-xs-center" @click="register" block>
                                Create Account
                                <v-icon right dark>navigate_next</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                 </v-stepper-content>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- STEP 3 - VERIFY EMAIL -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <v-stepper-content step="3">
                    <v-card class="mb-5"  height="200px">
                        <v-card-text> 
                            <v-layout column justify-center align-center class="heading white--text">
                                <v-flex>Your account has been created and an email has been sent to <span class="yellow--text">{{email}}</span></v-flex>
                                <v-flex>Open email and <span class="yellow--text">click link </span> to confirm email address</v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-card-actions>
                        <v-layout row wrap justify-center align-center>
                            <v-btn color="primary text-xs-center" @click="e1 = 4" block>
                                Continue
                                <v-icon right dark>navigate_next</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-stepper-content>
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- STEP 4 - FINISH -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <v-stepper-content step="4">
                    <v-card class="mb-5" height="200px">
                        <v-card-text> 
                            <v-layout column justify-center align-center class="heading white--text" v-if="newUserData.role =='user'">
                                <v-flex>Administrator needs to approve your account</v-flex>
                                <v-flex>Please check with <span class="yellow--text"> {{adminList}}</span> to get your account approved</v-flex>
                                <v-flex>Once approved you can <span class="yellow--text">login</span> to your account</v-flex>
                            </v-layout>
                            <v-layout column justify-center align-center class="heading white--text" v-else>
                                <v-flex>You have successfully created a new account for <span class="yellow--text">{{newUserData.company}}</span></v-flex>
                                <v-flex>You are the designated <span class="yellow--text">Admininstrator</span> for this account</v-flex>
                                <v-flex>All new users to this account will need to be <span class="yellow--text">approved</span> by you</v-flex>
                                <v-flex>You can now <span class="yellow--text">login</span> to your account</v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-card-actions>
                        <v-layout row wrap justify-center align-center>
                            <v-btn color="primary text-xs-center" nuxt to="/" block>
                                Finish
                                <v-icon right dark>done</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

    </v-flex>
    </v-layout>
</template>

<script>
import {fireDb, fireAuth} from '~/plugins/firebase.js'
import Swal from 'sweetalert2'
import { orderBy, filter, map, indexOf, toLower, capitalize, trim, uniq, startCase, pickBy, identity, valuesIn} from "lodash"
import PanelComponent from '@/components/PanelComponent.vue'
import SmoAgreement from '@/components/Agreement.vue'
import * as moment from 'moment'

export default {
    layout:'loginLayout',
    middleware:['loadData'],
    mixins:[],
    components:{PanelComponent,SmoAgreement},
    // async fetch ({ store, params }) {
    //     await store.dispatch('loadData');
    // },
    data(){
        return{
             e1: 0,

            fname : '',
            lname : '',
            email : '',
            password : '',
            company : '',
            cityList : ['Columbus','Cleveland','Detriot','Akron','Tampa','Fort Lauderdale','St Petersburg'],
            city : '',
            departmentList : ['Civil','Structure','Electrical','Mechanical','Plumbing','Fire Protection','Technology','Transportation','Architect','Administration','Accounting','Marketing'],
            department : '',
            agreement : false,

            createCompany : false,

            newUserData : {},

            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                company: value => {
                    return indexOf(this.companyList, startCase(value).trim()) >= 0 ? 'This Company exists : You will join this Company' : 'You will create this Company'
                    
                }
            },//RULES
        }//RETURN
    },//DATA
    asyncData({store}){
        return {
            //companyList : map(store.getters.getCompanyList, item =>{ return capitalize(item).trim() })
        }
    },//ASYNCDATA
    created(){

    },//CREATED
    mounted(){

    },//MOUNTED
    computed:{
        // loadData(){
        //     return this.$store.state.data
        // },
        companyExists(){
            return indexOf(this.companyList, this.company) >= 0 ? true : false
        },//COMPANY EXIST
        validation(){
            if(this.fname == '' || this.lname == ''||  this.email == ''||  this.password == '' ||  this.company == ''||  this.city == ''||  this.department == '' || this.agreement == false){
                return false
            }
            else{
                return true
            }
        },//VALIDATION

        cityListItems(){
            return (this.cityList).sort()
        },

        departmentListItems(){
                return (this.departmentList).sort()
        },

        companyList(){
            return uniq(map(this.$store.state.data,(item) =>{
                return startCase(item.company).trim()
            }))
        },//ADMIN LIST

        adminList(){
            // return map(filter(this.$store.state.data,{company : startCase(this.company).trim()}),(item) =>{
            //     return item.role == 'admin' ? item.fname + ' ' + item.lname : ''
            // }) 

             let arr =  map(filter(this.$store.state.data,{company : startCase(this.company).trim()}),(item) =>{
                    if(item.role == 'admin'){
                        return item.fname + ' ' + item.lname
                    }
                }
            ) 

            return valuesIn(pickBy(arr, identity))
        }//ADMIN LIST
    },//COMPUTED
    methods:{
        createUser(){
            //PREPARE NEW USER DATA OBJECT
            this.newUserData = {
                    uid : '',
                    email : toLower(this.email).trim(),
                    fname : capitalize(this.fname).trim(),
                    lname : capitalize(this.lname).trim(),
                    company : startCase(this.company).trim(),
                    city : capitalize(this.city).trim(),
                    department : capitalize(this.department).trim(),
                    location : "location",
                    description : "description",
                    time : "8:00",
                    date : moment().format('YYYY-MM-DD'),
                    active : false,
                    role : this.createCompany ?  'admin' : 'user',
                    agreement : this.agreement,
                    verified : this.createCompany ? true : false,
                    //verified : indexOf(this.companyList, capitalize(this.company).trim()) >= 0 ? false : true,
            }
            //GO TO STEP 2
            this.e1 = 2
        },//CREATE USER
        register(){
            //CREATE NEW USER IN FIRE AUTH
            fireAuth.createUserWithEmailAndPassword(this.email,this.password)
                .then((authData) => {
                    this.newUserData.uid = authData.user.uid
            //SEND VERIFICATION EMAIL
                    authData.user.sendEmailVerification()
                    .then(() =>{
            //ADD NEW USER TO FIRESTORE
                        this.$store.dispatch('createUser', this.newUserData) 
                    })
                    .catch((error) =>{
                        Swal.fire({
                            type: 'error',
                            title: 'REGISTRATION FAILED',
                            text: 'Please try again',
                        })
                    })
                })
            //GO TO STEP 3
            this.e1 = 3
        },//REGISTER
    }//METHODS
}
</script>

