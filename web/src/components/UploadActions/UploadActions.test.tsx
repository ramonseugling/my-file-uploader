import { render } from '@redwoodjs/testing/web'

import UploadActions from './UploadActions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadActions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadActions />)
    }).not.toThrow()
  })
})
