import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Menu, MenuItem } from '@mui/material'
import type { DeleteFileMutationVariables, FindFileById } from 'types/graphql'

import { bytesToKilobytes, formatDate } from '../../../lib/formatters'

import {
  DocumentContainer,
  DocumentIconsContainer,
  DocumentInfoContainer,
  StyledDotsThreeOutline,
  StyledFolderNotchMinus,
  StyledMenuButton,
  StyledOtherProperties,
  StyledTitle,
} from './File.styles'

const secretAccessKey = process.env.REDWOOD_ENV_AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.REDWOOD_ENV_AWS_ACCESS_KEY_ID
const bucket = process.env.REDWOOD_ENV_S3_BUCKET
const region = process.env.REDWOOD_ENV_AWS_REGION

const s3Client = new S3Client({
  region,
  credentials: {
    secretAccessKey,
    accessKeyId,
  },
})

interface Props {
  file: NonNullable<FindFileById['file']>
  onDelete?: (id: DeleteFileMutationVariables['id'], title: string) => void
}

const File = ({ file, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const onDeleteClick = (id: DeleteFileMutationVariables['id']) => {
    onDelete(id, file.title)
  }

  const saveByteArray = (fileName, byte) => {
    const blob = new Blob([byte], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  const handleDownloadFile = async () => {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: file.title,
      })

      try {
        const response = await s3Client.send(command)
        const str = await response.Body.transformToByteArray()
        saveByteArray(file.title, str)
      } catch (err) {
        console.error(err)
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <DocumentContainer key={file.title}>
      <DocumentIconsContainer>
        <StyledFolderNotchMinus size={24} weight="fill" />
        <StyledMenuButton onClick={handleMenuClick}>
          <StyledDotsThreeOutline size={20} weight="fill" />
        </StyledMenuButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleDownloadFile()}>Download</MenuItem>
          <MenuItem onClick={() => onDeleteClick(file.id)}>Delete</MenuItem>
        </Menu>
      </DocumentIconsContainer>
      <DocumentInfoContainer>
        <StyledTitle>
          <span>{file.title}</span>
        </StyledTitle>
        <StyledOtherProperties>
          <span>{file.version}</span>
          {' | '}
          <span>{bytesToKilobytes(file.size)}KB</span>
          {' | '}
          <span>{formatDate(file.createdAt)}</span>
        </StyledOtherProperties>
      </DocumentInfoContainer>
    </DocumentContainer>
  )
}

export default File
