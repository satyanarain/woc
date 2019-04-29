/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet, SafeAreaView,TextInput,KeyboardAvoidingView,AsyncStorage, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import CustomHeader from './CustomHeader';
//import { ScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ResponsiveImage from 'react-native-responsive-image';
import { SectionGrid } from 'react-native-super-grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';


class Profile extends React.Component {
   

    constructor(props) {
        super(props);
          this.inputRefs = {};
        this.state = {
            loaded: false,
            txtEmail: '',
            token: "",
            tokenCopyFeedback: "",
            isVisible: true,
            Login: false,
            date: '',
            patient_name:'',
           patient_contact_number:'',
           patient_address:'',
           patient_relationship:'',
           patient_detail:'',
           txtCityPlachholder:'1',
           txtStatePlachholder:'1',
           txtCitySelectedName:'',
            txtFName:'',
            txtLName:'',
            txtAge:'',
            txtMobile:'',
            txtGender:'',
            txtQualification:'',
            txtWorkExperience:'',
            txtCompany:'',
            arrState:[],
            arrCity:[],
            arrGender:[{
              label: 'Male',
              value: 'Male'
            },
          {
              label: 'Female',
              value: 'Female'
            },
            {
              label: 'Others',
              value: 'Others'
            },

            ]

        };

    }
clickToLogout=()=>
{
 // Actions.LandingScreen();  
   AsyncStorage.setItem("logindata","");
    Actions.LandingScreen();  
    //Actions.refresh({ key: 'LandingScreen', text: '' });
     
}

    /***********************************************************/
    componentWillMount() {


    this.setState({
        txtCitySelectedName:this.props.lang.CENTER_SELECT_CITY,
        txtFName:this.props.profileData.userloginData.first_name,
        txtLName:this.props.profileData.userloginData.last_name,
        txtEmail:this.props.profileData.userloginData.email,
        txtMobile:this.props.profileData.userloginData.phone_number,
        txtCityPlachholder:this.props.profileData.userloginData.city,
        txtStatePlachholder:this.props.profileData.userloginData.state,
        txtPincode:this.props.profileData.userloginData.pincode,
        txtType:this.props.profileData.userloginData.type,
        txtQualification:this.props.profileData.userloginData.qualification,
        txtAge:this.props.profileData.userloginData.age,
        txtGender:this.props.profileData.userloginData.gender,
        txtWorkExperience:this.props.profileData.userloginData.work_experience,
        txtPatientId:this.props.profileData.userloginData.patient_id,
        patient_name:this.props.profileData.userloginData.patient_name,
        patient_contact_number:this.props.profileData.userloginData.patient_contact_number,
        patient_address:this.props.profileData.userloginData.patient_address,
        patient_relationship:this.props.profileData.userloginData.patient_relationship,
        patient_detail:this.props.profileData.userloginData.patient_detail,
        txtProfileCompletion:this.props.profileData.userloginData.profile_completion,
        user_id:this.props.profileData.userloginData.id

    })
    
  // console.log(this.props.profileData.userloginData)
    

      
   //  alert(this.props.profileData.userloginData.city)
      
      if (this.props.profileData.userloginData.state != 'undefiend'){
          this.searchCity(this.props.profileData.userloginData.state)
      }
    
    }

    componentDidMount() {
      
     
      ServiceClass.genericGetMethod('center-state-list').then((reData) => {
//debugger;
          console.log(reData.data.response.body);
      for (var item in reData.data.response.body) {
//debugger;
                    let id = reData.data.response.body[item].id.toString();

                      //debugger;
                    console.log(id);
                    this.state.arrState.push({
                        label: reData.data.response.body[item].title,
                        value: id
                    })
                }
                this.setState({loaded: false});

  }).catch((error) => {
//debugger;
      this.setState({loaded: false});
      Alert.alert(error);
  });
    }

  searchCity= (str) =>{
          //alert("Am Call without click");
if(str!=='')
{
              this.setState({loaded: true})
             this.setState({arrCity:[]});

              let url = 'get-city-list?state='+str+'&language='+this.props.selectedLangCode

              ServiceClass.genericGetMethod(url).then((reData) => {
  
          
             
                console.log(reData.data.response.body);
                 for (var item in reData.data.response.body) {
                    
                 
             
                  if (this.state.txtCityPlachholder == reData.data.response.body[item].id){
                         
                     
                       /// this.setSate({txtCitySelectedName:reData.data.response.body[item].title});
                         
                     }
                             
                               this.state.arrCity.push({label: reData.data.response.body[item].title,value: reData.data.response.body[item].id
                               })
                           }

                  this.setState({loaded: false});

            }).catch((error) => {

              this.setState({loaded: false});
              Alert.alert(error);
            });
    }
  }
  

