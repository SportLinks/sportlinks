/* global firebase:true */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {userAuthAction} from '../state/actions'
import PageHeader from '../components/pageHeader'

function Login(props) {
  return(
    <MuiThemeProvider>
      <div>
        <PageHeader title={'Login'} />
        <div className={'text'}>Log in the application to use its advanced features:</div>
        <br /><br />
        <div style={{'text-align': 'center'}}>
          <p className={'google-signin-btn'} onClick={props.handleLogin}/>
        </div>

      </div>
    </MuiThemeProvider>
  )
}

function login(dispatch) {
  let provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider).then(
    (result) => {
      dispatch(userAuthAction())
    },
    (error) => {
      console.log(error)
    })
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: () => login(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Login)
