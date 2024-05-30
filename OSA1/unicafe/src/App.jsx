import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad,total,feedbacks}) => {
  
  const countAvg = (fb) => {
      if (fb.length === 0) return 0
      const sum = fb.reduce((acc, curr) => acc + curr, 0)
      return (sum / fb.length).toFixed(2)
  }

  const countPositive = (goods, totals) => {
    if (totals.length === 0 ) return '0'
    const positives = ((goods / totals) * 100).toFixed(2)
    return `${positives}%`
  }

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <table>
      <thead>
        <th> Statistic</th>
        <th> Value</th>
      </thead>
      <tbody>
      <StatisticLine text="good"     value = {good}/>
      <StatisticLine text="neutral"  value = {neutral} />
      <StatisticLine text="bad"      value = {bad} />
      <StatisticLine text="all"      value = {total} />
      <StatisticLine text="average"  value = {countAvg(feedbacks)} />
      <StatisticLine text="positive" value = {countPositive(good,total)} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedBacks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const goodClick = () => {
    setAll(allFeedBacks.concat(1))
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotal(updatedTotal)
  }
  
  const neutralClick = () => {
    setAll(allFeedBacks.concat(0))
    const updatedNeutral = neutral + 1
    const updatedTotal = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
  }

  const badClick = () => {
    setAll(allFeedBacks.concat(-1))
    const updatedBad = bad + 1
    const updatedTotal = good + neutral + updatedBad
    setBad(updatedBad)
    setTotal(updatedTotal)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {goodClick} text= "Good"/>
      <Button handleClick = {neutralClick} text= "Neutral"/>
      <Button handleClick = {badClick} text= "Bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} feedbacks={allFeedBacks}/>
    </div>
  )
}

export default App