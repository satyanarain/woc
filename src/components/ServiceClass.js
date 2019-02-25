import React from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
//const baseUrl = 'https://camstruction.com/api/';
const baseUrl = 'http://camstructionupdated.azurewebsites.net/api/';
//http://camstructionupdated.azurewebsites.net/api/photo
export default class ServiceClass extends React.Component {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({isConnected});
        } else {
            this.setState({isConnected});
        }
    }
    ;
  static loginData = (email, password, lastUrl) => {

        return axios.post(baseUrl + lastUrl, {
            username: email,
            password: password
        });
    }

    static signUp = (firstName, lastName,companyName,email,password, confirmPassword,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
              FirstName: firstName,
              LastName: lastName,
              CompanyName:companyName,
              EmailAddress:email,
              Password:password,
              ConfirmPassword:confirmPassword
          });
      }


    static appDetails = (lastUrl,token) => {
      //  debugger;
        return axios.get(baseUrl + lastUrl, {
            headers: {'X-User-Token': token}
        });
    }
    static createProject = (lastUrl,token,name,description,latitude,longitude,parents) => {
        //debugger;
      let axiosConfig = {
        headers: {
         'Content-Type': 'application/json',
            'X-User-Token': token
        }
      };

      var postData = {
        Name: name,
        Description: description,
        LatLng: [latitude,longitude],
        ParentId:parents,

};

          return axios.post(baseUrl + lastUrl, postData,axiosConfig);
    }




static EditProject = (lastUrl,token,name,description,latitude,longitude,parents) => {
    //debugger;
  let axiosConfig = {
    headers: {
     'Content-Type': 'application/json',
        'X-User-Token': token
    }
  };

  var postData = {
    Name: name,
    Description: description,
    LatLng: [latitude,longitude],
    ParentId:parents,

};

      return axios.put(baseUrl + lastUrl, postData,axiosConfig);
}




    static deleteDetails = (token, lastUrl) => {

        return axios.delete(baseUrl + lastUrl, {
            headers: {Token: token}
        });
    }

    static requestAppointment = (token,lastUrl,appointmentType, visitReason, appointmentSchedule, schedulingNote,providerOption,providerName,providerPhone,providerAddress,dependentID) => {




      let axiosConfig = {
        headers: {
          Accept: 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded',

            'Token': token
        }
      };

      var postData = {
        appointmentType: appointmentType,
        visitReason: visitReason,
        appointmentSchedule: appointmentSchedule,
        schedulingNote:schedulingNote,
        providerOption:providerOption,
        providerName: providerName,
        providerPhone:providerPhone,
        providerAddress: providerAddress,
        dependentID:dependentID,
};


//debugger;
console.log(baseUrl + lastUrl);
console.log(postData);
console.log(axiosConfig);


          return axios.post(baseUrl + lastUrl, postData,axiosConfig);
      }


    static updateAppointment = (token,lastUrl,appointmentType, visitReason, appointmentSchedule, schedulingNote,providerOption,providerName,providerPhone,providerAddress,dependentID) => {




        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
              'Token': token
          }
        };

        var postData = {
          appointmentType: appointmentType,
          visitReason: visitReason,
          appointmentSchedule: appointmentSchedule,
          schedulingNote:schedulingNote,
          providerOption:providerOption,
          providerName: providerName,
          providerPhone:providerPhone,
          providerAddress: providerAddress,
          dependentID:dependentID,
  };

  console.log(baseUrl + lastUrl);
  console.log(postData);
  console.log(axiosConfig);


            return axios.put(baseUrl + lastUrl, postData,axiosConfig);
        }









static uploadPicture = (lastUrl,source) => {
  debugger;
  //let photo = { uri: source.uri}
  let formdata = new FormData();




  formdata.append("id", 10)
  formdata.append("image", {uri: source.uri, name: 'image.jpg', type: 'multipart/form-data'})
  console.log(formdata);

  fetch(lastUrl,{
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata
    }).then(response => {
      debugger;
      console.log("image uploaded");
      console.log(response);
    }).catch(err => {
        debugger;
      console.log(err)
    })
  };

}