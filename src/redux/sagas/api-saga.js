import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_TODO_START, FETCH_TODO_SUCCESS } from "../actionTypes";
import axios from "axios";
import { getNextTodoId } from "../actions";

export default function* watcherSaga() {
  yield takeEvery(FETCH_TODO_START, workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: FETCH_TODO_SUCCESS, payload });
  } catch (e) {
    console.log(e);
  }
}

function getData() {
  return axios
    .get(`https://jsonplaceholder.typicode.com/todos/${getNextTodoId()}`)
    .then(req => ({ content: req.data.title, id: getNextTodoId() }));
}
