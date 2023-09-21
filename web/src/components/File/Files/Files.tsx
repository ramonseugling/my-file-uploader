import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { DeleteFileMutationVariables, FindFiles } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'

import File from '../File/File'

import { Container, DocumentsContainer } from './Files.styles'

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

  const handleOnDeleteClick = (
    id: DeleteFileMutationVariables['id'],
    fileTitle: string
  ) => {
    if (confirm('Are you sure you want to delete file ' + fileTitle + '?')) {
      deleteFile({ variables: { id } })
      deleteFileOnStorage(fileTitle)
    }
  }

  const deleteFileOnStorage = async (fileTitle) => {
    try {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileTitle,
      })

      await s3Client.send(deleteObjectCommand)
    } catch (err) {
      console.log('Error', err)
    }
  }

  return (
    <Container>
      <DocumentsContainer>
        {files.map((file) => (
          <File key={file.id} file={file} onDelete={handleOnDeleteClick} />
        ))}
      </DocumentsContainer>
    </Container>
  )
}

export default FilesList
