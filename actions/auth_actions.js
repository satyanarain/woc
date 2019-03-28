import{  LOGIN_SUCCESS , LOGIN_FAIL } from './types';
import { AsyncStorage } from 'react-native';



export const saveLoginData = (data) => async (dispatch) => {
  dispatch({type:LOGIN_SUCCESS, payload: data});
  await AsyncStorage.setItem('logindata',JSON.stringify(data));
   console.log(data);
  };
