import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {userAuthAction} from './reducers/user'
import PageHeader from '../../components/pageHeader'
import {login} from './services/authService'

function Login(props) {
  return(
    <MuiThemeProvider>
      <div>
        <PageHeader title={'Login'} />
        <div className={'text'}>Log in the application to use its advanced features:</div>
        <br /><br />
        <div style={{'textAlign': 'center'}}>
          <p className={'google-signin-btn'} onClick={props.handleLogin}/>
        </div>

      </div>
    </MuiThemeProvider>
  )
}

function handlelogin(dispatch) {
  login().then(
    (result) => {
      dispatch(userAuthAction())
    },
    (error) => {
      console.log(error)
    })
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: () => handlelogin(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Login)
