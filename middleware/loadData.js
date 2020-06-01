export default({ store }) => {
    if (store.state.data.length === 0) {
        console.log('MIDDLEWARE - LoadData')
        return store.dispatch('loadData')
    }
}//EXPORT DEFAULT