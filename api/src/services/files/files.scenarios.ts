import type { Prisma, File } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: { data: { title: 'String', url: 'String' } },
    two: { data: { title: 'String', url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
