import {
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FileForm from 'src/components/File/FileForm'

import { Container } from './NewFile.styles'

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

  const onSave = async (file: File) => {
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

      const input = {
        title: file.name,
        version: Versions
          ? 'Version'.concat(' ', (Versions.length + 1).toString())
          : 'Version 1',
      }

      createFile({ variables: { input } })
    } catch (err) {
      toast.error(err)
      console.error(err)
    }
  }

  return (
    <Container>
      <FileForm onSave={onSave} loading={loading} error={error} />
    </Container>
  )
}

export default NewFile
