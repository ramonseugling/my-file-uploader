import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import File from './File'

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(() => ({
    send: jest.fn(),
  })),
  GetObjectCommand: jest.fn(),
}))

describe('File Component', () => {
  const fileMock = {
    id: '1',
    title: 'test-file.pdf',
    version: '1.0',
    size: 1024,
    createdAt: '2023-09-21T00:00:00Z',
  }

  it('displays file information correctly', () => {
    const { getByText } = render(<File file={fileMock} />)

    expect(getByText('test-file.pdf')).toBeInTheDocument()
    expect(getByText('1.0')).toBeInTheDocument()
    expect(getByText('1KB')).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn()
    const { getByTestId, getByText } = render(
      <File file={fileMock} onDelete={onDeleteMock} />
    )

    fireEvent.click(getByTestId('actions-menu-button'))
    fireEvent.click(getByText('Delete'))

    expect(onDeleteMock).toHaveBeenCalledWith('1', 'test-file.pdf')
  })
})
