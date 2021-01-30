import React, { useState } from "react";
import PropTypes from "prop-types";

function useInputValue(defaultValue = "") {
  const [value, setInputValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (e) => setInputValue(e.target.value),
    },

    value: () => value,
    clear: () => () => setInputValue(""),
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");

  function submitInputValue(e) {
    e.preventDefault();
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form onSubmit={submitInputValue}>
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
