<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm10 md8>
            <v-toolbar color="black" dark dense align-center>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Edit</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items align-center>
                        <v-layout row justify-end align-center>
                            <v-flex>
                                <switch-component v-model="active"></switch-component>
                            </v-flex>
                        </v-layout>
                    </v-toolbar-items>
                </v-toolbar>
            <v-card class="pa-0 ma-0">
                <v-card-text v-if="active">
                    <v-layout column justify-center align-center >
                        <v-flex xs12>
                            <v-btn color="red" block  @click.native.stop="updateUserData" >Submit</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="location"
                                hint="Specify destination"
                                required
                                clearable
                                prepend-icon="place"
                                single-line
                                class="pa-0 ma-0"
                               
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="description"
                                hint="Provide description"
                                required
                                clearable
                                prepend-icon="subject"
                                single-line
                                class="pa-0 ma-0"
                            
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="pb-3 pt-3">
                            <v-btn-toggle v-model="duration" mandatory>
                                <v-btn flat value="date">
                                    <v-icon>date_range</v-icon>
                                    <span class="pl-2">Date</span>
                                </v-btn>
                                <v-btn flat value="time">
                                    <v-icon>schedule</v-icon>
                                    <span class="pl-2">Time</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                        <v-flex v-if="duration == 'date'">
                            <v-date-picker 
                                v-model="date"  
                                :reactive=true 
                                color="blue">
                            </v-date-picker>
                            <div>
                                {{date}}
                            </div>
                        </v-flex>
                        <v-flex v-if="duration == 'time'">
                            <v-time-picker 
                                v-model="time" 
                                format="ampm" 
                                scrollable
                                color="blue"
                                class="pa-0 ma-0"
                            ></v-time-picker>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text v-else >
                    <v-layout row wrap justify-center align-center>
                        <v-flex xs12 class="display-1 text-xs-center yellow--text">
                            Toggle Radio Button above to sign-out
                        </v-flex>
                    </v-layout>
                    
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
//import { debounce } from "lodash"
import PanelComponent from '@/components/PanelComponent.vue'
import SwitchComponent from '@/components/SwitchComponent.vue'
import * as moment from 'moment'

export default {
  middleware:[],
  mixins:[],
  components:{PanelComponent, SwitchComponent},
    asyncData({store}){
        return {
            location : store.state.user.location,
            description : store.state.user.description,
            date : moment(store.state.user.date).format('YYYY-MM-DD') ,
            time : store.state.user.time ,
        }
    },//ASYNCDATA
    data(){
        return{
            rules: {
                required: value => !!value || 'Required.',
            },//RULES
            duration:'time',
            isChange : false,
        }//RETURN
    },//DATA
    created(){
    },//CREATED
    mounted(){
        
    },//MOUNTED
    watch: {
        location : (val) => {
          console.log(val)
        },
        description : (val) => {
            console.log(val)
            //this.isChange = val != '' ? true : false
        }
    },
    computed:{
        active: {
            get () {
                return this.$store.state.user != null ? this.$store.state.user.active : false
            },
            set (value) {
                this.$store.dispatch('updateActive', value)
            }
        },
    },//COMPUTED
    methods:{
        updateUserData(){
            let data = {
                location : this.location,
                description : this.description,
                date : this.date,
                time : this.time
            }
            this.$store.dispatch('updateUserStatus', data)
        },
    }//METHODS
}//EXPORT DEFAUL
</script>

