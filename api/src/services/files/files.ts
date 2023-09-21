import type {
  QueryResolvers,
  MutationResolvers,
  FileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const files: QueryResolvers['files'] = () => {
  return db.file.findMany()
}

export const file: QueryResolvers['file'] = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile: MutationResolvers['createFile'] = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile: MutationResolvers['updateFile'] = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

export const deleteFile: MutationResolvers['deleteFile'] = ({ id }) => {
  return db.file.delete({
    where: { id },
  })
}

export const File: FileRelationResolvers = {
  user: (_obj, { root }) => {
    return db.file.findUnique({ where: { id: root?.id } }).user()
  },
}
