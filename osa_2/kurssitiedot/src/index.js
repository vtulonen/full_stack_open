import React from "react";
import ReactDOM from "react-dom";

const Course = ({ course }) => {
  return (
    <div className="course">
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div className="content">
      {course.parts.map((item) => (
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p className="part">
      {props.name} {props.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log(sum, part);
    return sum + part.exercises;
  }, 0);

  return <p className="total">Total of {total} excercises</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Test",
        exercises: 5,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
