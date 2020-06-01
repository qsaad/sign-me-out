import { fireAuth } from './firebase.js'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        //return resolve(store.commit('setUser', user))
        return resolve(store.dispatch('setUser', user))
      }
      return resolve()
    })
  })
}