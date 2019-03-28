

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Router from './src/components/Router';
import { Provider } from 'react-redux';
import store from './store';
export default class App extends Component<Props> {

  clickToCall = () => {
    debugger;
    console.log("Hi");
  }

  render() {
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
