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

import DragAndDrop from './DragAndDrop'

const meta: Meta<typeof DragAndDrop> = {
  component: DragAndDrop,
}

export default meta

type Story = StoryObj<typeof DragAndDrop>

export const Primary: Story = {}
