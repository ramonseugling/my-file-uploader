import { render } from '@redwoodjs/testing/web'

import DragAndDrop from './DragAndDrop'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DragAndDrop', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DragAndDrop />)
    }).not.toThrow()
  })
})
