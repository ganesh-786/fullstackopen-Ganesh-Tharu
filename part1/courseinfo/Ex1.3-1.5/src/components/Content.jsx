import React from "react";
import Part from "./Part";
function Content({ title1, title2, title3 }) {
  return (
    <Part
      title1={title1.name}
      title2={title2.name}
      title3={title3.name}
      ex1={title1.exercises}
      ex2={title2.exercises}
      ex3={title3.exercises}
    />
  );
}

export default Content;
