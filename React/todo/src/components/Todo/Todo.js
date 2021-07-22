import { TODO_ACTIONS } from "../../reducers/todoReducer";

const Todo = ({ todo, todosDispatch }) => {
  const handleDispatch = (actionType, id) => {
    todosDispatch({
      type: actionType,
      todo: { id },
    });
  };

  return (
    <div className={todo.active ? "todo-item active" : "todo-item"}>
      <input
        type="checkbox"
        className="todo-item-state"
        title="toggle"
        checked={todo.complete}
        onChange={() => handleDispatch(TODO_ACTIONS.TOGGLE, todo.id)}
      />
      <span className="todo-item-name" data-complete={todo.complete}>
        {todo.title}
      </span>
      <div className="button-wrap">
        <button
          type="button"
          className="todo-item-button edit"
          title="Edit"
          onClick={() => handleDispatch(TODO_ACTIONS.SELECT, todo.id)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          type="button"
          className="todo-item-button remove"
          title="Remove"
          onClick={() => handleDispatch(TODO_ACTIONS.REMOVE, todo.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
