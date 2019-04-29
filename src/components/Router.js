import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {Text,AsyncStorage} from 'react-native';
import Login from './Login';
import { DrawerNavigator } from 'react-navigation';
import Registration from './Registration';
import UserData from './UserData';
import Menu from './Menu';
import LandingScreen from './LandingScreen';
import SuggestedCentres from './SuggestedCentres';

import ForgotPassword from './ForgotPassword';
import { connect } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import * as actions from '../../actions';
import SuggestedCentreDetails from './SuggestedCentreDetails';
import Home from './Home';
import Feedback from './Feedback';
import TrainigJobStatus from './TrainigJobStatus';
import Scolarship from './Scolarship';
import Profile from './Profile';
import AboutUs from './AboutUs';
import ITPartner from './ITPartner';
import TraningList from './TraningList';
import TraningCentresSubList from './TraningCentresSubList';

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
     this.props.getLoginData();
    AsyncStorage.getItem('logindata').then((response) =>{
     //   debugger;
      if (response === '' || response === null){
        //debugger;
     this.setState({ isLogin: false });


      }else{

          this.setState({ isLogin: true });
             let value = JSON.parse(response);
          console.log(value);
          dispatch({type:LOGIN_SUCCESS, payload:value});
      }

     })
      
      
      
      
      
//      this.props.fetchLang();
//      this.props.getLanguage();
//      this.props.getLoginData();
//     AsyncStorage.getItem('logindata').then((response) =>{
//       if (response !== null){
//         //debugger;
//         this.setState({ isLogin: true });
//        let value = JSON.parse(response);
//         console.log(value);
//         dispatch({type:LOGIN_SUCCESS, payload:value});
//
//
//       }else{
//           this.setState({ isLogin: false });
//       }
//
//      })


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
        <Scene key='SuggestedCentres' component={SuggestedCentres} title='' />
        <Scene key='SuggestedCentreDetails' component={SuggestedCentreDetails} title='' />
        <Scene key='Home' component={Home} title='' />
        <Scene key='Profile' component={Profile} title='' />
        <Scene key='Feedback' component={Feedback} title='' />
        <Scene key='TrainigJobStatus' component={TrainigJobStatus} title='' />
        <Scene key='Scolarship' component={Scolarship} title='' />
        <Scene key='TraningList' component={TraningList} title='' />
        <Scene key='AboutUs' component={AboutUs} title='' />
        <Scene key='TraningCentresSubList' component={TraningCentresSubList} title='' />
        <Scene key='ITPartner' component={ITPartner} title='' />
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
