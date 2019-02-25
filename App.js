/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 <View style={styles.container}>
   <TouchableOpacity onPress={this.clickToCall}>
   <Text style={styles.welcome}>Welcome to React Native Ankleshwar!</Text>
   </TouchableOpacity>
   <Text style={styles.instructions}>To get started, edit App.js</Text>
   <Text style={styles.instructions}>{instructions}</Text>
 </View>


 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Router from './src/components/Router';


export default class App extends Component<Props> {

  clickToCall = () => {
    debugger;
    console.log("Hi");
  }

  render() {
    return (
      <Router />
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
