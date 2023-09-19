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

import UploadContainer from './UploadContainer'

const meta: Meta<typeof UploadContainer> = {
  component: UploadContainer,
}

export default meta

type Story = StoryObj<typeof UploadContainer>

export const Primary: Story = {}
