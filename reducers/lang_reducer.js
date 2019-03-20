import { FETCH_LANG } from  '../actions/types';

const INITIAL_STATE = {
    results: {}
}

export default function(state = INITIAL_STATE,action) {

    switch (action.type){
      case FETCH_LANG:
    //  debugger;
      console.log(action.payload);
          return action.payload;
      default:
          return state;
    }
}
