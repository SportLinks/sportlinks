import {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {shallow, mount} from 'enzyme'

const muiTheme = getMuiTheme();

export function simulateEvent(wrappedTarget, eventType) {
  if (wrappedTarget.node) {
    // wrappedTarget was obtained using enzyme's mount()
    const domNode = ReactDOM.findDOMNode(wrappedTarget.node)
    TestUtils.Simulate[eventType](domNode)
  } else {
    // wrappedTarget was obtained using enzyme's shallow()
    wrappedTarget.simulate(eventType)
  }
}

export const shallowWithContext = (node) => shallow(node, {context: {muiTheme}})

export const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object}
})
