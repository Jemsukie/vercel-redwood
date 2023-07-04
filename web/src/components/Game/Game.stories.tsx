// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Game> = (args) => {
//   return <Game {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Game from './Game'

export const generated = () => {
  return <Game />
}

export default {
  title: 'Components/Game',
  component: Game,
} as ComponentMeta<typeof Game>
