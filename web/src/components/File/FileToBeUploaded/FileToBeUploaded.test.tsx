import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import FileToBeUploaded from './FileToBeUploaded'

describe('FileToBeUploaded', () => {
  const fileMock = {
    name: 'test-file.pdf',
    type: 'application/pdf',
    size: 1024,
  }

  it('renders successfully', () => {
    expect(() => {
      render(
        <FileToBeUploaded
          name={fileMock.name}
          size={fileMock.size}
          type={fileMock.type}
          key={fileMock.name}
          onRemoveFile={() => {}}
        />
      )
    }).not.toThrow()
  })

  it('renders file information correctly', () => {
    const { getByText } = render(
      <FileToBeUploaded
        name={fileMock.name}
        type={fileMock.type}
        size={fileMock.size}
        onRemoveFile={() => {}}
      />
    )

    expect(getByText('PDF')).toBeInTheDocument()
    expect(getByText('test-file.pdf')).toBeInTheDocument()
    expect(getByText('1 KB')).toBeInTheDocument()
  })

  it('calls onRemoveFile when remove button is clicked', () => {
    const onRemoveFileMock = jest.fn()
    const { getByTestId } = render(
      <FileToBeUploaded
        name={fileMock.name}
        type={fileMock.type}
        size={fileMock.size}
        onRemoveFile={onRemoveFileMock}
      />
    )

    const removeButton = getByTestId('remove-file-button') // Replace 'Remove' with the button text or label
    fireEvent.click(removeButton)

    expect(onRemoveFileMock).toHaveBeenCalledTimes(1)
  })
})
