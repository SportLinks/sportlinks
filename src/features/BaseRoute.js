import React from 'react'
import MenuPage from './menu/menuPage'

export default React.createClass({
  render: function() {
    return (
      <div>
        <MenuPage />
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})
