import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PageHeader from '../../components/pageHeader'

export default function Notification() {
  return(
    <MuiThemeProvider>
      <div>
        <PageHeader title={'Notifications'} />
        <div className={'text'}>
          Coming soon!
        </div>
      </div>
    </MuiThemeProvider>
  )
}
