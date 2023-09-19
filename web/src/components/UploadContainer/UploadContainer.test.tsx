import { render } from '@redwoodjs/testing/web'

import UploadContainer from './UploadContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadContainer />)
    }).not.toThrow()
  })
})
