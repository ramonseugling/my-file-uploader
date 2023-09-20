import {
  DeleteObjectCommand,
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import type { EditFileById, UpdateFileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FileForm from 'src/components/File/FileForm'

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

export const QUERY = gql`
  query EditFileById($id: String!) {
    file: file(id: $id) {
      id
      title
      version
    }
  }
`
const UPDATE_FILE_MUTATION = gql`
  mutation UpdateFileMutation($id: String!, $input: UpdateFileInput!) {
    updateFile(id: $id, input: $input) {
      id
      title
      version
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ file }: CellSuccessProps<EditFileById>) => {
  const [updateFile, { loading, error }] = useMutation(UPDATE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File updated')
      navigate(routes.files())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = async (
    input: UpdateFileInput,
    id: EditFileById['file']['id'],
    newFile: File
  ) => {
    console.log(file.title, 'atual')
    console.log(newFile.name, 'ovo')

    try {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: bucket,
        Key: file.title,
      })

      await s3Client.send(deleteObjectCommand)

      const putObjectCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: newFile.name,
        Body: newFile,
      })

      await s3Client.send(putObjectCommand)

      const listObjectVersionsCommand = new ListObjectVersionsCommand({
        Bucket: bucket,
        Prefix: newFile.name,
      })

      const { Versions } = await s3Client.send(listObjectVersionsCommand)

      Object.assign(input, {
        ...input,
        title: newFile.name,
        version: Versions
          ? 'Version'.concat(' ', (Versions.length + 1).toString())
          : 'Version 1',
      })

      updateFile({ variables: { id, input } })
    } catch (err) {
      toast.error(err)
      console.error(err)
    }
  }

  return (
    <div className="rw-segment-new-file">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit File: {file?.title}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FileForm file={file} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
