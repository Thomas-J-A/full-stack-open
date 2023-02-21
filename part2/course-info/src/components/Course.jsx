const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
);

const Content = ({ parts }) => (
  parts.map((part) => (
    <Part key={part.id} part={part} />
  ))
);

const Course = ({ course }) => {
  const sum = course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
