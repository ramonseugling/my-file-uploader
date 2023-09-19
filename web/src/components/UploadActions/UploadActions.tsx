import { useFilesContext } from '../../contexts/FileContext/useFiles'

import {
  StyledContainer,
  StyledUploadButton,
  StyledClearButton,
} from './UploadActions.styles'

const UploadActions = () => {
  const { filesSelected, clearFilesSelected } = useFilesContext()

  return (
    <StyledContainer>
      <StyledUploadButton
        type="button"
        onClick={() => console.log(filesSelected)}
      >
        Upload
      </StyledUploadButton>
      <StyledClearButton type="button" onClick={clearFilesSelected}>
        Clear
      </StyledClearButton>
    </StyledContainer>
  )
}

export default UploadActions
