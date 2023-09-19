import { render } from '@redwoodjs/testing/web'

import UploadFilesPage from './UploadFilesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UploadFilesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadFilesPage />)
    }).not.toThrow()
  })
})
