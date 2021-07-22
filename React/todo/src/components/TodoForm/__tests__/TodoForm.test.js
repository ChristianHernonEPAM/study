import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import TodoProvider, { TodoContext } from "../contexts/TodoContext";
import { TODO_ACTIONS } from "../reducers/todoReducer";
import TodoForm from "../TodoForm";

