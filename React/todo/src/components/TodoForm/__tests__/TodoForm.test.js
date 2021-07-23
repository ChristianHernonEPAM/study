import { render, screen, fireEvent } from "@testing-library/react";
import { TODO_ACTIONS } from "../../../reducers/todoReducer";
import TodoForm from "../TodoForm";

const TODO = {
  id: 1,
  title: "Test Todo",
  active: false,
  complete: true,
  description: "Some todo description",
  dueDate: "2021-07-30",
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
      expect(titleEl.value).toBe(TODO.title);
    });

    test("todoform title updates", () => {
      const titleEl = screen.getByTestId("todo-form.title");
      const expectedTitle = "Send Bezos to Space!";
      expect(titleEl.value).toBe(TODO.title);
      fireEvent.change(titleEl, { target: { value: expectedTitle } });
      expect(titleEl.value).toBe(expectedTitle);
    });

    test("todoform description prefills", () => {
      const descEl = screen.getByTestId("todo-form.description");
      expect(descEl).toBeInTheDocument();
      expect(descEl.value).toBe(TODO.description);
    });

    test("todoform description updates", () => {
      const descEl = screen.getByTestId("todo-form.description");
      const expectedDesc = "My updated description.";
      expect(descEl.value).toBe(TODO.description);
      fireEvent.change(descEl, { target: { value: expectedDesc } });
      expect(descEl.value).toBe(expectedDesc);
    });

    test("todoform date prefills", () => {
      const dateEl = screen.getByTestId("todo-form.date");
      expect(dateEl).toBeInTheDocument();
      expect(dateEl.value).toBe(TODO.dueDate);
    });

    test("todoform date updates", () => {
      const dateEl = screen.getByTestId("todo-form.description");
      const expectedDate = "2022-12-25";
      expect(dateEl.value).toBe(TODO.description);
      fireEvent.change(dateEl, { target: { value: expectedDate } });
      expect(dateEl.value).toBe(expectedDate);
    });

    test("todoform date prefills", () => {
      const dateEl = screen.getByTestId("todo-form.date");
      expect(dateEl).toBeInTheDocument();
      expect(dateEl.value).toBe(TODO.dueDate);
    });

    test("todoform date updates", () => {
      const dateEl = screen.getByTestId("todo-form.description");
      const expectedDate = "2022-12-25";
      expect(dateEl.value).toBe(TODO.description);
      fireEvent.change(dateEl, { target: { value: expectedDate } });
      expect(dateEl.value).toBe(expectedDate);
    });

    test("todoform complete prefills", () => {
      const completeEl = screen.getByTestId("todo-form.complete");
      expect(completeEl).toBeInTheDocument();
      expect(completeEl).toBeChecked();
    });

    test("todoform complete prefills", () => {
      const completeEl = screen.getByTestId("todo-form.complete");
      expect(completeEl).toBeChecked();
      fireEvent.click(completeEl);
      expect(completeEl).not.toBeChecked();
    });
  });
});

describe("<TodoForm /> Events", () => {
  beforeEach(() =>
    render(<TodoForm todos={[{ ...TODO, active: true }]} {...DISPATCH} />)
  );

  test("cancel event", () => {
    const cancelBtn = screen.getByTestId("todo-form.cancel");
    fireEvent.click(cancelBtn);
    expect(DISPATCH.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.DESELECT,
    });
  });

  test("update event", () => {
    const updateBtn = screen.getByTestId("todo-form.update");
    const titleEl = screen.getByTestId("todo-form.title");
    const expectedTitle = "New Updated Title";
    fireEvent.change(titleEl, { target: { value: expectedTitle } });
    fireEvent.click(updateBtn);
    expect(DISPATCH.todosDispatch).toHaveBeenCalledWith({
      type: TODO_ACTIONS.UPDATE,
      todo: { ...TODO, active: true, title: expectedTitle },
    });
  });
});
