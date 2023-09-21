import type { FindFiles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Files from 'src/components/File/Files'

export const QUERY = gql`
  query FindFiles {
    files {
      id
      title
      version
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No files yet. '}
      <Link to={routes.newFile()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ files }: CellSuccessProps<FindFiles>) => {
  return <Files files={files} />
}
