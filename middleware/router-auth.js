export default ({ store, redirect, route }) => {
  //console.log(store.state.user)
  //console.log("Route Name : " + route.name)
  store.state.user != null && route.name != 'login' ? redirect('/list') : redirect('/')
}