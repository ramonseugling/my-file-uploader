import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import type { DeleteFileMutationVariables, FindFileById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  file: NonNullable<FindFileById['file']>
}

const File = ({ file }: Props) => {
  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File deleted')
      navigate(routes.files())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteFileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete file ' + id + '?')) {
      deleteFile({ variables: { id } })
      deleteFileOnStorage()
    }
  }

  const deleteFileOnStorage = async () => {
    try {
      console.log(file, 'fa')
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: file.title,
      })

      const data = await s3Client.send(command)
      console.log('Success. Object deleted.', data)
      return data
    } catch (err) {
      console.log('Error', err)
    }
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

      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a')
      // link.href = signedUrl
      link.target = '_blank'
      link.download = file.title
      document.body.appendChild(link)

      // Trigger the click event to start the download
      link.click()

      // Clean up the anchor element
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            File {file.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{file.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{file.title}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{file.url}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-blue"
          onClick={handleDownloadFile}
        >
          Download
        </button>
        <Link
          to={routes.editFile({ id: file.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(file.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default File
