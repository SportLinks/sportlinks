import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListShows from './components/ListShows';
import AppBar from 'material-ui/AppBar';
import SelectShowSources from './components/SelectShowSources'
import getShows from './services/getShows';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.sourcesUrl = [
      'https://sportlinks.herokuapp.com/shows',
      'https://sportlinks.herokuapp.com/shows?type=acestream',
      'https://sportlinks.herokuapp.com/shows?type=sopcast'
    ];

    this.sourceNames = [
      'All',
      'Acestream',
      'Sopcast'
    ]

    this.state = {
      sourceId: '1',
      shows: [],
      loading: true
    }

    this.styles = {
      toolbarContainer: {
        position: 'fixed',
        width: '100%',
        zIndex: 1
      },
    	box: {
    		height: 65
    	}
    };

    this.updateShowsList(this.state.sourceId);
  }

  updateShowsList = (sourceId) => {
    this.serverRequest = getShows(this.sourcesUrl[sourceId]).then((result) => {
      if (result !== undefined) {
        this.setState({
          sourceId: sourceId,
          shows: result.data,
          loading: false
        })
      }
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  onSourceSelect = (sourceId) => {
    this.setState({
      sourceId: sourceId,
      shows: [],
      loading: true
    })
    this.updateShowsList(sourceId);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div style={this.styles.toolbarContainer}>
            <AppBar
              title="Sport Links"
              iconElementRight={<SelectShowSources
                                  source={this.state.sourceId}
                                  onSourceSelect={this.onSourceSelect}/>}
            />
          </div>
          <div style={this.styles.box}></div>
          <ListShows shows={this.state.shows} source={this.sourceNames[this.state.sourceId]} loading={this.state.loading}/>
        </div>
      </MuiThemeProvider>
    );
  }

}
