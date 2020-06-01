import {fireDb, fireAuth} from '~/plugins/firebase.js'
import Swal from 'sweetalert2'
import * as moment from 'moment'
import { set, find, uniq, map, toLower} from "lodash"

export const strict = false

export const state = () => ({
  avatar : "AC",
  active : false,
  location : "FMS",
  description : "Site Visit",
  time : moment().format("HH:mm"),
  data : [],
  list: [],
  user:{}
})//STATE

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//GETTERS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getters = {
  getAvatar : state => state.avatar,
  getActive : state => state.active,
  getLocation : state => state.location,
  getDescription : state => state.description,
  getDate : state => state.date,
  getTime : state => state.time,

  getUser : state => state.user,
  getEmail : state => state.user.email,
  getCompany : state => state.company,
  getCity : state => state.city,
  getDepartment : state => state.Department,
  getList : state => state.list,
  getCompanyList : state => uniq(map(state.data,'company')),
  getUsersByCompany: (state) => (company) => {
    return state.list.find(item => item.company === company)
  },
  isAuthenticated : state => {return state.user != null ? true : false},
  
}//GETTER

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//MUTATIONS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const mutations = {
  //----------------
  //USER STATUS
  //----------------
  UPDATE_USER_STATUS(state,payload){
    const ref = fireDb.collection("users").doc(state.user.uid)
    return ref.update({
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time : payload.time
      })
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'Status UPDATED successfully',
      })
      this.$router.push({path: '/list'})
      console.log("VUEX - UPDATE_USER_STATUS")
      state.user.location = payload.location
      state.user.description = payload.description
      state.user.date = payload.date
      state.user.time = payload.time
      })
      .catch((error) => {
        console.error("Error UPDATE_USER_STATUS : ", error)
    })
  },

  //----------------
  //USER PROFILE
  //----------------
  UPDATE_USER_PROFILE(state,payload){
    const ref = fireDb.collection("users").doc(state.user.uid)
    return ref.update({
        fname: payload.fname,
        lname: payload.lname,
        city: payload.city,
        department : payload.department
      })
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'Profile UPDATED successfully',
      })
      
      console.log("VUEX - UPDATE_USER_PROFILE")
      state.user.fname = payload.fname
      state.user.lname = payload.lname
      state.user.city = payload.city
      state.user.department = payload.department
      })
      .catch((error) => {
        console.error("Error UPDATE_USER_PROFILE : ", error)
    })
  },
  
  //----------------
  //ACTIVE
  //----------------
  UPDATE_ACTIVE (state,payload) {
    const ref = fireDb.collection("users").doc(state.user.uid)
    return ref.update({active: payload})
      .then(() => {
        set(find(state.list, { email: state.user.email }), 'active', payload)
        state.user.active = payload
        console.log("VUEX - UPDATE_ACTIVE")
      })
      .catch((error) => {
        console.error("Error UPDATE_ACTIVE: ", error)
    })
  },//UPDATE ACTIVE

  //----------------
  //ACTIVE
  //----------------
  UPDATE_EXPIRE (state,payload) {
    // console.log(payload)
    // console.log(payload.uid)
    // console.log(payload.active)
    

    const ref = fireDb.collection("users").doc(payload.uid)
    return ref.update({active: false})
      .then(() => {
        set(find(state.list, { email: state.user.email }), 'active', false)
        state.user.active = false
        console.log("VUEX - UPDATE_EXPIRE")
      })
      .catch((error) => {
        console.error("Error UPDATE_EXPIRE: ", error)
    })
  },//UPDATE ACTIVE


  //----------------
  //ROLE
  //----------------
  UPDATE_ROLE (state,payload) {
    const ref = fireDb.collection("users").doc(payload.uid)
    return ref.update({role: payload.role})
      .then(() => {
        set(find(state.list, { email: state.user.email }), 'role', payload.role)
        console.log("VUEX - UPDATE_ROLE")
      })
      .catch((error) => {
        console.error("Error UPDATE_ROLE: ", error)
    })
  },//UPDATE ACTIVE
  //----------------
  //LOAD DATA
  //----------------
  LOAD_DATA (state,payload) {
    console.log('LOAD DATA')
    fireDb.collection('users').get()
      .then((querySnapshot) => {
        let items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        state.data = items
        console.log("VUEX - LOAD DATA")
    })
    .catch((error) =>{
        console.log("Error LOAD_DATA: ", error);
    });
  },//LOAD DATA
  //----------------
  //LOAD LIST
  //----------------
  LOAD_LIST (state,payload) {
    fireDb.collection("users").where("company", "==", state.user.company)
    .onSnapshot((querySnapshot) => {
      let items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })

      state.list = items
      console.log("VUEX - LOAD_LIST")
    });
  },//LOAD LIST
 
  //----------------
  //CREATE USER
  //----------------
  CREATE_USER (state,payload) {
    fireDb.collection("users").doc(payload.uid).set(payload)
      .then(() =>{
        Swal.fire({
          type: 'success',
          title: 'SUCCESSFULLY REGISTERED',
          text: 'Check your email for account verification',
        })
      })
      console.log("VUEX - CREATE_USER")
      //state.list.push(payload)
      //this.$router.push({path: '/login'})
  },//CREATE USER
  //----------------
  //SET USER
  //----------------
  async SET_USER (state,payload) {
    const ref = fireDb.collection("users").doc(payload.uid)
    try{
      let doc = await ref.get()
      state.user = doc.data()
      state.company = state.user.company
      console.log("VUEX - SET_USER")
      this.$router.push({path: '/list'})
    }
    catch(e){
      console.log("Error SET_USER : ", error);
    }
   
  },//SET USER
  //----------------
  //CLEAR USER
  //----------------
  CLEAR_USER (state,payload) {
    state.user = null
    state.company = null
    state.data = []
    state.list = []
    console.log("VUEX - CLEAR_USER")
    this.$router.push({path: '/'})
  },//CLEAR USER
  //----------------
  //DELETE USER
  //----------------
  DELETE_USER(state,payload){
    console.log(payload)
    // fireDb.collection("users").doc(payload.uid).delete
    // .then(() => {
    //   console.log("User successfully deleted!");
    // }).catch((error) =>{
    //   console.error("Error deleting user: ", error);
    // });

  },//DELETE USER
  //----------------
  //TOGGLE VERIFIED
  //----------------
    TOGGLE_VERIFIED(state,payload){
      const ref = fireDb.collection("users").doc(payload.uid)
      return ref.update({verified: payload.verified})
      .then(() => {
        console.log("VUEX - TOGGLE_VERIFIED")
        if(payload.verified == true){
          Swal.fire({
            type: 'success',
            title: 'User Verification',
            text: 'You have successfully activated this user',
          })
        }
        else{
          Swal.fire({
            type: 'success',
            title: 'User Verification',
            text: 'You have successfully deactivated this user',
          })
        }
      
      })
      .catch((error) => {
        console.error("Error TOGGLE_VERIFIED : ", error)
    })
  },//TOGGLE VERIFIED

}//MUTATIONS

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//ACTIONS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const actions = {
  updateUserStatus : (context, payload) => { context.commit('UPDATE_USER_STATUS', payload) },
  updateUserProfile : (context, payload) => { context.commit('UPDATE_USER_PROFILE', payload) },
  updateActive : (context, payload) => { context.commit('UPDATE_ACTIVE', payload) },
  updateExpire : (context, payload) => { context.commit('UPDATE_EXPIRE', payload) },
  updateRole : (context, payload) => { context.commit('UPDATE_ROLE', payload) },

  loadData : (context, payload) => {context.commit('LOAD_DATA', payload)},
  loadList : (context, payload) => {context.commit('LOAD_LIST', payload)},

  createUser : (context, payload) => {context.commit('CREATE_USER', payload)},
  setUser : (context, payload) => {context.commit('SET_USER', payload)},
  clearUser : (context, payload) => {context.commit('CLEAR_USER', payload)},

  deleteUser : (context, payload) => {context.commit('DELETE_USER', payload)},
  toggleVerified : (context, payload) => {
    context.commit('TOGGLE_VERIFIED', payload)
    context.commit('LOAD_LIST', payload)
  },

  async nuxtServerInit({ dispatch }) {
    console.log('nuxtServerInit run')
    await dispatch('loadData')
  }

}//ACTIONS
