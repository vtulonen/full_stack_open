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
    return good / countSum();
  };

  return (
    <div className="stats">
      <StatsItem name={"good"} amount={good} />
      <StatsItem name={"neutral"} amount={neutral} />
      <StatsItem name={"bad"} amount={bad} />
      <StatsItem name={"sum"} amount={countSum()} />
      <StatsItem name={"average"} amount={countAverage()} />
      <StatsItem name={"positive"} amount={countPositive()} />
    </div>
  );
};
const StatsItem = ({ name, amount }) => {
  console.log(amount);
  return (
    <p>
      {name} {amount}
    </p>
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
