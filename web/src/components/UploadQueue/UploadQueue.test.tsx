import { render } from '@redwoodjs/testing/web'

import UploadQueue from './UploadQueue'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadQueue', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadQueue />)
    }).not.toThrow()
  })
})
