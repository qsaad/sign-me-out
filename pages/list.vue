<template>
    <panel-component icon="view_list" title="LIST">
           <!-- <template v-slot:float>
              <v-bottom-sheet v-model="sheet">
                <template v-slot:activator>
                  <v-btn fab small top left absolute color="purple" dark>
                     <v-icon color="white" medium>swap_vert</v-icon>
                    </v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(item,i) in sortItems"
                    :key="i"
                    @click="sheet = false"
                  >
                   <v-list-tile-avatar>
                      <v-avatar size="32px" tile>
                        <v-icon dark>{{item.icon}}</v-icon>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-title @click="sorter(item)">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-bottom-sheet>
          </template> -->
          <template v-slot:toolbar>
            
            <switch-component v-model="active"></switch-component>
            <!-- <v-text-field
              v-model="search"
              flat
              dark
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
              clearable
              class="hidden-sm-and-down"
            ></v-text-field> -->
          </template>

<!-- TABLE ++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <!-- <v-layout row wrap>
            <v-flex xs12 sm10 md8>
              <v-data-table :items="items" item-key="name" hide-actions hide-headers>
                <template v-slot:items="props">
                  <td>
                    <v-avatar size=36 color="red subheading white--text">
                        {{ formatInitials(props.item.fname, props.item.lname) }}
                      </v-avatar>
                  </td>
                  <td class="title text-xs-center">
                      {{ props.item.fname }} {{ props.item.lname }}
                  </td>
                  <td class="title blue--text text-xs-center">{{ returnTime(props.item.date,props.item.time) }}</td>
                  <td class="yellow--text text-xs-center">{{ props.item.location }}</td>
                  <td class="teal--text text-xs-center">{{ props.item.description }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout> -->
<!-- TABLE ++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- EDIT STATUS DIALOG -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <template v-slot:dialog v-if="isEdit">
                   <v-layout column justify-center align-center >
                        <v-flex xs12>
                          <v-layout row wrap>
                            <v-btn color="red" block  @click="updateUserData" >Submit</v-btn>
                            <v-btn color="blue" block  @click="isEdit = false" >Cancel</v-btn>
                          </v-layout>
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
                </template>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- LIST -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->         
                <v-data-iterator :items="items" :search="search" :hide-actions="true" row wrap>
                  <template v-slot:item="props">
                        <v-list three line>
                          <v-list-tile class="px-0">
                            <v-list-tile-avatar color="red" class="hidden-xs-only">
                                <span class="white--text title">
                                  {{ formatInitials(props.item.fname, props.item.lname) }}
                                </span>
                            </v-list-tile-avatar>
                            <v-list-tile-content class="orange--text">
                                <v-list-tile-title class="pb-2">
                                  <v-layout row wrap justify-space-between align-end>
                                    <v-flex class="white--text title">
                                      {{ props.item.fname }} {{ props.item.lname }}
                                    </v-flex >
                                    <v-flex class="blue--text title hidden-sm-and-up">
                                      {{ returnTime(props.item.date,props.item.time) }}
                                      
                                    </v-flex>
                                  </v-layout>
                                </v-list-tile-title>
                                <v-list-tile-sub-title class="caption pb-1">
                                  @ <span class="yellow--text mx-1 py-2"> {{ props.item.location }} </span>
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title class="caption pb-1">
                                  for <span class="yellow--text mx-1 py-2"> {{ props.item.description }} </span>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action class="display-1 blue--text hidden-xs-only">
                              {{ returnTime(props.item.date,props.item.time) }}
                              <span v-if="expired(props.item)">Expired</span>
                            </v-list-tile-action>
                            <v-list-tile-action>
                                <v-btn icon v-if="props.item.fname == user.fname && props.item.lname== user.lname" @click="isEdit = !isEdit">
                                <v-icon>
                                  edit
                                </v-icon>
                              </v-btn> 
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                  
                  </template>
                </v-data-iterator>
           
    </panel-component>
</template>

<script>
import * as moment from 'moment'
import { orderBy, filter , truncate} from "lodash"
import PanelComponent from '@/components/PanelComponent.vue'
import SwitchComponent from '@/components/SwitchComponent.vue'

export default {
  middleware:['loadList'],
  mixins:[],
  components:{PanelComponent, SwitchComponent},
  asyncData({store}){
        return {
            location : store.state.user.location,
            description : store.state.user.description,
            date : moment(store.state.user.date).format('YYYY-MM-DD') ,
            time : store.state.user.time ,
            user : store.state.user
        }
    },//ASYNCDATA
  data(){
    return{
      rules: {
                required: value => !!value || 'Required.',
            },//RULES
            duration:'time',
            isChange : false,
            isEdit : false,
      // rowsPerPageItems: [6, 12, 18],
      // pagination: {
      //   rowsPerPage: 6,
      //   totalItems: "number"
      // },
      sheet: false,
      sortItems: [
        { icon: 'schedule', title: 'Time', value:'time' },
        { icon: 'person', title: 'Name', value:'name' },
        { icon: 'place', title: 'Location', value:'location' },
        { icon: 'subject', title: 'Description', value:'description' },
      ],
      sortBy : 'time',
      search : ''
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
  },//WATCH
  computed:{
    // user(){
    //   return this.$store.state.user
    // },
    active: {
            get () {
                return this.$store.state.user != null ? this.$store.state.user.active : false
            },
            set (value) {
                this.isEdit = value
                this.$store.dispatch('updateActive', value)
            }
        },
    items(){
      //this.$store.dispatch('loadList',{company : this.$store.state.user.company})
      switch(this.sortBy) {
        case 'name':
          return orderBy(filter(this.$store.state.list,{active : true}),['fname','lname'],['asc','asc'])
          break;
        case 'time':
          return orderBy(filter(this.$store.state.list,{active : true}),['time'],['asc'])
          break;
        case 'location':
          return orderBy(filter(this.$store.state.list,{active : true}),['location'],['asc'])
          break;
        case 'description':
          return orderBy(filter(this.$store.state.list,{active : true}),['description'],['asc'])
          break;
        default:
          // code block
      }
        return orderBy(filter(this.$store.state.list,{active : true}),['fname','lname'],['asc','asc'])
    },
    // currentDate(){
    //   return moment().format('dddd Do MMM YYYY')
    // }
    
    
  },//COMPUTED
  methods:{
    sorter(e){
      this.sortBy = e.value
      //alert(e.title)
    },
    expired(user){
      // let userDate = moment(user.date).format("YYYY-MM-DD")
      // let userTime = moment(user.time, "HH:mm").format("HH:mm")
      // let nowDate = moment().format("YYYY-MM-DD")
      // let nowTime = moment().format("HH:mm")
      // let nowMoment = moment().format("YYYY-MM-DD HH:mm")

      let userMoment = moment(`${user.date} ${user.time}`).format("YYYY-MM-DD HH:mm")
      
      //console.log(moment().diff(userMoment,'minutes'))

      if(moment().diff(userMoment,'minutes') > 0){
        //this.$store.dispatch('updateActive', false)
        this.$store.dispatch('updateExpire', user)
        console.log(`${user.fname} has expired` )
      }
      else{
        console.log(`${user.fname} is active` )
      }

     
      //if(moment().isAfter(date)) return true
    },
    updateUserData(){
            let data = {
                location : this.location,
                description : this.description,
                date : this.date,
                time : this.time
            }
            this.$store.dispatch('updateUserStatus', data)
            this.isEdit = false
    },
    // sync(){
    //   this.$store.dispatch('loadList',{company : this.$store.state.user.company})
    // },
    // formatDate(val){
    //   let today = moment().format('YYYY-MM-DD')
    //   return moment(today).isSame(val) ? 'Today' : moment(val).format('dddd')
    // },
    // formatTime(val){
    //   return moment(val, "HH:mm").format("h:mm a")
    // },
    // remainingTime(dateStr,timeStr){
    //   return moment(dateStr + ' ' + timeStr).fromNow()
    // },
    returnTime(dateStr,timeStr){
      let today = moment().format('YYYY-MM-DD')
      let time = moment(timeStr, "HH:mm").format("h:mm a")
      let day = moment(dateStr).format('ddd')
      let end = moment(dateStr)

      if(end.diff(moment(), 'days') > 7){
        return moment(dateStr).format('MM-DD-YY')
      }
      else{
        return moment(today).isSame(dateStr) ? time : day
      }
      
    },
    // truncateLocation(str){
    //   return truncate(str,{'length':15})
    // },
    // truncateDescription(str){
    //   return truncate(str,{'length':30})
    // },
    formatInitials(fname,lname){
      return fname.substring(0, 1) + lname.substring(0, 1)
    }
   
  }//METHODS
}//EXPORT DEFAULT
</script>

