import * as actions from '../actions/types'

export default (state = null, action) => {
  console.log(action);
  switch(action.type) {
    case actions.FETCH_USER:
      // 3 cases, NULL -> if waiting for response
      // User.data -> if user is logged in
      // false -> if user is not logged in
      return action.payload  || false;   
    default:
      return state;
  }
}