 clickToUpdate = () =>{
     

     
                   var isValid    = this.validate(this.state.txtEmail);
                //  alert(this.state.patient_name);
                    if (this.state.patient_name === '') {
                     alert(this.props.lang.REGISTER_PATIENT_NAME_ERROR);
                     }else if (this.state.patient_contact_number === '') {
                     alert(this.props.lang.REGISTER_PATIENT_NO_ERROR);
                     }else if (this.state.patient_address === '') {
                     alert(this.props.lang.REGISTER_PATIENT_ADDRESS_ERROR);
                    
                      }else if (this.state.patient_relationship === '') {
                     alert(this.props.lang.PATIENT_RELATION_ERROR);
                     }else if (this.state.patient_detail === '') {
                     alert(this.props.lang.REGISTER_PATIENT_DETAILS_ERROR);
                    }  else if (this.state.txtFName === undefined) {
                     alert(this.props.lang.REGISTER_NAME_ERROR);
                    }  else if (this.state.txtLName === '') {
                       alert(this.props.lang.REGISTER_LAST_NAME_ERROR);
                   }else if (this.state.txtAge === '') {
                       alert(this.props.lang.REGISTER_AGE_ERROR);
                   }else if (this.state.txtGender === '') {
                       alert(this.props.lang.REGISTER_GENDER_ERROR);
                   } else if (this.state.txtMobile === '') {
                       alert(this.props.lang.REGISTER_MOBILE_NO_ERROR);
                   } else if (this.state.txtQualification === '') {
                       alert(this.props.lang.REGISTER_QUALIFICATION_ERROR);
                   } else if (this.state.txtQualification === '') {
                       alert(this.props.lang.REGISTER_QUALIFICATION_ERROR);
                   } else if (this.state.txtWorkExperience === '') {
                       alert(this.props.lang.REGISTER_EXPERIENCE_ERROR);
                    } else if (this.state.txtEmail === '') {
                      alert(this.props.lang.REGISTER_EMAIL_ERROR);
                   } else if (isValid === false) {
                         alert(this.props.lang.REGISTER_EMAIL_VALID_ERROR);
                   } else if (this.state.txtState === '') {
                         alert(this.props.lang.REGISTER_STATE_ERROR);
                  } else if (this.state.txtCity === '') {
                         alert(this.props.lang.REGISTER_CITY_ERROR);
                  } else if (this.state.txtPincode === '') {
                         alert(this.props.lang.REGISTER_PINCODE_ERROR);
                       }else{
                       
                  
//alert("pass")
           this.setState({loaded: true});
                   
                  
ServiceClass.updateProfile(this.state.user_id,this.state.txtFName,this.state.txtLName,this.state.txtEmail,this.state.txtMobile,this.state.txtCity,this.state.txtState,this.state.txtPincode,this.state.txtQualification,this.state.txtAge,this.state.txtGender,this.state.txtWorkExperience,this.state.patient_name,this.state.patient_contact_number,this.state.patient_address,this.state.patient_relationship,this.state.patient_detail,this.props.selectedLangCode,'update-profile-new').then((reData) => {
                            debugger;
                                console.log(reData);
                                if (reData.data.response.httpCode === '200'){
                                   this.props.saveLoginData(reData.data.response.body);
                                   this.setState({loaded: false});
                                  alert(reData.data.response.message);
                                   Actions.pop();

                                }else{
                                  alert('error');
                                 this.setState({loaded: false});
                                }


                           }).catch((error) => {
                               ////debugger;
                               console.log(error);
                                alert("This Email ID is already existing. Please try another Email ID.");
                               this.setState({loaded: false});
                                 //alert(error)
                           });

                   }

  }

    validate = (text) => {
      ////debugger
          console.log(text);
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
          if(reg.test(text) === false)
          {
          console.log("Email is Not Correct");
          this.setState({email:text})
          return false;
            }
          else {
            this.setState({email:text})
            console.log("Email is Correct");
          }
    }


    /*
                   @handleKeyDown: this function use to close the keyboard on return click.
                   */
                  handleKeyDown = (e) => {
                  if (e.nativeEvent.key == "Enter"){
                  Keyboard.dismiss();
                  }
                  }

                  clickToLogin=()=>{
                    Actions.pop();
                  }

//                  clickToUpdate = () =>{
//                    Actions.pop();
//                  }


clickToLanguage = () =>{
    Actions.LandingScreen({isChange:true});
}





