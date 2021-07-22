// import { render, screen } from '@testing-library/react';
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/yet another todo app!/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders todo list", () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const todoListHeader = getByText(/todo list/i);
  const inputElement = getByPlaceholderText(/add new todo item/i);
  const addButton = getByText(/Add/i);
  expect(todoListHeader).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test("renders todo details", () => {
  const { getByText } = render(<App />);
  const todoListHeader = getByText(/todo details/i);
  expect(todoListHeader).toBeInTheDocument();
});

test("add new todo", () => {
  const r = render(<App />);
  const input = r.getByPlaceholderText(/add new todo/i);
  const button = r.getByText(/add/i);

  fireEvent.change(input, { target: { value: "1. Test Todo" } });
  fireEvent.click(button);

  expect(
    r.getByText(/1\. Test Todo/i)
  ).toBeInTheDocument();
});

// test("add new todo", () => {
//   const r = render(<App />);
//   const input = r.getByPlaceholderText(/add new todo/i);
//   const button = r.getByText(/add/i);

//   fireEvent.change(input, { target: { value: "1. Test Todo" } });
//   fireEvent.click(button);

//   expect(
//     r.getByText(/1\. Test Todo/i)
//   ).toBeInTheDocument();
// });

// test("add new todo", () => {
//   const r = render(<App />);
//   const input = r.getByPlaceholderText(/add new todo/i);
//   const button = r.getByText(/add/i);

//   fireEvent.change(input, { target: { value: "1. Test Todo" } });
//   fireEvent.click(button);

//   expect(
//     r.getByText(/1\. Test Todo/i)
//   ).toBeInTheDocument();
// });