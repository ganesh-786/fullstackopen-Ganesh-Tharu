import React from "react";

function PersonForm({
  nameValue,
  numberValue,
  onNameChange,
  onNumberChange,
  onSubmit,
  isEditing,
  onCancelEdit,
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
        <button type="submit">{isEditing ? "update" : "add"}</button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{ marginLeft: 8 }}
          >
            cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PersonForm;
