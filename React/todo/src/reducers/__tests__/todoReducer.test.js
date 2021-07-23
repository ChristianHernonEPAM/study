import { todoInit, todoReducer, TODO_KEY, TODO_ACTIONS } from "../todoReducer";

const EMPTY_STATE = [];
const MOCK_STATE = [
  {
    title: "TODO ONE",
    description: "lorem ipsum",
    dueDate: "",
    dueTime: "",
    complete: false,
    active: false,
    id: 1,
  },
  {
    title: "TODO TWO",
    description: "foo bar",
    dueDate: "",
    dueTime: "",
    complete: false,
    active: false,
    id: 2,
  },
];

describe("todoInit()", () => {
  test("load without exsiting value", () => {
    const initialValue = todoInit();
    expect(initialValue).toEqual([]);
  });

  test("load with initial value", () => {
    const cachedValue = ["foo", "bar"];
    localStorage.setItem(TODO_KEY, JSON.stringify(cachedValue));
    const initialValue = todoInit();
    expect(initialValue).toEqual(cachedValue);
  });
});

describe("todoReducer()", () => {
  test("no arguments", () => {
    expect(todoReducer()).toBeUndefined();
  });

  describe("Add Action", () => {
    const NEW_TITLE = "NEW TODO";
    const ACTION = {
      type: TODO_ACTIONS.ADD,
      todo: { title: NEW_TITLE },
    };

    test("add todo to empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual([
        {
          title: NEW_TITLE,
          description: "",
          dueDate: "",
          dueTime: "",
          complete: false,
          active: false,
          id: expect.any(Number),
        },
      ]);
    });

    test("add todo to exisiting state", () => {
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual([
        ...MOCK_STATE,
        {
          title: NEW_TITLE,
          description: "",
          dueDate: "",
          dueTime: "",
          complete: false,
          active: false,
          id: expect.any(Number),
        },
      ]);
    });
  });

  describe("Remove Action", () => {
    const ACTION = {
      type: TODO_ACTIONS.REMOVE,
      todo: { id: 1 },
    };

    test("remove from empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual(EMPTY_STATE);
    });

    test("remove from mock state", () => {
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual([MOCK_STATE[1]]);
    });
  });

  describe("Toggle Action", () => {
    const ACTION = {
      type: TODO_ACTIONS.TOGGLE,
      todo: { id: 1 },
    };

    test("toggle on empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual(EMPTY_STATE);
    });

    test("toggle on mock state", () => {
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual([
        {
          ...MOCK_STATE[0],
          complete: true,
        },
        {
          ...MOCK_STATE[1],
        },
      ]);
    });
  });

  describe("Select Action", () => {
    const ACTION = {
      type: TODO_ACTIONS.SELECT,
      todo: { id: 1 },
    };

    test("select on empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual(EMPTY_STATE);
    });

    test("select on mock state", () => {
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual([
        {
          ...MOCK_STATE[0],
          active: true,
        },
        {
          ...MOCK_STATE[1],
        },
      ]);
    });
  });

  describe("Deselect Action", () => {
    const ACTION = {
      type: TODO_ACTIONS.DESELECT,
    };

    test("deselect on empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual(EMPTY_STATE);
    });

    test("deselect on mock state", () => {
      const mockActiveState = [
        {
          ...MOCK_STATE[0],
          active: true,
        },
        {
          ...MOCK_STATE[1],
        },
      ];
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual(MOCK_STATE);
    });
  });

  describe("Update Action", () => {
    const ACTION = {
      type: TODO_ACTIONS.UPDATE,
      todo: {
        title: "TODO ONE --UPDATED",
        description: "lorem ipsum --UPDATED",
        dueDate: "2021-12-25",
        complete: false,
        active: true,
        id: 1,
      },
    };

    const DUE_TIME = new Date(ACTION.todo.dueDate).getTime();

    test("update on empty state", () => {
      const returnValue = todoReducer(EMPTY_STATE, ACTION);
      expect(returnValue).toEqual(EMPTY_STATE);
    });

    test("update on mock state", () => {
      const returnValue = todoReducer(MOCK_STATE, ACTION);
      expect(returnValue).toEqual([
        {
          ...ACTION.todo,
          dueTime: DUE_TIME,
        },
        {
          ...MOCK_STATE[1],
        },
      ]);
    });
  });
});
