import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { TODO_ACTIONS } from "../../../reducers/todoReducer";
import Todo from "../Todo";

afterEach(cleanup);

const TODO = {
  id: 1,
  active: false,
  complete: false,
  title: "TEMP TODO",
};

const DISPATCH = {
  todosDispatch: jest.fn(),
};

describe("<Todo /> Renders", () => {
  test("todo renders without crashing #1", () => {
    const { getByTestId } = render(
      <Todo todo={{ ...TODO, title: "Todo One" }} {...DISPATCH} />
    );
    const titleEl = getByTestId("todo.title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.textContent).toBe("Todo One");
  });

  test("todo renders without crashing #2", () => {
    const { getByTestId } = render(
      <Todo todo={{ ...TODO, title: "Todo Two" }} {...DISPATCH} />
    );
    const titleEl = getByTestId("todo.title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.textContent).toBe("Todo Two");
  });

  test("todo renders as incomplete", () => {
    const { getByTestId } = render(<Todo todo={{ ...TODO }} {...DISPATCH} />);
    const toggleEl = getByTestId("todo.complete");
    expect(toggleEl).not.toBeChecked();
  });

  test("todo renders as complete", () => {
    const { getByTestId } = render(
      <Todo todo={{ ...TODO, complete: true }} {...DISPATCH} />
    );
    const toggleEl = getByTestId("todo.complete");
    expect(toggleEl).toBeChecked();
  });

  test("todo renders as inactive", () => {
    const { getByTestId } = render(<Todo todo={{ ...TODO }} {...DISPATCH} />);
    const todoEl = getByTestId("todo");
    expect(todoEl.classList.contains("active")).toBe(false);
  });

  test("todo renders as active", () => {
    const { getByTestId } = render(
      <Todo todo={{ ...TODO, active: true }} {...DISPATCH} />
    );
    const todoEl = getByTestId("todo");
    expect(todoEl.classList.contains("active")).toBe(true);
  });
});

describe("<Todo /> Events", () => {
  beforeEach(() => render(<Todo todo={TODO} {...DISPATCH} />));

  test("edit event", () => {
    const editEl = screen.getByTestId('todo.select');
    fireEvent.click(editEl);
    expect(DISPATCH.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.SELECT,
      todo: {
        id: 1,
      },
    });
  });

  test("remove event", () => {
    const removeEl = screen.getByTestId('todo.remove');
    fireEvent.click(removeEl);
    expect(DISPATCH.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.REMOVE,
      todo: {
        id: 1,
      },
    });
  });

  test("toggle event", () => {
    const toggleEl = screen.getByTestId('todo.complete');
    fireEvent.click(toggleEl);
    expect(DISPATCH.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.TOGGLE,
      todo: {
        id: 1,
      },
    });
  });
});
