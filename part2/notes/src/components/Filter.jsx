import React from "react";

function Filter({ label, value, onChange }) {
  return (
    <div style={{ margin: "8px 0" }}>
      {label}: <input value={value} onChange={onChange} />
    </div>
  );
}

export default Filter;
