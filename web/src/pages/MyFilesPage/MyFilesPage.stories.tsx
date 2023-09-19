import type { Meta, StoryObj } from '@storybook/react'

import MyFilesPage from './MyFilesPage'

const meta: Meta<typeof MyFilesPage> = {
  component: MyFilesPage,
}

export default meta

type Story = StoryObj<typeof MyFilesPage>

export const Primary: Story = {}
