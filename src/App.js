import React from 'react'
import MenuPage from './pages/menuPage'
import DialogPage from './pages/dialogPage'

export default React.createClass({
  render: function() {
    return (
      <div>
        <MenuPage />
        <DialogPage />
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})
