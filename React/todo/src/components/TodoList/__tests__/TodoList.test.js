import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TodoList from "./TodoList";
import TodoProvider from "../../../contexts/TodoContext";
import * as ReducerModule from "../../../reducers/todoReducer";

// import { TODO_ACTIONS, todoReducer } from "../reducers/todoReducer";
// jest.mock("../reducers/todoReducer", () => {
//   const original = jest.requireActual("../reducers/todoReducer");
//   return { ...original, todoReducer: jest.fn() };
// });

describe("<TodoList />", () => {
  beforeEach(() => {
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );
  });

  describe("Renders", () => {
    test("without crashing", () => {
      expect(screen.getByText(/your todo list/i)).toBeInTheDocument();
    });
  });

  describe("Events", () => {
    const reducerSpy = jest.spyOn(ReducerModule, "todoReducer").mockReturnValue([
      {
        id: 1,
        title: "mock todo",
        complete: false,
        active: false,
      },
    ]);
    const { TODO_ACTIONS } = ReducerModule;

    test("add new todo", () => {
      const input = screen.getByTitle(/new todo/i);
      const button = screen.getByText(/add/i);
      fireEvent.change(input, { target: { value: "New Temp Todo" } });
      fireEvent.click(button);
      expect(input.value).toBe("");
      expect(reducerSpy).toHaveBeenCalledWith([], {
        type: TODO_ACTIONS.ADD,
        todo: {
          title: "New Temp Todo",
        },
      });
    });
  });
});
