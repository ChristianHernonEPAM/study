import { useState } from "react";
import { useTodoContext } from "../../contexts/TodoContext";
import { TODO_ACTIONS } from "../../reducers/todoReducer";
import Todo from "../Todo/Todo";

const TodoList = (props) => {
  const { todos, todosDispatch } = useTodoContext();
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
    <section className="todo-list">
      <h2>Your Todo List: </h2>
      {todos?.length &&
        sortAscendingByDueTime(todos).map((todo) => (
          <Todo key={todo.id} todo={todo} todosDispatch={todosDispatch} />
        ))}
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add new todo item..."
          title="new todo"
          data-testid="newTodo"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

export default TodoList;
