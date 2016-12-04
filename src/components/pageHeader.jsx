import React from 'react';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import {browserHistory} from 'react-router'

export default function pageHeader(props) {
  return (
    <div>
      <div className={'toolbar-container'}>
        <AppBar
          title={props.title}
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
          onLeftIconButtonTouchTap={() => browserHistory.push('/')} />
      </div>
      <div className={'box'}></div>
    </div>
  )
}
