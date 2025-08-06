import React from "react";

function PersonForm({
  nameValue,
  numberValue,
  onNameChange,
  onNumberChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} style={{ margin: "16px 0" }}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
