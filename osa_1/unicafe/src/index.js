import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatsItem = ({ name, amount }) => {
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
      <StatsItem name={"good"} amount={good} />
      <StatsItem name={"neutral"} amount={neutral} />
      <StatsItem name={"bad"} amount={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
