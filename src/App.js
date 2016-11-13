import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListShows from './components/ListShows';
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Sport Links" />
      <ListShows />
    </div>
  </MuiThemeProvider>
);

export default App;
