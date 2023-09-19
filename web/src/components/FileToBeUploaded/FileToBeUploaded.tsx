import { XCircle } from 'phosphor-react'

import { useFilesContext } from '../../contexts/FileContext/useFiles'

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
}

const FileToBeUploaded = ({ name, type, size }: FileToBeUploadedProps) => {
  const { onRemoveFile } = useFilesContext()

  return (
    <StyledContainer>
      <StyledDocumentInfoContainer>
        <StyledDocumentTypeContainer>PDF</StyledDocumentTypeContainer>
        <StyledDocumentNameAndSizeContainer>
          <span>{name}</span>
          <span>{size}</span>
        </StyledDocumentNameAndSizeContainer>
      </StyledDocumentInfoContainer>
      <StyledDocumentActionsContainer>
        <button type="button" onClick={() => onRemoveFile(name)}>
          <XCircle size={24} color="#ff7f73" weight="fill" />
        </button>
      </StyledDocumentActionsContainer>
    </StyledContainer>
  )
}

export default FileToBeUploaded
