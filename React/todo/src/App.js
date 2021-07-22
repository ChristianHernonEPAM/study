import "./App.scss";
import { useTodoContext } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  const todoContext = useTodoContext();
  return (
    <section className="todo-app">
      <h1>Yet Another Todo App!</h1>
      <section className="todo-display">
        <TodoList {...todoContext} />
        <TodoForm {...todoContext} />
      </section>
    </section>
  );
};

export default App;
