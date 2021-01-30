import React, { Fragment, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Modal from "./Modal/Modal";

import Loader from "./Loader";

const AddTodo = React.lazy(() => import("./Todo/AddTodo"));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function removeAllTodos() {
    setTodos([]);
  }

  function addTodo(title) {
    const newTodo = [
      {
        title,
        id: new Date(),
        completed: false,
      },
    ];

    setTodos(todos.concat(newTodo));
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <div>Hello World</div>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <Fragment>
            <TodoList todos={todos} onToggle={toggleTodo} />
            <button onClick={removeAllTodos}>Delete all</button>
          </Fragment>
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
