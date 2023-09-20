export const schema = gql`
  type File {
    id: String!
    title: String!
    version: String!
    user: User!
    userId: String!
    createdAt: DateTime!
  }

  type Query {
    files: [File!]! @requireAuth
    file(id: String!): File @requireAuth
  }

  input CreateFileInput {
    title: String!
    version: String!
  }

  input UpdateFileInput {
    title: String
    version: String
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: String!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: String!): File! @requireAuth
  }
`
