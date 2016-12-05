/* global firebase:true */

export const getUser = () => {
  return new Promise((resolve, reject) => {
    let unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      unsubscribe()
      resolve(user)
    })
    setTimeout(() => reject(), 5000);
  })
}

export const login = () => {
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithRedirect(provider)
}

export const logout = () => {
  return firebase.auth().signOut()
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
