import type { Prisma, File } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: { data: { title: 'String', version: 'String', userId: 'String' } },
    two: { data: { title: 'String', version: 'String', userId: 'String' } },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
