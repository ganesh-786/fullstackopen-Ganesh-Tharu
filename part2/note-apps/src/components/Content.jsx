import React from "react";
import Part from "./Part";

function Content({ coursepart, coursepart2, coursename1 }) {
  const arr = [
    coursepart[0].exercises,
    coursepart[1].exercises,
    coursepart[2].exercises,
    coursepart[3].exercises,
  ];
  const total = arr.reduce((acc, curr) => acc + curr);

  const arr1 = [coursepart2[0].exercises, coursepart2[1].exercises];
  const total1 = arr1.reduce((acc, curr) => acc + curr);
  return (
    <>
      <Part coursepart={coursepart} />
      <div className="container">
        <h3>
          total of {total + " "}
          exercises
        </h3>
      </div>
      <h1>{coursename1}</h1>
      <h4> {` ${coursepart2[0].name} ${coursepart2[0].exercises} `} </h4>

      <h4> {` ${coursepart2[1].name} ${coursepart2[1].exercises} `} </h4>
      <h3>
        total of {total1 + " "}
        exercises
      </h3>
    </>
  );
}

export default Content;
