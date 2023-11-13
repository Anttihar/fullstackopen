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

const Stats = ({good, neutral, bad, total, average}) => {
  if (total === 0) {
    return (
      <p>Palautetta ei ole vielä annettu</p>
    )
  }
  return (
    <div>
  <table>
    <tfoot align="left">
    <tr>
      <th>Hyvä:</th>
      <td>{good}</td>
    </tr>
    <tr>
      <th>Neutraali:</th>
      <td>{neutral}</td>
    </tr>
    <tr>
      <th>Huono:</th>
      <td>{bad}</td>
    </tr>
    <tr>
      <th>Yhteensä:</th>
      <td>{total}</td>
    </tr>
    <tr>
      <th>Keskiarvo:</th>
      <td>{average / total}</td>
    </tr>
    <tr>
      <th>Positiivisia:</th>
      <td>{good / total * 100}%</td>
    </tr>
    </tfoot>
  </table>
</div>
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
      <Stats good={good} neutral={neutral} bad={bad} total={total} average={average} />      
    </div>
  )
}

export default App