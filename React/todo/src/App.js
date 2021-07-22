import "./App.scss";
import TodoProvider from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  return (
    <section className="todo-app">
      <h1>Yet Another Todo App!</h1>
      <TodoProvider>
        <section className="todo-display">
          <TodoList />
          <TodoForm />
        </section>
      </TodoProvider>
    </section>
  );
};

export default App;
