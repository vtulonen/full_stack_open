import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const TopAnecdote = ({ anecdotes, votes }) => {
  const maxVote = Math.max(...votes);
  const indexOfMaxVote = votes.indexOf(maxVote);
  return maxVote > 0 ? (
    <p>{anecdotes[indexOfMaxVote]}</p>
  ) : (
    <p>No votes cast yet</p>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    let newNum = 0;
    while (newNum === selected) {
      newNum = randomInt(0, anecdotes.length);
    }
    setSelected(newNum);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleNextAnecdote} />

      <Title text={"Anecdote with most votes"} />
      <TopAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
