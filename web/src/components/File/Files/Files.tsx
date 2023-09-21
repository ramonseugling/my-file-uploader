import { useRef } from 'react'

import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import type { DeleteFileMutationVariables, FindFiles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'
import { truncate } from 'src/lib/formatters'

import FileForm from '../FileForm/FileForm'

import {
  Container,
  DocumentContainer,
  DocumentIconsContainer,
  DocumentInfoContainer,
  DocumentsContainer,
  StyledDotsThreeOutline,
  StyledFolderNotchMinus,
  StyledMenuButton,
  StyledOtherProperties,
  StyledTitle,
} from './Files.styles'

const secretAccessKey = process.env.REDWOOD_ENV_AWS_SECRET_ACCESS_KEY // IAM user secret key
const accessKeyId = process.env.REDWOOD_ENV_AWS_ACCESS_KEY_ID // IAM user access id
const bucket = process.env.REDWOOD_ENV_S3_BUCKET // Bucket name
const region = process.env.REDWOOD_ENV_AWS_REGION // Region

const s3Client = new S3Client({
  region,
  credentials: {
    secretAccessKey,
    accessKeyId,
  },
})

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileMutation($id: String!) {
    deleteFile(id: $id) {
      id
    }
  }
`

const FilesList = ({ files }: FindFiles) => {
  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const onDeleteClick = (
    id: DeleteFileMutationVariables['id'],
    fileTitle: string
  ) => {
    if (confirm('Are you sure you want to delete file ' + fileTitle + '?')) {
      deleteFile({ variables: { id } })
      deleteFileOnStorage(fileTitle)
    }
    handleCloseMenu()
  }

  const deleteFileOnStorage = async (fileTitle) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileTitle,
      })

      await s3Client.send(command)
      handleCloseMenu()
    } catch (err) {
      console.log('Error', err)
    }
  }

  const handleDownloadFile = async (fileTitle) => {
    try {
      console.log(fileTitle, 'name')
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileTitle,
      })

      try {
        const response = await s3Client.send(command)
        const str = await response.Body.transformToByteArray()
        saveByteArray(fileTitle, str)
      } catch (err) {
        console.error(err)
      }

      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a')
      // link.href = signedUrl
      link.target = '_blank'
      link.download = fileTitle
      document.body.appendChild(link)

      // Trigger the click event to start the download
      link.click()

      // Clean up the anchor element
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const formattedDate = (datetime: ConstructorParameters<typeof Date>[0]) => {
    const parsedDate = new Date(datetime)
    const month = parsedDate.toLocaleString('default', { month: 'long' })
    return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
  }

  const saveByteArray = (fileName, byte) => {
    const blob = new Blob([byte], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  return (
    <Container>
      <span>Uploaded Documents</span>
      <DocumentsContainer>
        {files.map((file) => (
          <DocumentContainer key={file.title}>
            <DocumentIconsContainer>
              <StyledFolderNotchMinus size={24} weight="fill" />
              <StyledMenuButton onClick={handleMenuClick}>
                <StyledDotsThreeOutline size={20} weight="fill" />
              </StyledMenuButton>
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                <MenuItem onClick={() => handleDownloadFile(file.title)}>
                  Download
                </MenuItem>
                <MenuItem onClick={() => onDeleteClick(file.id, file.title)}>
                  Delete
                </MenuItem>
              </Menu>
            </DocumentIconsContainer>
            <DocumentInfoContainer>
              <StyledTitle>
                <span>{truncate(file.title)}</span>
              </StyledTitle>
              <StyledOtherProperties>
                <span>{truncate(file.version)}</span>{' '}
                <span>{truncate(file.version)}</span>
              </StyledOtherProperties>
            </DocumentInfoContainer>
          </DocumentContainer>
          // <tr key={file.id}>
          //   <td>{truncate(file.title)}</td>
          //   <td>{truncate(file.version)}</td>
          //   <td>
          //     <nav className="rw-table-actions">
          //       <Link
          //         to={routes.file({ id: file.id })}
          //         title={'Show file ' + file.id + ' detail'}
          //         className="rw-button rw-button-small"
          //       >
          //         Show
          //       </Link>
          //       <Link
          //         to={routes.editFile({ id: file.id })}
          //         title={'Edit file ' + file.id}
          //         className="rw-button rw-button-small rw-button-blue"
          //       >
          //         Edit
          //       </Link>
          //       <button
          //         type="button"
          //         title={'Delete file ' + file.id}
          //         className="rw-button rw-button-small rw-button-red"
          //         onClick={() => onDeleteClick(file.id, file.title)}
          //       >
          //         Delete
          //       </button>
          //     </nav>
          //   </td>
          // </tr>
        ))}
      </DocumentsContainer>

      {/* </tbody> */}
      {/* </table> */}
    </Container>
  )
}

export default FilesList
