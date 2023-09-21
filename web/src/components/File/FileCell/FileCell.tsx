import type { FindFileById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import File from 'src/components/File/File'

export const QUERY = gql`
  query FindFileById($id: String!) {
    file: file(id: $id) {
      id
      title
      version
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>File not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ file }: CellSuccessProps<FindFileById>) => {
  return <File file={file} />
}
