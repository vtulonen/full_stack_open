import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Stats = ({ good, neutral, bad }) => {
  const countSum = () => {
    return good + neutral + bad;
  };
  const countAverage = () => {
    return (good - bad) / countSum();
  };
  const countPositive = () => {
    return (good / countSum()) * 100;
  };

  return (
    <table className="stats">
      <tbody>
        <StatsItem name={"good"} amount={good} />
        <StatsItem name={"neutral"} amount={neutral} />
        <StatsItem name={"bad"} amount={bad} />
        <StatsItem name={"sum"} amount={countSum()} />
        <StatsItem name={"average"} amount={countAverage().toFixed(1)} />
        <StatsItem
          name={"positive"}
          amount={countPositive().toFixed(1)}
          sign={"%"}
        />
      </tbody>
    </table>
  );
};
const StatsItem = ({ name, amount, sign }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {amount} {sign}
      </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackTitle = "Give feedback";
  const statsTitle = "Statistics";

  return (
    <div>
      <Title text={feedbackTitle} />
      <Button text={"good"} handleClick={() => setGood(good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad(bad + 1)} />
      <Title text={statsTitle} />

      {good + neutral + bad > 0 ? ( // if
        <Stats good={good} neutral={neutral} bad={bad} /> // render if true
      ) : (
        <p>No feedback given yet</p> // render if false
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
