import { useState } from 'react'

const Text = ({ anecdote, votes }) => {
  return (
    <div>
      <h2>Päivän anekdootti</h2>
      <p>{anecdote}</p>
      <p>Äänet: {votes}</p>
      <br/>
    </div>
  )
}

const BestOfTheDay = ({ anecdotes, votes }) => {
  const bestValue = Math.max(...votes)
  const bestIndex = votes.indexOf(bestValue)
  console.log("korkein", bestValue)
  return (
    <div>
      <h2>Suosituin anekdootti</h2>
      <p>{anecdotes[bestIndex]}</p>
      <p>Ääniä: {bestValue}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const points = new Array(anecdotes.length).fill(0)

  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(points)

  const handleNextCLick = () => {
    const luku = Math.floor(Math.random() * anecdotes.length)
    console.log(luku)
    console.log(votes)
    setSelected(luku)
  }

  const handleVoteClick = (index) => {
    const updatedVotes = votes.map((c, i) => {
      if (i === index) {
        return c + 1
      }
      return c
    })
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Text anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => handleVoteClick(selected)}>Äänestä</button>
      <button onClick={handleNextCLick}>Seuraava anekdootti</button>
      <BestOfTheDay anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App