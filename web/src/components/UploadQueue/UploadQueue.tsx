import { useFilesContext } from '../../contexts/FileContext/useFiles'
import FileToBeUploaded from '../FileToBeUploaded/FileToBeUploaded'

import {
  StyledContainer,
  StyledQueueContainer,
  StyledTitle,
} from './UploadQueue.styles'

const UploadQueue = () => {
  const { filesSelected } = useFilesContext()

  return (
    <StyledContainer>
      <StyledTitle>Upload Queue</StyledTitle>
      <StyledQueueContainer>
        {filesSelected.map((file) => (
          <FileToBeUploaded
            key={file.name}
            name={file.name}
            size={file.size}
            type={file.type}
          />
        ))}
      </StyledQueueContainer>
    </StyledContainer>
  )
}

export default UploadQueue
