import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';

export default function showSourcesSelect(props) {

  var handleChange = (event, value) => {
    console.log('event ', event)
    props.onSourceSelect(value || event.target.value);
  };

  return (
    <div>
      <IconMenu
        iconButtonElement={<IconButton><ContentFilter /></IconButton>}
        onChange={handleChange}
        value={props.sourceId}
        multiple={false}
        children={
          props.sourceList.map(function(element, index) {
            return (
              <MenuItem key={element.id} value={element.id} primaryText={element.name}  />
            )
          })
        }
      />
    </div>
  );
}
