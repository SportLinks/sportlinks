/* global firebase:true */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux'
import {toggleMenuAction} from './reducers/menu'
import {fetchVersionAction, closeDialogAction} from './reducers/version'
import {receiveLogoutAction} from '../login/reducers/user'
import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Link} from 'react-router'
import {logout} from '../login/services/authService'
import DialogSimple from '../../components/dialogSimple'

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
            <DialogSimple
              open={props.dialog.open}
              title={props.dialog.title}
              text={props.dialog.text}
              onRequestClose={props.handleCloseDialog}/>          </MenuItem>
          <Divider />
          <MenuItem
            onTouchTap={(props.name) ? props.handleLogout : props.handleLogin}>
            {(props.name) ? 'Logout' : 'Login'}
          </MenuItem>
          <Divider />
          <br />
          <div className={'text'}><span>{props.name}</span></div>
        </List>
      </Drawer>
    </MuiThemeProvider>
  )
}

function handleLogin() {
  browserHistory.push('/login')
}

function handleLogout(dispatch) {
  logout().then(() => {
    dispatch(receiveLogoutAction())
  })
}

function mapStateToProps(state) {
  return {
    openMenu: state.getIn(['menu', 'open']),
    version: state.getIn(['version','number']),
    name: state.getIn(['user', 'name']),
    dialog: state.getIn(['version','dialog']).toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleToggleMenu: () => dispatch(toggleMenuAction()),
    handleCheckNewVersion: () => dispatch(fetchVersionAction()),
    handleLogin: () => handleLogin(dispatch),
    handleLogout: () => handleLogout(dispatch),
    handleCloseDialog: () => dispatch(closeDialogAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)
