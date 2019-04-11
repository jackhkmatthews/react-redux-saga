# React Redux Saga Tutorial for Beginners

> App built following [this](https://www.valentinog.com/blog/redux/) article. Additional notes below.

- `react` is framework agnostic, `react-redux` is a small wrapper library for connecting Redux and React in an efficient way
- try and move all business logic into maps and middleware
- use redux thunk for async side effects

# Redux-saga

- run async effects on a separate thread
- saga used generators

## Generator functions

- a generator function is a JavaSCript function which can be paused and resumed during its execution
- generator functions have their own syntax

```
function classicLoop() {
    for (var i = 0; i < 15; i++) {
        console.log(i)
    }
}

// turns into

function* generatorLoop() {
    for (var i = 0; i < 15; i++) {
        yield console.log(i)
    }
}

// invoked by

var myGenerator = generatorLoop()
myGenerator.next()
myGenerator.next()
myGenerator.next()
myGenerator.next()
```

- saga relies heavily on generator functions under the hood
- saga implemented as middleware
- take every action named FETCH_TODO_START and for each action of that type spin a worker saga
- inside the worker saga call a function named getData
- if the function does not result in any error then dispatch (put) a new action named FETCH_TODO_SUCCESS, alongside with a payload

```
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
```

- removes async calls from actions, helps for debugging, readability, reasoning and testing.
