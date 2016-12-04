/* global firebase:true */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {toggleMenuAction, fetchVersionAction, receiveLogoutAction} from '../state/actions'
import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Link} from 'react-router'

const textStyles = {
  text: {
    "fontSize": 'small',
    "paddingLeft": '12px'
  }
}

function MenuPage(props){
  return (
    <MuiThemeProvider>
      <Drawer
        docked={false}
        width={200}
        open={props.openMenu}
        onRequestChange={() => props.handleToggleMenu()} >
        <List>
          <Subheader>
            <b>Sport Links {props.version ? 'v' + props.version : ''}</b>
          </Subheader>
          <Divider />
          <MenuItem
            containerElement={<Link to={'/help'} />}
            primaryText="Help" />
          <Divider />
          <MenuItem
            containerElement={<Link to={'/notification'} />}
            primaryText="Notifications" />
          <Divider />
          <MenuItem
            onTouchTap={props.handleCheckNewVersion}>
            Check for Update
          </MenuItem>
          <Divider />
          <MenuItem
            onTouchTap={(props.name) ? props.handleLogout : props.handleLogin}>
            {(props.name) ? 'Logout' : 'Login'}
          </MenuItem>
          <Divider />
          <br />
          <div style={textStyles.text}><span>{props.name}</span></div>
        </List>
      </Drawer>
    </MuiThemeProvider>
  )
}

function login() {
  browserHistory.push('/login')
}

function logout(dispatch) {
  firebase.auth().signOut().then(() => {
    dispatch(receiveLogoutAction())
  })
}

function mapStateToProps(state) {
  return {
    openMenu: state.getIn(['menu', 'open']),
    version: state.get('version'),
    name: state.getIn(['user', 'name'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleToggleMenu: () => dispatch(toggleMenuAction()),
    handleCheckNewVersion: () => dispatch(fetchVersionAction()),
    handleLogin: () => login(dispatch),
    handleLogout: () => logout(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)
