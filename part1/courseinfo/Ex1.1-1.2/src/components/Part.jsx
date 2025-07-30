import React from "react";

function Part({ title1, title2, title3, exercises1, exercises2, exercises3 }) {
  return (
    <div>
      <p>
        <pre>
          Titles: {title1}, {title2}, {title3} <br />
          Exercises: {exercises1} , {exercises2}, {exercises3}
        </pre>
      </p>
    </div>
  );
}

export default Part;
