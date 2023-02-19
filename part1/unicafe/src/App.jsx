import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, weightedScore }) => {
  const total = good + neutral + bad;
  const weightedAverage = weightedScore / total;
  const positive = (good / total) * 100;

  if (!total) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={weightedAverage} />
          <StatisticLine text="Positive" value={`${ positive }%`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [weightedScore, setWeightedScore] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setWeightedScore(weightedScore + 1);
  };

  const handleNeutral = () => setNeutral(neutral + 1);

  const handleBad = () => {
    setBad(bad + 1);
    setWeightedScore(weightedScore - 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text="GOOD" />
      <Button handleClick={handleNeutral} text="NEUTRAL" />
      <Button handleClick={handleBad} text="BAD" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        weightedScore={weightedScore}
      />
    </div>
  );
};

export default App;
