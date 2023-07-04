import React, { useState } from 'react'

const Game = () => {
  const [score, setScore] = useState(0)
  const [timeUp, setTimeUp] = useState(false)
  const [lastHole, setLastHole] = useState(null)
  const [holes, setHoles] = useState(Array.from({ length: 6 }, () => false))
  const [addListener, setAddListener] = useState(false)

  const randomTime = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const randomHole = () => {
    const holeIndex = Math.floor(Math.random() * holes.length)
    const hole = holes[holeIndex]
    if (hole === lastHole) {
      return randomHole()
    }
    setLastHole(hole)
    return holeIndex
  }

  const peep = () => {
    if (timeUp) return
    const time = randomTime(200, 1000)
    const holeIndex = randomHole()
    const updatedHoles = [...holes]
    updatedHoles[holeIndex] = true
    setHoles(updatedHoles)
    setTimeout(() => {
      const resetHoles = [...updatedHoles]
      resetHoles[holeIndex] = false
      setHoles(resetHoles)
      if (!timeUp) peep()
    }, time)
  }

  const startGame = () => {
    setScore(0)
    setTimeUp(false)
    setAddListener(true)
    peep()
    setTimeout(() => {
      setTimeUp(true)
      setAddListener(false)
      alert(`Wow! Your score is ${score}!`)
    }, 10000)
  }

  const bonk = (index) => {
    console.log('--this is addlistener', addListener)
    if (holes[index]) {
      const updatedHoles = [...holes]
      updatedHoles[index] = false
      setHoles(updatedHoles)
      setScore(score + 1)
    }
  }

  return (
    <div>
      <h1>
        Whack-a-mole! <span className="score">{score}</span>
      </h1>
      <button onClick={startGame} disabled={addListener}>
        Start!
      </button>

      <div className="game">
        {holes.map((hole, index) => (
          <button
            className={`hole hole${index + 1} ${
              addListener && hole ? 'up' : ''
            }`}
            key={index}
            onClick={() => addListener && bonk(index)}
          >
            <div className="mole"></div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Game
