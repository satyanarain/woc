import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {Text} from 'react-native';
import Login from './Login';
import { DrawerNavigator } from 'react-navigation';
import Registration from './Registration';
import UserData from './UserData';
import LandingScreen from './LandingScreen';
import ForgotPassword from './ForgotPassword';
import { connect } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import * as actions from '../../actions';

class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentDidMount() {
      this.props.fetchLang();
        if (this.props.successData === '') {
            this.setState({ isLogin: false });
        } else {

          console.log(this.props.successData);
            this.setState({ isLogin: true });

}

  }


    render() {
      const {
          isLogin
      } = this.state;

      return (
      <Router>
      <Scene key='root' >
      <Scene hideNavBar>
       <Scene key='Login' component={Login} title=''  />
       <Scene key='LandingScreen' component={LandingScreen} title=''  initial/>
       <Scene key='Registration' component={Registration} title='' />
        <Scene key='RouterComponent' component={RouterComponent} title='' />
        <Scene key='ForgotPassword' component={ForgotPassword} title='' />


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

function getAuthData({auth}){

  console.log(auth);
  return {successData:auth}
}

export default connect(getAuthData,actions) (RouterComponent);
