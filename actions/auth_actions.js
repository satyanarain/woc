import{  LOGIN_SUCCESS , LOGIN_FAIL } from './types';
import { AsyncStorage } from 'react-native';



export const saveLoginData = (data) => async (dispatch) => {
var value = await AsyncStorage.getItem('logindata')
if (value !== null){
  //debugger;
  value = JSON.parse(value);
  console.log(value);
    dispatch({type:LOGIN_SUCCESS, payload:value});
}else{
//  debugger;
  dispatch({type:LOGIN_SUCCESS, payload: data});
  await AsyncStorage.setItem('logindata',JSON.stringify(data));
   console.log(data);
}


};
