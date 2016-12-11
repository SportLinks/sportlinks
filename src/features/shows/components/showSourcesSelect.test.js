import React, {Component, PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {getSourceList} from '../services/showsService'
import ShowSourcesSelect from './showSourcesSelect'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import TestUtils from 'react-addons-test-utils'
import Popover from 'material-ui/Popover'
import {simulateEvent, shallowWithContext, mountWithContext, rendererWithContext} from '../../../utils/test'
import renderer from 'react-test-renderer'

it('Snapshot test of showSourcesSelect', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <ShowSourcesSelect
        sourceId={'1'}
        sourceList={getSourceList()}
        onSourceSelect={()=>{}} />
    </MuiThemeProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('Open showSourcesSelect', () => {
  const wrapper = mountWithContext(
    <ShowSourcesSelect
      sourceId={'1'}
      sourceList={getSourceList()}
      onSourceSelect={(sourceId) => {console.log('sourceId ', sourceId)}} />
  )
  let popOver = wrapper.find(Popover).first()
  expect(popOver.prop('open')).toBe(false)
  simulateEvent(wrapper.find(IconButton).first(), 'touchTap')
  expect(popOver.prop('open')).toBe(true)
})

it('test', () => {
  const callback = jest.fn()
  const wrapper =  mountWithContext(
    <Checkbox
      label="Simple"
      onCheck={callback}
    />)

  expect(callback.mock.calls.length).toBe(0)
  wrapper.find('input').simulate('change')
  expect(callback.mock.calls.length).toBe(1)
})
