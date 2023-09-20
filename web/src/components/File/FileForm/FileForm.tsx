import { useRef, useState } from 'react'

import type { EditFileById, UpdateFileInput } from 'types/graphql'

import { FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import FileToBeUploaded from '../../FileToBeUploaded/FileToBeUploaded'

import {
  StyledDragFileContainer,
  StyledForm,
  StyledInputFileUpload,
  StyledLabelFileUpload,
  StyledUploadButton,
} from './FileForm.styles'

type FormFile = NonNullable<EditFileById['file']>

interface FileFormProps {
  file?: EditFileById['file']
  onSave: (data: UpdateFileInput, id?: FormFile['id'], file?: File) => void
  error: RWGqlError
  loading: boolean
}

const FileForm = (props: FileFormProps) => {
  const [file, setFile] = useState<File>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (data: FormFile) => {
    if (file) {
      props.onSave(data, props?.file?.id, file)
    }
  }

  const inputRef = useRef(null)

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <div className="rw-form-wrapper">
      <StyledForm<FormFile>
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        error={props.error}
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {!file && (
          <>
            <StyledInputFileUpload
              ref={inputRef}
              type="file"
              onChange={handleChange}
            />
            <StyledLabelFileUpload htmlFor="input-file-upload">
              <div>
                <p>Drag and drop your file here or</p>
                <StyledUploadButton onClick={onButtonClick}>
                  Upload a file
                </StyledUploadButton>
              </div>
            </StyledLabelFileUpload>
            {dragActive && (
              <StyledDragFileContainer
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></StyledDragFileContainer>
            )}
          </>
        )}

        {file && (
          <FileToBeUploaded
            name={file.name}
            type={file.type}
            size={file.size}
            key={file.name}
            onRemoveFile={handleRemoveFile}
          />
        )}

        <div className="rw-button-group">
          <button
            type="submit"
            disabled={!file}
            className="rw-button rw-button-blue"
          >
            Save
          </button>
        </div>
      </StyledForm>
    </div>
  )
}

export default FileForm
