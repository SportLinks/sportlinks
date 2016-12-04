import React from 'react'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import {browserHistory} from 'react-router'

export default function Notification() {
  return(
    <MuiThemeProvider>
      <div>
        <div className={'toolbar-container'}>
          <AppBar
            title="Notification"
            iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
            onLeftIconButtonTouchTap={() => browserHistory.push('/')} />
        </div>
        <div className={'box'}></div>
        <div className={'text'}>
          Coming soon!
        </div>
      </div>
    </MuiThemeProvider>
  )
}
