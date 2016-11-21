import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Link} from 'react-router';
import getVersion from '../services/getVersion';

export default function DrawerLeft(props) {

  var checkNewVersion = () => {
    getVersion().then((result) => {
      let version = result.data.version;
      if (version !== props.version) {
        window.alert('New version found :-)');
        window.location.reload();
      } else {
        window.alert('No new version found');
      }
    });
  }

  return (
    <Drawer
        docked={false}
        width={200}
        open={props.open}
        onRequestChange={() => props.onToggle()} >
        <List>
          <Subheader><b>Sport Links {props.version ? 'v' + props.version: ''}</b></Subheader>
          <Divider />
          <MenuItem
            containerElement={<Link to={'/help'} />}
            primaryText="Help" />
          <Divider />
          <MenuItem onTouchTap={checkNewVersion}>Check new version</MenuItem>
          <Divider />
        </List>
    </Drawer>
  );

}