    render() {

        const isIos = Platform.OS === 'ios'
        const {
            Login,
            loaded
        } = this.state;




            return (
              <SafeAreaView style={{flex:1,backgroundColor:'#B98699'}}>
               <CustomHeader
              headerText={this.props.lang.MENU_PROFILE}

              />
              <View style={styles.container}>
              
              
             
              
                <ImageBackground
                                          style={styles.imgBackground}
                                          resizeMode='cover'
                                          source={require('../../assets/background.jpg')}>
                                          <View style={styles.container}>
                                          
                                             {
                                            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                                          }
                                          
                                          
                                                  <ResponsiveImage
                                                      source={require('../../assets/logo.png')}
                                                        initWidth="164" initHeight="91" style={styles.logo}/>
                                                    <View style={{height:600}}>    
                                                  <ScrollView>
                                              <View style={styles.containerSub}>
                                              <View style={styles.mainRowHeading}>

                                                            <Text  style={styles.mainRowHeadingText} 
                                                                  >
                                                                  {this.props.lang.REGISTER_HEADER_PATIENT}
                                                                  </Text>
                                                  </View>
                                                 
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_NAME}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.patient_name}
                                                          onChangeText={patient_name => this.setState({patient_name})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_NO}
                                                          placeholderTextColor="#fff"
                                                          keyboardType={'phone-pad'}
                                                          maxLength={10}
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.patient_contact_number}
                                                          onChangeText={patient_contact_number => this.setState({patient_contact_number})}
                                                          />
                                                  </View>
                                                  </View>
                                                   {/*   <View style={styles.mainRow}>

                                              <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_RELATION}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.patient_relationship}
                                                          onChangeText={patient_relationship => this.setState({patient_relationship})}
                                                          />
                                                  </View>
                                                  </View>*/}
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_ADDRESS}
                                                          placeholderTextColor="#fff"
                                                           numberOfLines={10}
                                                           multiline={true}
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.patient_address}
                                                          onChangeText={patient_address => this.setState({patient_address})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_RELATION}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.txtPatientDetails}
                                                          onChangeText={patient_relationship => this.setState({patient_relationship})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_DETAILS}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.patient_detail}
                                                          onChangeText={patient_detail => this.setState({patient_detail})}
                                                          />
                                                  </View>
                                                  </View>

                                                 <View style={styles.mainRowHeading}>

                                                            <Text  style={styles.mainRowHeadingText} 
                                                                  >
                                                                   {this.props.lang.REGISTER_PERSONAL_INFO}
                                                                  </Text>
                                                  </View>


                                                  
                                              <View style={styles.mainRow}>

                                              <View style={styles.SectionStyle1}>
                                                  <TextInput
                                                      style={styles.textInput}

                                                      placeholder={this.props.REGISTER_NAME}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      value={this.state.txtFName}
                                                      onChangeText={txtFName => this.setState({txtFName})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.REGISTER_LAST_NAME}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      value={this.state.txtLName}
                                                      onChangeText={txtLName => this.setState({txtLName})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.REGISTER_AGE}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      keyboardType='numeric'
                                                      maxLength={3}
                                                      
                                                      value={this.state.txtAge}
                                                      onChangeText={txtAge => this.setState({txtAge})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>


                                              <View style={{width:'100%'}}>
                                              <RNPickerSelect
                                                  placeholder={{
                                                      label: this.props.lang.REGISTER_GENDER,
                                                      value: '',
                                                  }}
                                                  placeholderTextColor='white'
                                                  items={this.state.arrGender}
                                                  onValueChange={(value) => {
                                                      this.setState({
                                                          txtGender: value,
                                                      });
                                                  }}

                                                  style={{ ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 15,
                                                        right: 15,
                                                    },
                                                   }}
                                                  value={this.state.txtGender}
                                                  Icon={() => {
                                                      return    <ResponsiveImage
                                                        source={require('../../assets/downArrowWhite.png')}  initWidth="16" initHeight="11" />;
                                                  }}

                                                  ref={(el) => {
                                                      this.inputRefs.picker = el;
                                                  }}
                                              />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.REGISTER_Qualification}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                    
                                                      value={this.state.txtQualification}
                                                      onChangeText={txtQualification => this.setState({txtQualification})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.REGISTER_EXPERIENCE}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      keyboardType='numeric'
                                                      maxLength={3}
                                                      value={this.state.txtWorkExperience}
                                                      onChangeText={txtWorkExperience => this.setState({txtWorkExperience})}
                                                      />
                                              </View>
                                              </View>
                                             
                                                  <View style={styles.mainRowHeading}>

                                                            <Text  style={styles.mainRowHeadingText} 
                                                                  >
                                                                  {this.props.lang.REGISTER_CONTACT_INFO}
                                                                  </Text>
                                                  </View>
                                                  
                                                  
                                                  <View style={styles.mainRow}>
                                                    <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_MOBILE_NO}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                           keyboardType='numeric'
                                                           maxLength={10}
                                                           value={this.state.txtMobile}
                                                          onChangeText={txtMobile => this.setState({txtMobile})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>
                                                   <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_EMAIL}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.txtEmail}
                                                          onChangeText={txtEmail => this.setState({txtEmail})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>


                                                  <View style={{width:'100%'}}>
                                                  <RNPickerSelect
                                                      placeholder={{
                                                          label: this.state.txtStatePlachholder,
                                                          value: this.state.txtStatePlachholder,
                                                      }}
                                                      placeholderTextColor='white'
                                                      items={this.state.arrState}
                                                      onValueChange={(value) => {
                                                         
                                                          this.setState({
                                                              txtState: value,
                                                          });
                                                          this.searchCity(value);
                                                      }}
                                                      
                                                      
                                                     
                                                      style={{ ...pickerSelectStyles,
                                                        iconContainer: {
                                                            top: 15,
                                                            right: 15,
                                                        }, }}
                                                      value={this.state.txtState}
                                                      Icon={() => {
                                                          return    <ResponsiveImage
                                                            source={require('../../assets/downArrowWhite.png')}  initWidth="16" initHeight="11"/>;
                                                      }}

                                                      ref={(sl) => {
                                                          this.inputRefs.picker = sl;
                                                      }}
                                                  />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={{width:'100%'}}>
                                                  <RNPickerSelect
                                                      placeholder={{
                                                          label:this.state.txtCitySelectedName,
                                                          value: this.state.txtCityPlachholder,
                                                      }}
                                                      placeholderTextColor='white'
                                                      items={this.state.arrCity}
                                                      onValueChange={(value) => {
                                                          this.setState({
                                                              txtCity: value,
                                                          });
                                                      }}

                                                      style={{ ...pickerSelectStyles,
                                                        iconContainer: {
                                                            top: 15,
                                                            right: 15,
                                                        }, }}
                                                      value={this.state.txtCity}
                                                      Icon={() => {
                                                          return    <ResponsiveImage
                                                            source={require('../../assets/downArrowWhite.png')}  initWidth="16" initHeight="11" />;
                                                      }}

                                                      ref={(sl) => {
                                                          this.inputRefs.picker = sl;
                                                      }}
                                                  />
                                                  </View>
                                                  </View>

                                        <View style={styles.mainRow}>
                                                   <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PINCODE}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          keyboardType='numeric'
                                                           maxLength={7}
                                                          value={this.state.txtPincode}
                                                          onChangeText={txtPincode => this.setState({txtPincode})}
                                                          />
                                                  </View>
                                                  </View>

                                          <View style={{justifyContent:'center',backgroundColor:'white',height:45,marginTop:20}}>
                                          <TouchableOpacity
                                            onPress={this.clickToUpdate}
                                          >
                                            <Text  style={{ textAlign:'center',color:'#000',width:'100%',fontWeight:'bold',fontSize:16}}
                                                         >
                                                         {this.props.lang.BUTTON_UPDATE}
                                                         </Text>

                                            </TouchableOpacity>
                                            </View>
                                          <View style={{height:45,marginTop:20,width:'100%',flexDirection:'row'}}>

                                            <View style={{width:'50%'}}>

                                              </View>
                                          <View style={{width:'50%'}}>
                                            <TouchableOpacity
                                                  onPress={this.clickToLanguage}
                                                  >


                                                        <Text  style={{ textAlign:'right',color:'#fff',fontWeight:'bold',fontSize:16}}
                                                              >
                                                              {this.props.lang.MENU_LANGUAGE}
                                                              </Text>

                                              </TouchableOpacity>
                                              </View>


                                            </View>
                                              
                                            
                                          <View style={{justifyContent:'center',backgroundColor:'#FFFFFF10',height:45,marginTop:0,marginBottom:20}}>
                                          <TouchableOpacity
                                            onPress={this.clickToLogout}
                                          >
                                                 <Text  style={{ textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:16,width:'100%'}} >
                                                     {this.props.lang.MENU_LOGOUT}
                                                         </Text>
                                                 </TouchableOpacity>
                                            </View>
                                            </View>
                                          </ScrollView>
                                           </View>
                                      </View>
                                  </ImageBackground>
                            </View>
              </SafeAreaView>

                      );
                                                    }
    }


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
        height:40,
       borderColor: 'white',
       borderRadius: 4,
       width:'100%',
       color: 'white',
       marginLeft:5

    },
});

