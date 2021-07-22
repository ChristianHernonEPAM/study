import { render, screen, fireEvent } from "@testing-library/react";
import { TODO_ACTIONS } from "../../../reducers/todoReducer";
import TodoForm from "../TodoForm";

const TODO = {
  id: 1,
  title: "Test Todo",
  active: false,
  complete: false,
  description: 'Some todo description',
};

const DISPATCH = {
  todosDispatch: jest.fn(),
};

describe("<TodoForm /> Renders", () => {
  describe("with no active todo", () => {
    beforeEach(() => render(<TodoForm todos={[{ ...TODO }]} {...DISPATCH} />));

    test("todoform renders without crashing", () => {
      const formEl = screen.getByTestId("todo-form");
      expect(formEl).toBeInTheDocument();
    });

    test("select todo to begin message displays", () => {
      const message = screen.getByText(/select a todo to view its details/i);
      expect(message).toBeInTheDocument();
    });
  });

  describe("with active todo", () => {
    beforeEach(() =>
      render(<TodoForm todos={[{ ...TODO, active: true }]} {...DISPATCH} />)
    );

    test("todoform renders without crashing", () => {
      const formEl = screen.getByTestId("todo-form");
      expect(formEl).toBeInTheDocument();
    });

    test("select todo to begin message does not display", () => {
      const message = screen.queryByText(/select a todo to view its details/i);
      expect(message).not.toBeInTheDocument();
    });

    test("todoform title prefills", () => {
      const titleEl = screen.getByTestId("todo-form.title");
      expect(titleEl).toBeInTheDocument();
      expect(titleEl.value).toBe("Test Todo");
    });

    test("todoform title updates", () => {
      const titleEl = screen.getByTestId("todo-form.title");
      const expectedTitle = "Send Bezos to Space!";
      expect(titleEl.value).toBe("Test Todo");
      fireEvent.change(titleEl, { target: { value: expectedTitle } });
      expect(titleEl.value).toBe(expectedTitle);
    });

    // test("")
  });
});

describe("<TodoForm /> Events", () => {});
