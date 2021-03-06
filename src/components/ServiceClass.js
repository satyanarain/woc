import React from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, SafeAreaView,AsyncStorage } from 'react-native';
import axios from 'axios';
import UserData from './UserData';


//const baseUrl = 'https://camstruction.com/api/';
//http://woc.demosteps.com/api/v1/get-language-list
const baseUrl = 'http://13.233.61.172/api/v1/';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
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
  static loginData = (email, password, langCode,lastUrl) => {

        return axios.post(baseUrl + lastUrl, {
            email: email,
            password: password,
            language: langCode
        });
    }

  static letSuggestedCenter = (langCode,lastUrl,id) => {

         return axios.post(baseUrl + lastUrl, {
             category: id,
             page: '1',
             language: langCode
         });
     }
    static letSuggestedCenterDetails = (center_id,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
              center:center_id,
              language: 'en'
          });
      }
      
      
    static searchCenter = (langCode,lastUrl,keyword,state) => {

          return axios.post(baseUrl + lastUrl, {
              category: '2',
              page: '1',
              language: langCode,
              keyword:keyword,
              state:state
          });
      }



  static forgotPasswordApi = (email, langCode,lastUrl) => {
        //debugger;
        return axios.post(baseUrl + lastUrl, {
            email: email,
            language: langCode
        });
    }

    static languageData = (lastUrl) => {

          return axios.get(baseUrl + lastUrl, {

          });
      }


    static signUp = (firstName, lastName,email,mobile, password,age,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
              first_name: firstName,
              last_name: "lastName",
              email:email,
              phone_number:mobile,
              password:password,
              age:age
          });
      }
    static updateProfile = (id,first_name,last_name,email,phone_number,city,state,pincode,qualification,age,gender,work_experience,patient_name,patient_contact_number,patient_address,patient_relationship,patient_detail,language,lastUrl) => {
        //debugger;
          return axios.post(baseUrl + lastUrl, {
              id: id,
              first_name: first_name,
              last_name: last_name,
              email:email,
              phone_number:phone_number,
              city:city,
              state:state,
              pincode:pincode,
              qualification:qualification,
              age:age,
               gender:gender,
               work_experience:work_experience,
               patient_name:patient_name,
               patient_contact_number:patient_contact_number,
               patient_address:patient_address,
               patient_relationship:patient_relationship,
               patient_detail:patient_detail,
               language:language,
               
          });
      }
      
      
      
      
      
    static saveFeedbackForm = (SelectedFeedbackType,txtMessage,user_id,language,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
              feedback_type: SelectedFeedbackType,
              feedback_message:txtMessage,
              user_id:user_id,
              language:language,
              
          });
      }
      
      
      
    static saveScholarshipForm = (family_income,earning_members,patient_relationship,center_code,center_details,course_title,course_details,training_duration,training_cost,scholarship_type,scholarship_detail,center_poc,user_id,language,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
                        family_income: family_income,
                        earning_members: earning_members,
                        patient_relationship: patient_relationship,
                        center_code:center_code,
                        center_details: center_details,
                        course_title: course_title,
                        course_details: course_details,
                        training_duration: training_duration,
                        training_cost: training_cost,
                        scholarship_type: scholarship_type,
                        scholarship_detail: scholarship_detail,
                        center_poc: center_poc,
                        user_id:user_id,
                        language:language,
              
          });
      }
      
 static searchState = (langCode,lastUrl,keyword,state) => {

          return axios.post(baseUrl + lastUrl, {
              category: 1,
              page: 1,
              language: langCode,
              state:state
          });
      }

    static saveTrainingJobStatusForm = (training_center,cource_engaged,scholarship_status,training_started,training_completed,job_started_on,job_title,job_income,user_id,language,lastUrl) => {
//debugger;
          return axios.post(baseUrl + lastUrl, {
                        training_center: training_center,
                        cource_engaged: cource_engaged,
                        scholarship_status: scholarship_status,
                        training_started:training_started,
                        training_completed: training_completed,
                        job_started_on: job_started_on,
                        job_title:job_title,
                        job_income: job_income,
                        user_id:user_id,
                        language:language,
              
          });
      }
    static saveScholarshipForm = (family_income,earning_members,patient_relationship,center_code,center_details,course_title,course_details,training_duration,training_cost,scholarship_type,scholarship_detail,center_poc,user_id,language,lastUrl) => {

          return axios.post(baseUrl + lastUrl, {
                        family_income: family_income,
                        earning_members: earning_members,
                        patient_relationship: patient_relationship,
                        center_code:center_code,
                        center_details: center_details,
                        course_title: course_title,
                        course_details: course_details,
                        training_duration: training_duration,
                        training_cost: training_cost,
                        scholarship_type: scholarship_type,
                        scholarship_detail: scholarship_detail,
                        center_poc: center_poc,
                        user_id:user_id,
                        language:language,
              
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

static genericGetMethod = (lastUrl) => {



         return axios.get(baseUrl + lastUrl, {

         });
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
//console.log(baseUrl + lastUrl);
//console.log(postData);
//console.log(axiosConfig);


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

//  console.log(baseUrl + lastUrl);
//  console.log(postData);
//  console.log(axiosConfig);


            return axios.put(baseUrl + lastUrl, postData,axiosConfig);
        }



        static getLanguageData =  () => {

               axios.get("http://woc.demosteps.com/api/v1/get-language-variables").then((reData) => {
                      //  debugger;



                           AsyncStorage.setItem('products', JSON.stringify(reData.data.response.body.en) ).then( ()=>{
                             console.log('It was saved successfully')
                           } )
                           .catch( ()=>{
                             console.log('There was an error saving the product')
                           } )




               }).catch((error) => {
                   //debugger;
                   console.log(error.message);
                    // alert('Please enter correct Email ID or Password');
                   this.setState({loaded: false});
                     //alert(error)
               });;



}

static uploadPicture = (lastUrl,source) => {
 // debugger;

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
     // debugger;
      console.log("image uploaded");
      console.log(response);
    }).catch(err => {
       // debugger;
      console.log(err)
    })
  };

}
