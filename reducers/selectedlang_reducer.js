import { SELECTED_LANG } from  '../actions/types';

export default function(state = {},action){
  switch (action.type) {
    case SELECTED_LANG:
      return  action.payload ;

    default:
      return state
  }
}
