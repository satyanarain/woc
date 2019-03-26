import{ SELECTED_LANG } from './types';
import { AsyncStorage } from 'react-native';


export const saveLanguage = (languageCode) => async (dispatch) => {

    dispatch({type:SELECTED_LANG, payload: languageCode});
     console.log(languageCode);
     await AsyncStorage.setItem('languageCode', languageCode);



}
export const getLanguage = () => async (dispatch) => {

  let value = await AsyncStorage.getItem('languageCode');
  if (value !== null){
     //debugger;
      dispatch({type:SELECTED_LANG, payload: value});
  }

}
