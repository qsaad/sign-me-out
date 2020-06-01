<template>
    <panel-component icon="people" title="ADMIN"
    >
      <v-container fluid grid-list-md>
        <v-card v-for="(item,i) in items" :key="i" tile hover class="ma-0 pt-2 pl-2 pb-0 mb-4">
          <v-card-title class="title pa-0 ma-0">
              <v-layout row justify-space-around align-center>
                <v-flex>
                  {{item.fname}} {{item.lname}}
                </v-flex>
                <!-- <v-flex>
                  <v-btn icon @click="remove(props.item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </v-flex> -->
              </v-layout>
          </v-card-title>
          <v-card-text class="pa-0 ma-0">
            <v-layout column  class="pa-0">
              <v-flex>
                <span class="teal--text text--darken-1">in</span> 
                <span class="yellow--text text--lighten-1">{{ item.city }}</span>
                <span class="teal--text text--darken-1">with</span>  
                <span class="yellow--text text--lighten-1">{{ item.department }}</span>
                <span class="teal--text text--darken-1">dept.</span>
              </v-flex>
              <v-flex>
                <v-layout row justify-center align-center class="pr-2">
                  <v-flex xs6>
                      <v-checkbox v-model="item.verified" @change="toggleVerified(item)" label="Approved">
                      </v-checkbox>
                  </v-flex>
                  <v-flex xs6>
                    <v-select v-model="item.role" :items="roles" label="Role" @input="updateRole(item)">
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-container>
    </panel-component>
</template>

<script>
import * as moment from 'moment'
//import _ from 'lodash'
import { orderBy, filter } from "lodash"
import PanelComponent from '@/components/PanelComponent.vue'
import Swal from 'sweetalert2'

export default {
  middleware:['loadList'],
  mixins:[],
  components:{PanelComponent},
  data(){
    return{
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      verification : false,
      role : 'admin',
      roles:['admin','user']
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
    items(){
      //this.$store.dispatch('loadList',{company : this.$store.state.user.company})
      return orderBy(this.$store.state.list,['fname'],['asc'])
    },
  },//COMPUTED
  methods:{
    // formatTime(val){
    //   return moment(val, "HH:mm").format("h:mm a")
    // },
    // remainingTime(val){
    //   return moment(val, "HH:mm").fromNow()
    // },
    // formatInitials(fname,lname){
    //   return fname.substring(0, 1) + lname.substring(0, 1)
    // },
    remove(item){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete "+ item.fname + ' ' + item.lname,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete user!' 
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteUser', item.uid)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },//REMOVE
    toggleVerified(item){
      this.$store.dispatch('toggleVerified', item)
    },
    updateRole(item){
      this.$store.dispatch('updateRole', item)
    }

  }//METHODS
}//EXPORT DEFAULT
</script>

