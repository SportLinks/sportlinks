import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default function DialogSimple(props) {

  const actions = [
    <FlatButton
      label="Ok"
      primary={true}
      onTouchTap={() => props.onRequestClose()}
    />
  ];

  return (
    <div>
      <Dialog
        title={props.title}
        actions={actions}
        modal={true}
        open={props.open}
        onRequestClose={() => props.onRequestClose()} >
        {props.text}
      </Dialog>
    </div>
  );
}
