import React from "react";
import Header from "./Header";
import Content from "./Content";

function Course({ course }) {
  return (
    <>
      <Header coursename={course[0].name} />
      <Content
        coursepart={course[0].parts}
        coursepart2={course[1].parts}
        coursename1={course[1].name}
      />
    </>
  );
}

export default Course;
