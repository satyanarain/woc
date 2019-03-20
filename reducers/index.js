import { combineReducers } from 'redux';
import auth from './auth_reducer';
import lang from './lang_reducer';
import selectedLangCode from './selectedlang_reducer';


const reducers = combineReducers({
    auth, lang, selectedLangCode
})

export default reducers;
