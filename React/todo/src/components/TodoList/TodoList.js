import { useState } from "react";
import { TODO_ACTIONS } from "../../reducers/todoReducer";
import Todo from "../Todo/Todo";

const TodoList = ({ todos, todosDispatch }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    todosDispatch({
      type: TODO_ACTIONS.ADD,
      todo: { title },
    });

    setTitle("");
  };

  const sortAscendingByDueTime = (arr) => arr.sort((a, b) => a.dueTime - b.dueTime);

  return (
    <section className="todo-list" data-testid="todo-list">
      <h2>Your Todo List: </h2>
      {sortAscendingByDueTime(todos).map((todo) => (
        <Todo key={todo.id} todo={todo} todosDispatch={todosDispatch} />
      ))}
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add new todo item..."
          title="new todo"
          data-testid="todo-list.title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" data-testid="todo-list.add">Add</button>
      </form>
    </section>
  );
};

export default TodoList;
