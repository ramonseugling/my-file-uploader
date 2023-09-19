import type { Meta, StoryObj } from '@storybook/react'

import UploadFilesPage from './UploadFilesPage'

const meta: Meta<typeof UploadFilesPage> = {
  component: UploadFilesPage,
}

export default meta

type Story = StoryObj<typeof UploadFilesPage>

export const Primary: Story = {}