const styles = StyleSheet.create({
  mainRowLast: {
    flexDirection: 'row',

            width:'100%',
          },
          
    mainRowHeading: {
        width:'100%',backgroundColor:'#FFFFFF10',height:45,marginTop:5,marginBottom:10,
        paddingBottom:5,
       
    }, 
       mainRowHeadingText: {
       textAlign:'left',fontSize:20,margin:8,
       
       
    }, 
    
       mainRow: {
        flexDirection:'row',width:'100%', 
        borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,
        marginBottom:15,
       
    }, 
    
 viewContent: {
    width: '33%'
            },
    viewText: {
    width: '67%'
            },
    textArea: {
    height:40,
            borderRadius:3,
            justifyContent: "flex-start",
            paddingLeft:10,
             fontSize:16,
            width: '100%', backgroundColor: '#ffffff', color:'#000'
    },
    textSub: {
        color: '#000',
        fontSize: 16,
        paddingTop:10,

        },

        textTittle: {
            color: '#fff',
            fontSize: 18,

            textAlign:'left',
            backgroundColor:'#1A44F2',
            padding:10,
            fontWeight:'bold',
            width:'100%'
            },
            textBottom: {
                color: '#fff',
                fontSize: 16,

                textAlign:'left',
                backgroundColor:'#1A44F2',
                padding:10,
                width:'100%'
       },

  containerView: {

      justifyContent: 'space-around',
      backgroundColor: '#1A44F2',
      flexDirection: 'row',
      padding: 10,
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
  },

  ImageStyle: {
     height: 25,
      width: 25,
},

  textStyle: {
    fontSize: 20,
    color: 'white',
    textAlign:'left',


  },

    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

                paddingTop: (Platform.OS === 'ios') ? 20 : 0
            },

    container_logo: {
        //  margin: 0,
        marginBottom: 20,
        padding: 0,
        alignItems: 'center',
    },
    shadow1: {
        //  margin: 0,
        marginBottom: 0,
        padding: 0,
        alignItems: 'center',
    },

    container_home: {
        backgroundColor: '#4286f4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 50,

    },
    imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 8,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    ImageStyle_birth: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        //paddingLeft:10,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    viewStyleOne: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b642f4'
    },
    textStyle: {
        textAlign: 'center'
    },
    innerContainer: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'flex-start' //replace with flex-end or center
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#0f0',
        borderWidth: .5,
        borderColor: '#1A44F2',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',

        height: 40,
        borderRadius: 5,
        margin: 20,
        width: 267,
        paddingLeft: 40,
        shadowOffset: {width: 5, height: 5, },
        borderWidth: 1,

    },

    SectionStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:'80%',
        height: 40,




    },
    SectionStyle2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:'80%',
      height: 40,
      marginTop:5

    },
    textInput:
            {
              flex: 1, width: 100, fontSize:17,height:40,marginLeft:5,color:'#fff'
            },
            
      textInput1:
            {
             fontSize:16,height:100,marginLeft:5,color:'#fff',
             textAlignVertical: 'top',
             paddingTop:0,
            },      
            
            
    SplashScreen_RootView:
            {
                flex: 1,
                margin: 0,
                position: 'absolute',
                width: '100%',
                height: '100%',

            },
    SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',

                flex: 1,

            },

    TouchableOpacity_Style: {

        position: 'absolute',
        zIndex: 100000

    },
    container2: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'flex-start' //replace with flex-end or center
    },
   
    containerActivety: {

        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        zIndex: 10000000,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
logo: {

        marginTop: 30,
        },
containerSub:
{
 margin:40   
}

});

function mapStateToProps({ lang, selectedLangCode , auth }){
    
////debugger;
let data =  lang.body[selectedLangCode]
console.log(auth);
  return {
    lang:data,
    profileData:auth,
    selectedLangCode:selectedLangCode
  };
}
 export default connect(mapStateToProps,actions)  (Profile);
//     function mapStateToProps({ lang, selectedLangCode }){
//    ////debugger;
//    let data =  lang.body[selectedLangCode]
//return { lang: data , selectedLangCode:selectedLangCode };
//}
//
//
// export default connect(mapStateToProps,actions) (Feedback);