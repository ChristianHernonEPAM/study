import { render, screen, fireEvent } from "@testing-library/react";
import { TODO_ACTIONS } from "../../../reducers/todoReducer";
import TodoList from "../TodoList";

const PROPS = {
  todos: [
    {
      title: "Buy Groceries",
      id: 1,
    },
    {
      title: "Wash Car",
      id: 2,
    },
    {
      title: "Do Yardwork",
      id: 3,
    },
  ],
  todosDispatch: jest.fn(),
};

beforeEach(() => render(<TodoList {...PROPS} />));

describe("<TodoList /> Renders", () => {
  test("todolist renders without crashing", () => {
    const todoListEl = screen.getByTestId("todo-list");
    const inputEl = screen.getByTestId("todo-list.title");
    const buttonEl = screen.getByTestId("todo-list.add");
    expect(todoListEl).toBeInTheDocument();
    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test("todolist renders all todo items", () => {
    const todoOne = screen.getByText(/buy groceries/i);
    const todoTwo = screen.getByText(/wash car/i);
    const todoThree = screen.getByText(/do yardwork/i);
    expect(todoOne).toBeInTheDocument();
    expect(todoTwo).toBeInTheDocument();
    expect(todoThree).toBeInTheDocument();
  });
});

describe("<TodoList /> Events", () => {
  test("text change event", () => {
    const inputEl = screen.getByTestId("todo-list.title");
    expect(inputEl.value).toBe("");
    fireEvent.change(inputEl, { target: { value: "test" } });
    expect(inputEl.value).toBe("test");
  });

  test("add event", () => {
    const inputEl = screen.getByTestId("todo-list.title");
    const buttonEl = screen.getByTestId("todo-list.add");
    const expectedTitle = "wise shark";
    fireEvent.change(inputEl, { target: { value: expectedTitle } });
    fireEvent.click(buttonEl);
    expect(PROPS.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.ADD,
      todo: {
        title: expectedTitle,
      },
    });
    expect(inputEl.value).toBe("");
  });
});
