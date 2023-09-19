import { MetaTags } from '@redwoodjs/web'

import UploadContainer from '../../components/UploadContainer/UploadContainer'

const UploadFilesPage = () => {
  return (
    <>
      <MetaTags title="UploadFiles" description="UploadFiles page" />

      <UploadContainer />
    </>
  )
}

export default UploadFilesPage
