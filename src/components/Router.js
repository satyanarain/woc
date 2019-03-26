import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {Text,AsyncStorage} from 'react-native';
import Login from './Login';
import { DrawerNavigator } from 'react-navigation';
import Registration from './Registration';
import UserData from './UserData';
import LandingScreen from './LandingScreen';
import ForgotPassword from './ForgotPassword';
import { connect } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import * as actions from '../../actions';
import Home from './Home';
import SuggestedCentres from './SuggestedCentres';

class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentWillMount() {
      this.props.fetchLang();
      this.props.getLanguage();
     AsyncStorage.getItem('logindata').then((response) =>{
       if (response !== null){
         //debugger;
         this.setState({ isLogin: true });
        let value = JSON.parse(response);
         console.log(value);
         dispatch({type:LOGIN_SUCCESS, payload:value});


       }else{
           this.setState({ isLogin: false });
       }

      })


  }






    render() {
      const {
          isLogin
      } = this.state;

      return (
      <Router>
      <Scene key='root' >
      <Scene hideNavBar>
      {
          (isLogin === true) ? <Scene key='Home' component={Home} title='' initial /> : <Scene key='LandingScreen' component={LandingScreen} title='' initial />
        }
       <Scene key='Login' component={Login} title=''  />
       <Scene key='LandingScreen' component={LandingScreen} title=''  />
       <Scene key='Registration' component={Registration} title='' />
        <Scene key='RouterComponent' component={RouterComponent} title='' />
        <Scene key='ForgotPassword' component={ForgotPassword} title='' />
        <Scene key='Home' component={Home} title='' />
        <Scene key='SuggestedCentres' component={SuggestedCentres} title='' />


     </Scene>
     </Scene>
     </Router>



      );


    }


}
const styles = {
  MainContainer:
   {
     flex: 1,
},}


export default connect(null,actions) (RouterComponent);
