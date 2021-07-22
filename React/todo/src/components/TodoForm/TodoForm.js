import { useRef, useEffect, useState } from "react";
import { TODO_ACTIONS } from "../../reducers/todoReducer";

const TodoForm = ({ todos, todosDispatch }) => {
  const inputRef = useRef();
  const [todo, setTodo] = useState();

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    todosDispatch({
      type: TODO_ACTIONS.UPDATE,
      todo: { ...todo },
    });

    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setTodo(todos.find((t) => t.active));
  }, [todos]);

  return (
    <section className="todo-details" data-testid="todo-form">
      <h2>Todo Details: </h2>
      {todo?.title ? (
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Build new React app..."
            data-testid="todo-form.title"
            required
            ref={inputRef}
            value={todo.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description..."
            data-testid="todo-form.description"
            value={todo.description}
            onChange={handleChange}
          />
          <div className="flex-wrap">
            <input
              type="date"
              name="dueDate"
              data-testid="todo-form.date"
              value={todo.dueDate}
              onChange={handleChange}
            />
            <label className="flex-wrap">
              Task Complete
              <input
                type="checkbox"
                name="complete"
                data-testid="todo-form.complete"
                checked={todo.complete}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="button-wrap">
            <button type="submit" data-testid="todo-form.update">
              Update
            </button>
            <button
              type="button"
              data-testid="todo-form.cancel"
              onClick={() => todosDispatch({ type: TODO_ACTIONS.DESELECT })}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p>Select a todo to view its details...</p>
      )}
    </section>
  );
};

export default TodoForm;
