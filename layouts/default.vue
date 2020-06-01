<template>
  <v-app dark>
    <v-navigation-drawer 
      v-model="drawer"
      :mini-variant="mini"
      absolute
      dark
      temporary
      app
      clipped 
    >
     <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar color="red">
            {{ userInitials }}
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
       <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

     
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-avatar class="hidden-xs-only">
          <img src="\icon.png" alt="">
      </v-avatar>
      <v-toolbar-title >
        {{ companyName }}
      </v-toolbar-title>
    <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="item.to" :key="i" v-for="(item,i) in items">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items> -->
    <v-spacer></v-spacer>
        <v-avatar color="red" size=32>
          {{ userInitials }}
        </v-avatar>
        <v-btn icon @click.stop="signout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
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
import { find, concat, map, rest } from "lodash"

  export default {
    middleware:['auth'],
    components:{},
    data () {
      return {
        title: 'SMO',
        drawer: null,
        userItems: [
          // { type:'user', icon: 'create', title: 'Edit', to: '/edit' },
          { type:'user', icon: 'view_list', title: 'List', to: '/list' },
          { type:'user', icon: 'settings', title: 'Profile', to: '/profile' }
        ],
        adminItems: [
          { type:'admin', icon: 'people', title: 'Manage', to: '/admin' },
        ],
        mini: false,
        right: null
      }//RETURN
    },//DATA
    asyncData({store}){
     
    },//ASYNCDATA
    
    created(){

    },//CREATED
    mounted(){

    },//MOUNTED
    computed:{
      companyName(){
        return this.$store.state.user != null ? this.$store.state.user.company : 'SMO'
        // if(this.$store.state.user != null){
        //   let name = this.$store.state.user.company
        //   let arr = name.split(" ")
        //   //console.log(arr.length)
        //   if(arr.length == 1){
        //     return name
        //   }
        //   else{
        //     let abbrev = concat(map(arr, item =>{
        //       return item.substr(0, 1)
        //     }))
        //     return rest(abbrev)
        //     // return abbrevName
        //   }
          
        // }
        // else{
        //   return 'SMO'
        // }

        //return this.$store.state.user != null ? this.$store.state.user.company : 'SMO'
      },
      userName(){
        return this.$store.state.user != null ? this.$store.state.user.fname + ' ' + this.$store.state.user.lname : 'US'
      },//USERNAME
      userInitials(){
        if(this.$store.state.user != null){
          let fname = this.$store.state.user.fname
          let lname = this.$store.state.user.lname
          return fname.substring(0, 1) + lname.substring(0, 1)
        }
        else{
          return ''
        }
        
      },//USER INITIALS
      // isAdmin(){
      //   return this.$store.state.user.role == 'admin' ? true : false
      // },
      items(){
        let role = this.$store.state.user != null ? this.$store.state.user.role : 'user'
        if (role == 'admin'){
          this.userItems  = find(this.userItems, {type: 'admin'}) ? this.userItems : concat(this.userItems, this.adminItems)
        }
          return this.userItems
      }//ITEMS

    },//COMPUTED
    methods:{
      signout(){
        this.$store.dispatch('clearUser')
      },
      // gotoSetting(){
      //   this.$router.push({path: '/admin'})
      // }
    }//METHODS

  }
</script>
