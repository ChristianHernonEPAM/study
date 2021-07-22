import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Todo from "../Todo";
import { TODO_ACTIONS } from "../../../reducers/todoReducer";
import {TODO_ACTIONS} from './'

afterEach(cleanup);

const TODO_CONFIG = {
  todo: {
    id: 1,
    active: false,
    complete: false,
    title: "",
  },
  todosDispatch: jest.fn(),
};

describe("<Todo /> Renders", () => {
  test("todo renders without crashing #1", () => {
    const config = { ...TODO_CONFIG };
    config.todo.title = "Todo One";
    render(<Todo {...config} />);
    expect(screen.getByText(/todo one/i)).toBeInTheDocument();
  });

  test("todo renders without crashing #2", () => {
    const config = { ...TODO_CONFIG };
    config.todo.title = "Todo Two";
    render(<Todo {...config} />);
    expect(screen.getByText(/todo two/i)).toBeInTheDocument();
  });

  test("todo renders as incomplete", () => {
    render(<Todo {...TODO_CONFIG} />);
    expect(screen.getByTitle(/toggle/i)).not.toBeChecked();
  });

  test("todo renders as complete", () => {
    const config = { ...TODO_CONFIG };
    config.todo.complete = true;
    render(<Todo {...config} />);
    expect(screen.getByTitle(/toggle/i)).toBeChecked();
  });

  test("todo renders as inactive", () => {
    const { container } = render(<Todo {...TODO_CONFIG} />);
    expect(container.firstChild.classList.contains("active")).toBe(false);
  });

  test("todo renders as active", () => {
    const config = { ...TODO_CONFIG };
    config.todo.active = true;
    const { container } = render(<Todo {...config} />);
    expect(container.firstChild.classList.contains("active")).toBe(true);
  });
});

describe("<Todo /> Events", () => {
  beforeEach(() => render(<Todo {...TODO_CONFIG} />));

  test("edit event", () => {
    fireEvent.click(screen.getByTitle(/edit/i));
    expect(TODO_CONFIG.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.SELECT,
      todo: {
        id: 1,
      },
    });
  });

  test("remove event", () => {
    fireEvent.click(screen.getByTitle(/remove/i));
    expect(TODO_CONFIG.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.REMOVE,
      todo: {
        id: 1,
      },
    });
  });

  test("toggle event", () => {
    fireEvent.click(screen.getByTitle(/toggle/i));
    expect(TODO_CONFIG.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.TOGGLE,
      todo: {
        id: 1,
      },
    });
  });
});
