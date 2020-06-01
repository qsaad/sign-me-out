export default({ store }) => {
    if (store.state.user.length === 0) {
        console.log('MIDDLEWARE - loadUser :' )
        return store.dispatch('setUser')
        
    }
}//EXPORT DEFAULT