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
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import FeedbackIcon from 'material-ui/svg-icons/action/feedback'
import SystemUpdateIcon from 'material-ui/svg-icons/notification/system-update'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle'
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app'
import LiveTvIcon from 'material-ui/svg-icons/notification/live-tv'

import {CardHeader} from 'material-ui/Card';

const width = (window.innerWidth > 0) ? window.innerWidth : screen.width

function MenuPage(props){
  return (
    <MuiThemeProvider>
      <Drawer
        docked={false}
        width={width*0.8}
        open={props.openMenu}
        onRequestChange={() => props.handleToggleMenu()} >
        <List>
          <Subheader>
            <span style={{fontSize: '1.25em'}}>Sport Links {props.version ? 'v' + props.version : ''}</span>
          </Subheader>

          {(props.name !== undefined && props.name !== '') ?
          <CardHeader
            title={props.name}
            subtitle="jmlopezdona@gmail.com"
            avatar={props.avatar}
            style={{paddingRight: '0px'}}
          /> :
          <MenuItem
            onTouchTap={props.handleLogin}
            primaryText={'Login'}
            leftIcon={<AccountCircleIcon />} />
          }

          <MenuItem
            containerElement={<Link to={'/'} />}
            primaryText="Sporting Shows"
            leftIcon={<LiveTvIcon />} />

          <MenuItem
            containerElement={<Link to={'/notification'} />}
            primaryText="Notifications"
            leftIcon={<FeedbackIcon />} />

          <MenuItem
            containerElement={<Link to={'/help'} />}
            primaryText="Help"
            leftIcon={<HelpIcon />} />

          <Divider />

          {(props.name !== undefined && props.name !== '') ?
          <MenuItem
            onTouchTap={props.handleLogout}
            primaryText={'Logout'}
            leftIcon={<ExitToAppIcon />} />
          : '' }

          <MenuItem
            onTouchTap={props.handleCheckNewVersion}
            primaryText="Check for Update"
            leftIcon={<SystemUpdateIcon />} >
            <DialogSimple
              open={props.dialog.open}
              title={props.dialog.title}
              text={props.dialog.text}
              onRequestClose={props.handleCloseDialog}/>
          </MenuItem>
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
    avatar: state.getIn(['user', 'avatar']),
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
