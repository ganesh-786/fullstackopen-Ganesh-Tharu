import React from "react";

function Part({ coursepart }) {
  return (
    <>
      <h4> {`${coursepart[0].name} ${coursepart[0].exercises}`} </h4>

      <h4> {`${coursepart[1].name} ${coursepart[1].exercises}`} </h4>

      <h4> {`${coursepart[2].name} ${coursepart[2].exercises}`} </h4>

      <h4> {`${coursepart[3].name} ${coursepart[3].exercises}`} </h4>
    </>
  );
}

export default Part;
