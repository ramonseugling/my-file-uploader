import type { Prisma, File } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: {
      data: {
        title: 'String',
        version: 'Version 1',
        size: 10,
        user: {
          create: {
            id: '123',
            name: 'John doe',
            email: 'johndoe@email.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
