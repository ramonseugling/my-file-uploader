import { XCircle } from 'phosphor-react'

import {
  StyledContainer,
  StyledDocumentActionsContainer,
  StyledDocumentInfoContainer,
  StyledDocumentNameAndSizeContainer,
  StyledDocumentTypeContainer,
} from './FileToBeUploaded.styles'

interface FileToBeUploadedProps {
  name: string
  type: string
  size: number
  onRemoveFile: () => void
}

const FileToBeUploaded = ({
  name,
  type,
  size,
  onRemoveFile,
}: FileToBeUploadedProps) => {
  const getFileExtension = (contentType: string): string => {
    const parts: string[] = contentType.split('/')
    return parts[1].toUpperCase()
  }

  return (
    <StyledContainer>
      <StyledDocumentInfoContainer>
        <StyledDocumentTypeContainer>
          {getFileExtension(type)}
        </StyledDocumentTypeContainer>
        <StyledDocumentNameAndSizeContainer>
          <span>{name}</span>
          <span>{size}</span>
        </StyledDocumentNameAndSizeContainer>
      </StyledDocumentInfoContainer>
      <StyledDocumentActionsContainer>
        <button type="button" onClick={onRemoveFile}>
          <XCircle size={24} color="#ff7f73" weight="fill" />
        </button>
      </StyledDocumentActionsContainer>
    </StyledContainer>
  )
}

export default FileToBeUploaded
