import { useRef, useState } from 'react'

import { FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

// import { UpdateFileInput } from '../../../../types/graphql'
import FileToBeUploaded from '../FileToBeUploaded/FileToBeUploaded'

import {
  Container,
  StyledDragFileContainer,
  StyledForm,
  StyledInputFileUpload,
  StyledLabelFileUpload,
  StyledUploadButton,
} from './FileForm.styles'

// type FormFile = NonNullable<EditFileById['file']>

interface FileFormProps {
  onSave: (file: File) => void
  error: RWGqlError
  loading: boolean
}

const FileForm = (props: FileFormProps) => {
  const [fileToBeUploaded, setFileToBeUploaded] = useState<File>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = () => {
    if (fileToBeUploaded) {
      props.onSave(fileToBeUploaded)
    }
  }

  const inputRef = useRef(null)

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFileTypeValidation(e.target.files[0])
    }
  }

  const handleFileTypeValidation = (file) => {
    const acceptedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'text/plain',
    ]

    if (acceptedTypes.includes(file.type)) {
      setFileToBeUploaded(file)
    } else {
      toast.error(
        'Unsupported file type. Please select a PDF, JPG, JPEG, or PNG file.'
      )
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
      handleFileTypeValidation(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFileToBeUploaded(null)
  }

  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <Container>
      <StyledForm
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

        {!fileToBeUploaded && (
          <>
            <StyledInputFileUpload
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept=".pdf, .jpg, .jpeg, .png, .txt"
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

        {fileToBeUploaded && (
          <FileToBeUploaded
            name={fileToBeUploaded.name}
            type={fileToBeUploaded.type}
            size={fileToBeUploaded.size}
            key={fileToBeUploaded.name}
            onRemoveFile={handleRemoveFile}
          />
        )}

        <div className="rw-button-group">
          <button
            type="submit"
            disabled={!fileToBeUploaded}
            className="rw-button rw-button-blue"
          >
            Save
          </button>
        </div>
      </StyledForm>
    </Container>
  )
}

export default FileForm
