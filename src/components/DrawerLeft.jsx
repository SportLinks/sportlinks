import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default function DrawerLeft (props) {

  var updateSW = () => {
    window.location.reload();
  }

  return (
    <Drawer
        docked={false}
        width={200}
        open={props.open}
        onRequestChange={() => props.onToggle()} >
        <List>
          <Subheader>Sport Links v0.1.4-25</Subheader>
          <Divider />
          <MenuItem onTouchTap={() => props.onToggle()}>Help</MenuItem>
          <Divider />
          <MenuItem onTouchTap={updateSW}>About</MenuItem>
          <Divider />
        </List>
    </Drawer>
  );

}
