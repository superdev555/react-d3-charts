import { SET_USERS } from '../constants';

const initialState = { users: [] };

export default function userReducer(state = initialState, action) {
  console.log('action.users-----',action)
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
}
