import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DialogSimple from '../components/dialogSimple'
import {closeDialogAction} from '../reducers/version'
import {connect} from 'react-redux'

function DialogPage(props) {
  return(
    <MuiThemeProvider>
      <DialogSimple
        open={props.open}
        title={props.title}
        text={props.text}
        onRequestClose={props.handleCloseDialog}/>
    </MuiThemeProvider>
  )
}

function mapStateToProps(state) {
  return state.getIn(['version','dialog']).toJS()
}

function mapDispatchToProps(dispatch) {
  return {
    handleCloseDialog: () => dispatch(closeDialogAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPage)
