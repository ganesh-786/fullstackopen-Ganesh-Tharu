import React from "react";

function Total({ title1, title2, title3 }) {
  return (
    <div>
      <h1>
        exercises count is:{" "}
        {title1.exercises + title2.exercises + title3.exercises}
      </h1>
    </div>
  );
}

export default Total;
