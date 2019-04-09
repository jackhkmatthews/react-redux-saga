import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  FETCH_TODO_START,
  FETCH_TODO_SUCCESS
} from "./actionTypes";
import store from "./store";
import axios from "axios";

let nextTodoId = 1;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: { id: ++nextTodoId, content }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const addRandomTodo = () => {
  store.dispatch({ type: FETCH_TODO_START });
  return dispatch => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${nextTodoId}`)
      .then(req => {
        console.log(req.data);
        dispatch({
          type: FETCH_TODO_SUCCESS,
          payload: { content: req.data.title, id: ++nextTodoId }
        });
      });
  };
};
