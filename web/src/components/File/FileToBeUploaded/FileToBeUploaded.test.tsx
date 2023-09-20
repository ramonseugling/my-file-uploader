import { render } from '@redwoodjs/testing/web'

import FileToBeUploaded from './FileToBeUploaded'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileToBeUploaded', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileToBeUploaded />)
    }).not.toThrow()
  })
})
