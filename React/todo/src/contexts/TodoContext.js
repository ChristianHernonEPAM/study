import { createContext, useContext, useReducer, useEffect } from "react";
import { todoReducer, todoInit, TODO_KEY } from "../reducers/todoReducer";

export const TodoContext = createContext();
export const useTodoContext = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todoReducer, [], todoInit);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, todosDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
