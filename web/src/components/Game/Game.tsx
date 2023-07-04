import { useState } from 'react'

const Game = () => {
  const countDown = 10

  const [score, setScore] = useState(0)
  const [timeUp, setTimeUp] = useState(false)
  const [lastHole, setLastHole] = useState(null)
  const [holes, setHoles] = useState(Array.from({ length: 6 }, () => false))
  const [addListener, setAddListener] = useState(false)
  const [timer, setTimer] = useState(countDown)

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
    const timeCount = setInterval(() => setTimer((prev) => prev - 1), 1000)

    setTimeout(() => {
      setTimeUp(true)
      setAddListener(false)
      alert('Times Up!')
      clearInterval(timeCount)
      setTimer(countDown)
    }, countDown * 1000)
  }

  const bonk = (index) => {
    if (holes[index]) {
      const updatedHoles = [...holes]
      updatedHoles[index] = false
      setHoles(updatedHoles)
      setScore((prev) => prev + 1)
    }
  }

  return (
    <div>
      <h1>
        Whack-a-mole! <span className="score">{score}</span>
      </h1>
      <button onClick={startGame} disabled={addListener}>
        Start! {timer < 10 ? `0${timer}` : timer}
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
