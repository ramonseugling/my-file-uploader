import { FilesProvider } from '../../contexts/FileContext/FilesProvider'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import UploadActions from '../UploadActions/UploadActions'
import UploadQueue from '../UploadQueue/UploadQueue'

const UploadContainer = () => {
  return (
    <FilesProvider>
      <DragAndDrop />
      <UploadQueue />
      <UploadActions />
    </FilesProvider>
  )
}

export default UploadContainer
