import { MetaTags } from '@redwoodjs/web'

import Game from 'src/components/Game/Game'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Game />
    </>
  )
}

export default HomePage
