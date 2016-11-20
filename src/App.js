import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListShows from './components/ListShows';
import AppBar from 'material-ui/AppBar';
import DrawerLeft from './components/DrawerLeft';
import SelectShowSources from './components/SelectShowSources'
import getShows from './services/getShows';

const sourcesUrl = [
  'https://sportlinks.herokuapp.com/shows',
  'https://sportlinks.herokuapp.com/shows?type=acestream',
  'https://sportlinks.herokuapp.com/shows?type=sopcast'
];

const sourceNames = [
  'All',
  'Acestream',
  'Sopcast'
];

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

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sourceId: '1',
      shows: [],
      loading: true,
      menuOpen: false
    };

    this.updateShowsList(this.state.sourceId);
  }

  updateShowsList = (sourceId) => {
    this.serverRequest = getShows(sourcesUrl[sourceId]).then((result) => {
      if (result !== undefined) {
        this.setState({
          sourceId: sourceId,
          shows: result.data,
          loading: false,
          openMenu: false
        })
      }
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleSourceSelect = (sourceId) => {
    this.setState({
      sourceId: sourceId,
      shows: [],
      loading: true,
      openMenu: this.state.openMenu
    })
    this.updateShowsList(sourceId);
  }

  handleToggleMenu = () => {
    this.setState({
      sourceId: this.state.sourceId,
      shows: this.state.shows,
      loading: this.state.loading,
      openMenu: !this.state.openMenu
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div style={appBarStyles.toolbarContainer}>
            <AppBar
              title="Sport Links"
              iconElementRight={<SelectShowSources
                                  source={this.state.sourceId}
                                  onSourceSelect={this.handleSourceSelect}/>}
              onLeftIconButtonTouchTap={this.handleToggleMenu} />
            <DrawerLeft open={this.state.openMenu} onToggle={this.handleToggleMenu}/>
          </div>
          <div style={appBarStyles.box}></div>
          <ListShows
            shows={this.state.shows}
            source={sourceNames[this.state.sourceId]}
            loading={this.state.loading} />
        </div>
      </MuiThemeProvider>
    );
  }

}
