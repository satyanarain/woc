import{ SELECTED_LANG } from './types';
import { AsyncStorage } from 'react-native';


export const saveLanguage = (languageCode) => async (dispatch) => {
  dispatch({type:SELECTED_LANG, payload: languageCode});
   console.log(languageCode);
   await AsyncStorage.setItem('languageCode' languageCode);
}
