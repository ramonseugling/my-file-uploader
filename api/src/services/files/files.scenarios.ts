import type { Prisma, File } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: {
      data: {
        title: 'String',
        version: 'String',
        userId: 'String',
        size: 10,
      },
    },
    two: {
      data: {
        title: 'String',
        version: 'String',
        userId: 'String',
        size: 10,
      },
    },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
