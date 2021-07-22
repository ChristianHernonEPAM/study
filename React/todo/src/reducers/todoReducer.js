// dispatch action options for todo reducer
export const TODO_ACTIONS = {
  ADD: "ADD_TODO",
  REMOVE: "REMOVE_TODO",
  TOGGLE: "TOGGLE_TODO",
  SELECT: "SELECT_TODO",
  DESELECT: "DESELECT_TODO",
  UPDATE: "UPDATE_TODO",
};

// key used for local storage
export const TODO_KEY = 'todo-list';

export const todoInit = () => JSON.parse(localStorage.getItem(TODO_KEY)) || [];

export const todoReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      const newTodo = {
        title: action.todo.title,
        description: "",
        dueDate: "",
        dueTime: "",
        complete: false,
        active: false,
        id: Date.now(),
      };
      return [...state, newTodo];
    case TODO_ACTIONS.REMOVE:
      return state.filter((todo) => todo.id !== action.todo.id);
    case TODO_ACTIONS.TOGGLE:
      return state.map((todo) => {
        return {
          ...todo,
          complete: todo.id === action.todo.id ? !todo.complete : todo.complete,
        };
      });
    case TODO_ACTIONS.SELECT:
      return state.map((todo) => {
        return { ...todo, active: todo.id === action.todo.id };
      });
    case TODO_ACTIONS.DESELECT:
      return state.map((todo) => ({ ...todo, active: false }));
    case TODO_ACTIONS.UPDATE:
      const dueTime = new Date(action.todo.dueDate).getTime();
      return state.map((todo) => {
        if (todo.id === action.todo.id)
          return { ...todo, ...action.todo, dueTime};
        else return todo;
      });
    default:
      return state;
  }
};