import { render } from '@redwoodjs/testing/web'

import MyFilesPage from './MyFilesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyFilesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyFilesPage />)
    }).not.toThrow()
  })
})
