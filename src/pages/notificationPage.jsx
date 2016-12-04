import React from 'react'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import {browserHistory} from 'react-router'

const styles = {
  toolbarContainer: {
    position: 'fixed',
    width: '100%',
    zIndex: 1
  },
  box: {
    height: 65
  },
  text: {
    margin: '10px',
    padding: '0px'
  }
}

export default function Notification() {
  return(
    <MuiThemeProvider>
      <div>
        <div style={styles.toolbarContainer}>
          <AppBar
            title="Notification"
            iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
            onLeftIconButtonTouchTap={() => browserHistory.push('/')} />
        </div>
        <div style={styles.box}></div>
        <div style={styles.text}>
          Coming soon!
        </div>
      </div>
    </MuiThemeProvider>
  )
}
