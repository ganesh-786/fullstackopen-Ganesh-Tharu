import React from "react";
import Part from "./Part";
function Content({
  title1,
  title2,
  title3,
  exercises1,
  exercises2,
  exercises3,
}) {
  return (
    <Part
      title1={title1}
      title2={title2}
      title3={title3}
      exercises1={exercises1}
      exercises2={exercises2}
      exercises3={exercises3}
    />
  );
}

export default Content;
