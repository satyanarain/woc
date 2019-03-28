import { LOGIN_SUCCESS, LOGIN_FAIL } from  '../actions/types';

export default function(state = {},action){
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { userloginData: action.payload };
      case LOGIN_FAIL:
        return { userloginData: null };
        break;
    default:
      return state
  }
}
