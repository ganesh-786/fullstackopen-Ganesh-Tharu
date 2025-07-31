import React from "react";

function Button({ clickfunc, label }) {
  return <button onClick={clickfunc}>{label}</button>;
}

export default Button;
