export default({ store }) => {
    if (store.state.list.length === 0) {
        console.log('MIDDLEWARE - LoadList')
        return store.dispatch('loadList')
    }
}//EXPORT DEFAULT