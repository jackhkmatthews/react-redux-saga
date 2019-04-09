import {
  ADD_TODO,
  TOGGLE_TODO,
  FETCH_TODO_START,
  FETCH_TODO_SUCCESS
} from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
  fetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    case FETCH_TODO_START: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_TODO_SUCCESS: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        },
        fetching: false
      };
    }
    default:
      return state;
  }
}
