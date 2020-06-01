export default({ store, route, redirect }) => {
    if(!store.getters.isAuthenticated && route.name !== 'login'){
      console.log('MIDDLEWARE - Auth : Not Authenticated' )

      redirect('/login')
    }
    else{
      console.log('MIDDLEWARE - Auth :' + store.getters.getEmail)
    }
  }