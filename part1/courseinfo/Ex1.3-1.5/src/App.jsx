import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        title1={course.parts[0]}
        title2={course.parts[1]}
        title3={course.parts[2]}
      />
      <Total
        title1={course.parts[0]}
        title2={course.parts[1]}
        title3={course.parts[2]}
      />
    </div>
  );
};

export default App;
