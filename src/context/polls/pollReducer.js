import { CLEAR_CURR, DELETE_POLL, LOAD_POLL, PULL_POLL } from "../actions";

export const pollReducerFunction = function (state, action) {
  switch (action.type) {
    case LOAD_POLL:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CURR:
      return {
        ...state,
        selected: null,
      };
    case DELETE_POLL:
      return {
        ...state,
        polls: state.polls.filter((poll) => {
          return poll.id !== action.payload;
        }),
      };
    case PULL_POLL:
      return {
        ...state,
        loading: false,
        polls: action.payload,
      };
    default:
      return state;
  }
};
