import {
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { CreateFileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
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

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
    }
  }
`

const NewFile = () => {
  const [createFile, { loading, error }] = useMutation(CREATE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File created')
      navigate(routes.files())
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
  })

  const onSave = async (input: CreateFileInput, id?: string, file?: File) => {
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: file.name,
      Body: file,
    })

    const listObjectVersionsCommand = new ListObjectVersionsCommand({
      Bucket: bucket,
      Prefix: file.name,
    })

    try {
      const { Versions } = await s3Client.send(listObjectVersionsCommand)
      await s3Client.send(putObjectCommand)
      Object.assign(input, {
        ...input,
        title: file.name,
        version: Versions
          ? 'Version'.concat(' ', (Versions.length + 1).toString())
          : 'Version 1',
      })

      createFile({ variables: { input } })
    } catch (err) {
      toast.error(err)
      console.error(err)
    }
  }

  return (
    <div className="rw-segment-new-file">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New File</h2>
      </header>
      <div className="rw-segment-main">
        <FileForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFile
