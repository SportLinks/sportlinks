import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';

export default function IconMenuExampleControlled(props) {

  var handleChange = (event, value) => {
    props.onSourceSelect(value);
  };

  return (
    <div>
      <IconMenu
        iconButtonElement={<IconButton><ContentFilter /></IconButton>}
        onChange={handleChange}
        value={props.sourceId}
        multiple={false}>
        {
          props.sourceList.map(function(element, index) {
            return (
              <MenuItem key={element.id} value={element.id} primaryText={element.name}  />
            )
          })
        }
      </IconMenu>
    </div>
  );
}
