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

const Average = ({ average, total, text }) => {
  if (total === 0) {
    return (
    <p>{text}0</p>
    )
  }
  return (
     <p>{text}{average / total}</p>
  )
}

const Prosent = ({ good, total, text }) => {
  if (total === 0) {
    return (
      <p>{text}0</p>
    )
  }
  return (
    <p>{text}{good / total * 100}%</p>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ average, setAverage ] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(average + 1 )
  }
  const neutraClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage(average - 1)
  }

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
      <Stats stats={total} text="Yhteensä: " />
      <Average average={average} total={total} text="Keskiarvo: " />
      <Prosent good={good} total={total} text="Positiivisia: " />
    </div>
  )
}

export default App