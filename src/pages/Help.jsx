import React from 'react';
import {Link} from 'react-router';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {browserHistory} from 'react-router';

const appBarStyles = {
  toolbarContainer: {
    position: 'fixed',
    width: '100%',
    zIndex: 1
  },
  box: {
    height: 65
  }
};

const textStyles = {
  text: {
    margin: '10px',
    padding: '0px'
  }
}

export default function Results(props) {
  return(
    <MuiThemeProvider>
      <div>
        <div style={appBarStyles.toolbarContainer}>
          <AppBar
            title="Help"
            iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
            onLeftIconButtonTouchTap={() => browserHistory.goBack()} />
        </div>
        <div style={appBarStyles.box}></div>
        <div style={textStyles.text}>
          Esta aplicación no tiene animo de lucro y forma parte de una prueba de concepto de una Progressive Web App.
          <br/><br/>
          Los textos y enlaces de eventos deportivos que se muestran en la aplicación se recogen de web publicas.
          <br/><br/>
          A continuación se muestran los enlaces de herramientas de utilidad para visualizar, a modo de prueba, los enlaces de la aplicación:
          <ul>
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
  );
}
