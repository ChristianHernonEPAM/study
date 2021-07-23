import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "../useLocalStorage";

const KEY = "jest-localstorage-test";

describe("useLocalStorage()", () => {
  beforeEach(() => localStorage.removeItem(KEY));

  test("without initial value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY));
    expect(result.current[0]).toBeUndefined();
  });

  test("with initial value and no storage value", () => {
    const initialValue = "foo bar";
    const { result } = renderHook(() => useLocalStorage(KEY, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  test("with initial value and no storage value", () => {
    const initialValue = "foo bar";
    const { result } = renderHook(() => useLocalStorage(KEY, () => "foo" + "bar"));
    expect(result.current[0]).toBe("foobar");
  });

  test("with initial value and storage value", () => {
    const cachedValue = {
      name: "John Doe",
      age: 30,
    };
    localStorage.setItem(KEY, JSON.stringify(cachedValue));
    const { result } = renderHook(() => useLocalStorage(KEY, ""));
    expect(result.current[0]).toEqual(cachedValue);
  });

  test("-- update the value", () => {
    const initialValue = "foo bar";
    const updatedValue = "foo foo";
    const { result } = renderHook(() => useLocalStorage(KEY, initialValue));
    expect(result.current[0]).toBe(initialValue);
    act(() => {
      result.current[1](updatedValue);
    });
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(updatedValue));
    expect(result.current[0]).toBe(updatedValue);
  });
});
