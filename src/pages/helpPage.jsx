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

export default function Help() {
  return(
    <MuiThemeProvider>
      <div>
        <div style={styles.toolbarContainer}>
          <AppBar
            title="Help"
            iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
            onLeftIconButtonTouchTap={() => browserHistory.push('/')} />
        </div>
        <div style={styles.box}></div>
        <div style={styles.text}>
          This application is not for profit and is part of a proof of concept of a Progressive Web App.<br/><br/>
          The texts and links of sporting events shown in the application are collected from public webs.
          <br/><br/>
          Following are useful toolkits for displaying, as a test, the links of the application:          <ul>
            <li>
              <b>Acestream: </b> <a href="https://play.google.com/store/apps/details?id=org.acestream.media&hl=es">Google Play</a>
            </li>
            <br/>
            <li>
              <b>SopCast: </b> <a href="http://download.sopcast.com/download/SopCast.apk">Web SopCast</a>
            </li>
            <br/>
            <li>
              <b>Reproductor MX: </b> <a href="https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad&hl=es">Google Play</a>
            </li>
          </ul>
        </div>
      </div>
    </MuiThemeProvider>
  )
}
