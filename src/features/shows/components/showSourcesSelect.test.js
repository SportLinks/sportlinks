import React from 'react'
import renderer from 'react-test-renderer'
import {getSourceList} from '../services/showsService'
import ShowSourcesSelect from './showSourcesSelect'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function handleSourceSelect() {}

test('Snapshot test', () => {
  const component = renderer.create(
    <MuiThemeProvider>
      <ShowSourcesSelect
        sourceId={'1'}
        sourceList={getSourceList()}
        onSourceSelect={handleSourceSelect} />
    </MuiThemeProvider>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
});
