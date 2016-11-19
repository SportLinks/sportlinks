import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListShows from './components/ListShows';
import AppBar from 'material-ui/AppBar';
import SelectShowSources from './components/SelectShowSources'
import getShows from './services/getShows';

//this.URL_GET_SHOWS = 'https://sportlinks.herokuapp.com/shows';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.sourcesUrl = [
      'https://sportlinks.herokuapp.com/shows',
      'https://sportlinks.herokuapp.com/shows/acestream',
      'https://sportlinks.herokuapp.com/shows/sopcast'
    ];

    this.sourceNames = [
      'All',
      'Acestream',
      'Sopcast'
    ]

    this.state = {
      sourceId: '0',
      shows: [],
      loading: true
    }

    this.updateShowsList(this.state.sourceId);
  }

  updateShowsList = (sourceId) => {
    this.serverRequest = getShows(this.sourcesUrl[sourceId]).then((result) => {
      if (result != undefined) {
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
          <AppBar
            title="Sport Links"
            iconElementRight={<SelectShowSources source={this.state.sourceId} onSourceSelect={this.onSourceSelect}/>}
          />
          <ListShows shows={this.state.shows} source={this.sourceNames[this.state.sourceId]} loading={this.state.loading}/>
        </div>
      </MuiThemeProvider>
    );
  }

}
