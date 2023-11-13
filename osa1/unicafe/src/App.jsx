import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stats = ({ stats, text }) => {
  return (
    <p>{text}{stats}</p>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutraClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text="Anna palautetta!" />
      <Button handleClick={goodClick} text="Hyvä!" />
      <Button handleClick={neutraClick} text="Neutraali" />
      <Button handleClick={badClick} text="Huono" />
      <Header text="Tilasto:" />
      <Stats stats={good} text="Hyvä: " />
      <Stats stats={neutral} text="Neutraali: " />
      <Stats stats={bad} text="Huono: " />
    </div>
  )
}

export default App