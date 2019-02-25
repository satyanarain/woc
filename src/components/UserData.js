import React from 'react';
import RNSecureKeyStore from 'react-native-secure-key-store';

export default class UserData extends React.Component {
  static retriveData = (key) => RNSecureKeyStore.get(key)
  static saveData = (key, value) => {
    RNSecureKeyStore.set(key, value)
    .then((res) => {
      //debugger;
        console.log(res);
    }, (err) => {
        //debugger;
        console.log(err);
    });
  }
}
//debugger
