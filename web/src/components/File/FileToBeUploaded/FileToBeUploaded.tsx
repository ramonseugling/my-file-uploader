import { XCircle } from 'phosphor-react'

import { bytesToKilobytes } from '../../../lib/formatters'

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
          <span>{bytesToKilobytes(size)} KB</span>
        </StyledDocumentNameAndSizeContainer>
      </StyledDocumentInfoContainer>
      <StyledDocumentActionsContainer>
        <button type="button" onClick={onRemoveFile}>
          <XCircle
            size={24}
            color="	#ff3333"
            weight="fill"
            data-testid="remove-file-button"
          />
        </button>
      </StyledDocumentActionsContainer>
    </StyledContainer>
  )
}

export default FileToBeUploaded
