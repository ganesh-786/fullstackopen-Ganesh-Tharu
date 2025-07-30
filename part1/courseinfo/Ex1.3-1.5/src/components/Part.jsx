import React from "react";

function Part({ title1, title2, title3, ex1, ex2, ex3 }) {
  return (
    <div>
      <p>
        <pre>
          Titles: {title1}, {title2}, {title3} <br />
          Exercises: {ex1} , {ex2}, {ex3}
        </pre>
      </p>
    </div>
  );
}

export default Part;
