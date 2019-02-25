import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {Text} from 'react-native';
import Login from './Login';
import { DrawerNavigator } from 'react-navigation';
import Registration from './Registration';
import UserData from './UserData';

import { Alert, StatusBar } from 'react-native';


class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentDidMount() {
    //debugger;
    UserData.retriveData('accessToken').then((res) => {
        //console.log(res);
        if (res === '') {
            this.setState({ isLogin: false });
        } else {

            //console.log(res);
            this.setState({ isLogin: true });


        }
    }, (err) => {
        //console.log(err);
    });
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
       <Scene key='Registration' component={Registration} title='' />

        <Scene key='RouterComponent' component={RouterComponent} title='' />


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

export default RouterComponent;