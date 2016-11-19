import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';

export default function IconMenuExampleControlled (props) {

  var handleChange = (event, value) => {
    props.onSourceSelect(value);
  };

  return (
    <div>
      <IconMenu
        iconButtonElement={<IconButton><ContentFilter /></IconButton>}
        onChange={handleChange}
        value={props.source}
        multiple={false}>

        <MenuItem value="0" primaryText="All"  />
        <MenuItem value="1" primaryText="Acestream" />
        <MenuItem value="2" primaryText="Sopcast"  />

      </IconMenu>
    </div>
  );
}
