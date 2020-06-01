<template>
    <panel-component icon="settings" title="PROFILE">
       <!-- <template v-slot:float>
         <v-btn fab small color="red" top left absolute @click.native.stop="updateUserProfile">
            <v-icon color="white" medium>update</v-icon>
        </v-btn>
       </template> -->
          <v-layout column justify-center align-center fill-height class="text-xs-center ma-2">
            <v-flex xs12>
              <v-text-field
                v-model="fname"
                hint="Update First Name"
                required
                clearable
                prepend-icon="person"
                single-line
                class="pa-0 ma-0"
              ></v-text-field>
              <v-text-field
                v-model="lname"
                hint="Update Last Name"
                required
                clearable
                prepend-icon="person"
                single-line
                class="pa-0 ma-0"
              ></v-text-field>
              <v-combobox
                  v-model="city"
                  :items="cityListItems"
                  label="City"
                  browser-autocomplete
                   prepend-icon="place"
              >
              </v-combobox>
              <!-- <v-text-field
                v-model="city"
                hint="Update City"
                required
                clearable
                prepend-icon="place"
                single-line
                class="pa-0 ma-0"
              ></v-text-field> -->
              <v-combobox
                  v-model="department"
                  :items="departmentListItems"
                  label="Department"
                  browser-autocomplete
                  prepend-icon="build"
              >
              </v-combobox>
              <!-- <v-text-field
                v-model="department"
                hint="Update Department"
                required
                clearable
                prepend-icon="build"
                single-line
                class="pa-0 ma-0"
              ></v-text-field> -->
              <v-btn color="primary" block @click.native.stop="updateUserProfile">
                Update
              </v-btn>
            </v-flex>
          </v-layout>
       </panel-component>
</template>

<script>
import { debounce } from "lodash"
import * as moment from 'moment'
import PanelComponent from '@/components/PanelComponent.vue'

export default {
  middleware:['auth'],
  mixins:[],
  components:{PanelComponent},
  data(){
    return{
      rules: {
        required: value => !!value || 'Required.',
      },//RULES
    }//RETURN
  },//DATA
  asyncData({store}){
      return {
        fname : store.state.user.fname,
        lname : store.state.user.lname,
        department : store.state.user.department,
        city : store.state.user.city,
        cityList : ['Columbus','Cleveland','Detriot','Akron','Tampa','Fort Lauderdale','St Petersburg'],
        departmentList : ['Civil','Structure','Electrical','Mechanical','Plumbing','Fire Protection','Technology','Transportation','Architect','Administration','Accounting','Marketing'],
      }
    },//ASYNCDATA
  created(){
    // this.updateFirstName = debounce((value) => {
    //         this.$store.dispatch('updateFirstName', value)
    // }, 3000)
    // this.updateLastName = debounce((value) => {
    //         this.$store.dispatch('updateLastName', value)
    // }, 3000)
    // this.updateCity = debounce((value) => {
    //         this.$store.dispatch('updateCity', value)
    // }, 3000)
    // this.updateDepartment = debounce((value) => {
    //         this.$store.dispatch('updateDepartment', value)
    // }, 3000)

  },//CREATED
  mounted(){

  },//MOUNTED
  computed:{
    cityListItems(){
      return (this.cityList).sort()
    },

    departmentListItems(){
      return (this.departmentList).sort()
    },
    
  },//COMPUTED
  methods:{
    updateUserProfile(){
      let data = {
                fname : this.fname,
                lname : this.lname,
                city : this.city,
                department : this.department
            }
      this.$store.dispatch('updateUserProfile', data)
    }
  }//METHODS
}
</script>

