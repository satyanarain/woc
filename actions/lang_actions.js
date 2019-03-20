import axios from 'axios';
import { FETCH_LANG ,SELECTED_LANG } from './types';
const ROOT_URL = 'http://13.233.61.172/api/v1/';
import { AsyncStorage } from 'react-native';


export const fetchLang = () => async (dispatch) => {

var value = await AsyncStorage.getItem('languageData')
  if (value !== null){
    debugger;
    value = JSON.parse(value);
    console.log(value);
      dispatch({type:FETCH_LANG, payload:value});
  }else{
    debugger;
    let data  = await axios.get(ROOT_URL+'get-language-variables');
    dispatch({type:FETCH_LANG, payload: data.data.response});
    await AsyncStorage.setItem('languageData',JSON.stringify(data.data.response));
    console.log( data.data.response);
  }




};
