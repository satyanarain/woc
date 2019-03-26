import { LOGIN_SUCCESS, LOGIN_FAIL } from  '../actions/types';

export default function(state = {},action){
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { userloginData: action.payload };
    
    default:
      return state
  }
}
