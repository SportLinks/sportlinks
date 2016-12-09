/* global firebase:true */
import firebaseApp from '../../../utils/firebase_setup'
import firebase from 'firebase'

export const getUser = () => {
  return new Promise((resolve, reject) => {
    let unsubscribe = firebaseApp.auth().onAuthStateChanged(function(user) {
      unsubscribe()
      resolve(user)
    })
    setTimeout(() => reject(), 5000);
  })
}

export const login = () => {
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebaseApp.auth().signInWithRedirect(provider)
}

export const logout = () => {
  return firebaseApp.auth().signOut()
}

export const authUserListener = (nextState, replace, callback) => {
  getUser().then((user) => {
    if (!user) {
      if (localStorage) {
        localStorage.setItem('privatePage', nextState.location.pathname)
      }
      replace('/login')
    }
    callback()
  }).catch(() => {
    replace('/login')
    callback()
  })
}

export const loginListener = (nextState, replace, callback) => {
  getUser().then((user) => {
    if (user) {
      if (localStorage) {
        let privatePage = localStorage.getItem('privatePage') || '/'
        localStorage.removeItem('privatePage')
        replace(privatePage)
      } else {
        replace('/')
      }
    }
    callback()
  }).catch(() => callback())
}
