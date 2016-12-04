/* global firebase:true */

import React from 'react'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import {browserHistory} from 'react-router'
import {userAuthAction} from '../state/actions'

function Login(props) {
  return(
    <MuiThemeProvider>
      <div>
        <div className={'toolbar-container'}>
          <AppBar
            title="Login"
            iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
            onLeftIconButtonTouchTap={() => browserHistory.push('/')} />
        </div>
        <div className={'box'}></div>
        <br />
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
