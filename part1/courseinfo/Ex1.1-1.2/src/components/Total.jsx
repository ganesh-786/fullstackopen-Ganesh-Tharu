import React from "react";

function Total({ exercises1, exercises2, exercises3 }) {
  return (
    <div>
      <h1>exercises count is: {exercises1 + exercises2 + exercises3}</h1>
    </div>
  );
}

export default Total;
