import React from "react";

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

const Part = ({ name, exercises }) => {
  return (
    <p className="part">
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <p className="total">Total of {total} excercises</p>;
};

export default Course;
