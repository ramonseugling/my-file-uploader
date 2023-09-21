import type { File } from '@prisma/client'

import { files, file, createFile, updateFile, deleteFile } from './files'
import type { StandardScenario } from './files.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('files', () => {
  scenario('returns all files', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: '123', name: 'John Doe' })

    const result = await files()

    expect(result.length).toEqual(Object.keys(scenario.file).length)
  })

  scenario('returns a single file', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: '123', name: 'John Doe' })

    const result = await file({ id: scenario.file.one.id })

    expect(result).toEqual(scenario.file.one)
  })

  scenario('creates a file', async () => {
    mockCurrentUser({ id: '123', name: 'John Doe' })

    const result = await createFile({
      input: {
        title: 'String',
        version: 'String',
        size: 10,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.version).toEqual('String')
    expect(result.size).toEqual(10)
    expect(result.userId).toEqual('123')
  })

  scenario('updates a file', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: '123', name: 'John Doe' })

    const original = (await file({ id: scenario.file.one.id })) as File
    const result = await updateFile({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a file', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: '123', name: 'John Doe' })

    const original = (await deleteFile({ id: scenario.file.one.id })) as File
    const result = await file({ id: original.id })

    expect(result).toEqual(null)
  })
})
