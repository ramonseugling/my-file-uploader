// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import UploadActions from './UploadActions'

const meta: Meta<typeof UploadActions> = {
  component: UploadActions,
}

export default meta

type Story = StoryObj<typeof UploadActions>

export const Primary: Story = {}
