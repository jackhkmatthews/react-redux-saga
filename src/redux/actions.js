import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  FETCH_TODO_START
} from "./actionTypes";

let nextTodoId = 1;

export const getNextTodoId = () => ++nextTodoId;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: { id: getNextTodoId(), content }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const addRandomTodo = () => ({ type: FETCH_TODO_START });
