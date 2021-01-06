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

  const handleClick = (e) => {
    const clickedBtn = e.target.innerHTML;
    switch (clickedBtn) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Title text={feedbackTitle} />
      <Button text={"good"} handleClick={handleClick} />
      <Button text={"neutral"} handleClick={handleClick} />
      <Button text={"bad"} handleClick={handleClick} />
      <Title text={statsTitle} />
      {good + neutral + bad > 0 ? (
        <Stats good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
