import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { DeleteFileMutationVariables, FindFiles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'
import { truncate } from 'src/lib/formatters'

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

  const onDeleteClick = (
    id: DeleteFileMutationVariables['id'],
    fileTitle: string
  ) => {
    if (confirm('Are you sure you want to delete file ' + id + '?')) {
      deleteFile({ variables: { id } })
      deleteFileOnStorage(fileTitle)
    }
  }

  const deleteFileOnStorage = async (fileTitle) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileTitle,
      })

      const data = await s3Client.send(command)
      console.log('Success. Object deleted.', data)
      return data
    } catch (err) {
      console.log('Error', err)
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>File name</th>
            <th>Version</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{truncate(file.title)}</td>
              <td>{truncate(file.version)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.file({ id: file.id })}
                    title={'Show file ' + file.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFile({ id: file.id })}
                    title={'Edit file ' + file.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete file ' + file.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(file.id, file.title)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilesList
