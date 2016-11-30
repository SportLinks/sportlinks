/* global firebase:true */

import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Link} from 'react-router';
import getVersion from '../services/getVersion';
import DialogSimple from './Dialog';

const textStyles = {
  text: {
    "font-size": 'small',
    "padding-left": '12px'
  }
}

export default class DrawerLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        open: false
      },
      login: false
    };
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user: ' + user.displayName);
        this.setState({
          dialog: {
            open: this.state.dialog.open
          },
          login: true,
          name: user.displayName
        });
      }
    });
  }

  checkNewVersion = () => {
    getVersion().then((result) => {
      let version = result.data.version;
      if (version !== this.props.version) {
        this.setState({
          dialog: {
            open: true,
            text: 'New version found :-)',
            restart: true
          }
        });
      } else {
        this.setState({
          dialog: {
            open: true,
            text: 'No new version found'
          }
        });
      }
    });
  }

  handleClose = () => {
    let restart = this.state.dialog.restart;
    this.setState({
      dialog: {
        open: false
      }
    });
    if (restart) {
      window.location.reload();
    }
  };

  login = () => {
    if (!this.state.login) {
      firebase.auth().signInWithRedirect(this.provider);
    } else {
      firebase.auth().signOut().then(() => {
        this.setState({
          dialog: {
            open: this.state.dialog.open
          },
          login: false,
          name: ''
        });
      }, function(error) {
      // An error happened.
      });
    }
  }

  render() {
    return (
      <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={() => this.props.onToggle()} >
          <List>
            <Subheader><b>Sport Links {this.props.version ? 'v' + this.props.version: ''}</b></Subheader>
            <Divider />
            <MenuItem onTouchTap={this.login}>{(this.state.login)?'Logout':'Login'}</MenuItem>
            <Divider />
            <MenuItem
              containerElement={<Link to={'/help'} />}
              primaryText="Help" />
            <Divider />
            <MenuItem onTouchTap={this.checkNewVersion}>Check new version</MenuItem>
            <Divider />
            <br />
            <div style={textStyles.text}><span>{this.state.name}</span></div>
          </List>
          <DialogSimple
            open={this.state.dialog.open}
            title={'Information'}
            text={this.state.dialog.text}
            onRequestClose={this.handleClose}/>
      </Drawer>
    );
  }

}
