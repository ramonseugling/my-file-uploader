import type {
  QueryResolvers,
  MutationResolvers,
  FileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const files: QueryResolvers['files'] = () => {
  return db.file.findMany({ where: { userId: context.currentUser.id } })
}

export const file: QueryResolvers['file'] = ({ id }) => {
  return db.file.findUnique({
    where: { id, userId: context.currentUser.id },
  })
}

export const createFile: MutationResolvers['createFile'] = ({ input }) => {
  return db.file.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateFile: MutationResolvers['updateFile'] = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id, userId: context.currentUser.id },
  })
}

export const deleteFile: MutationResolvers['deleteFile'] = ({ id }) => {
  return db.file.delete({
    where: { id, userId: context.currentUser.id },
  })
}

export const File: FileRelationResolvers = {
  user: (_obj, { root }) => {
    return db.file.findUnique({ where: { id: root?.userId } }).user()
  },
}
