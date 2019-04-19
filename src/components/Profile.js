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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
           
            txtLName:'',
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

//    this.setState({
//        txtFName:this.props.profileData.userloginData.first_name,
//        txtLName:this.props.profileData.userloginData.last_name,
//        txtEmail:this.props.profileData.userloginData.email,
//        txtMobile:this.props.profileData.userloginData.phone_number,
//        txtCity:this.props.profileData.userloginData.city_name,
//        txtState:this.props.profileData.userloginData.state_name,
//        txtPincode:this.props.profileData.userloginData.pincode,
//        txtType:this.props.profileData.userloginData.type,
//        txtQualification:this.props.profileData.userloginData.qualification,
//        txtAge:this.props.profileData.userloginData.age,
//        txtGender:this.props.profileData.userloginData.gender,
//        txtWorkExperience:this.props.profileData.userloginData.work_experience,
//        txtPatientId:this.props.profileData.userloginData.patient_id,
//        txtPatientName:this.props.profileData.userloginData.patient_name,
//        txtPatientContactNumber:this.props.profileData.userloginData.patient_contact_number,
//        txtPatientAddress:this.props.profileData.userloginData.patient_address,
//        txtPatientRelationship:this.props.profileData.userloginData.patient_relationship,
//        txtPatientDetails:this.props.profileData.userloginData.patient_detail,
//        txtProfileCompletion:this.props.profileData.userloginData.profile_completion
//
//    })
    }

    componentDidMount() {
      
      
//      ServiceClass.genericGetMethod('center-state-list').then((reData) => {
//
//          console.log(reData.data.response.body);
//      for (var item in reData.data.response.body) {
//
//                    let id = reData.data.response.body[item].id.toString();
//
//                      //debugger;
//                    console.log(id);
//                    this.state.arrState.push({
//                        label: reData.data.response.body[item].title,
//                        value: id
//                    })
//                }
//                this.setState({loaded: false});
//
//  }).catch((error) => {
//
//      this.setState({loaded: false});
//      Alert.alert(error);
//  });
    }

  searchCity= (str) =>{
//          //alert(str.toString());
//
//              this.setState({loaded: true})
//             this.setState({arrCity:[]});
//
//              let url = 'get-city-list?state='+str.toString()+'&language='+this.props.selectedLangCode
//
//              ServiceClass.genericGetMethod(url).then((reData) => {
//
//               //  debugger
//                 console.log(reData.data.response.body);
//                 for (var item in reData.data.response.body) {
//
//                               let id = reData.data.response.body[item].id.toString();
//
//                                 //debugger;
//                               console.log(id);
//                               this.state.arrCity.push({
//                                   label: reData.data.response.body[item].title,
//                                   value: id
//                               })
//                           }
//
//                  this.setState({loaded: false});
//
//            }).catch((error) => {
//
//              this.setState({loaded: false});
//              Alert.alert(error);
//            });
    }




    validate = (text) => {
      //debugger
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

                  clickToLogin(){
                    Actions.pop();
                  }

                  clickToUpdate = () =>{
                    Actions.pop();
                  }


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
                                                  <ResponsiveImage
                                                      source={require('../../assets/logo.png')}
                                                        initWidth="164" initHeight="91" style={styles.logo}/>
                                                  <KeyboardAwareScrollView>
                                              <View style={styles.containerSub}>
                                              <View styles={styles.mainRowHeading}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8}}
                                                                  >
                                                                  {this.props.lang.REGISTER_HEADER_PATIENT}
                                                                  </Text>
                                                  </View>
                                                 {
                                                                    (loaded === true) ? <View style={styles.containerActivety}><View style={styles.loader}><ActivityIndicator style={styles.loaderSub} size="large"  /></View></View> : null
                                            }
   
                                                  
                                                  
                                                  
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_NAME}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.txtPatientName}
                                                          onChangeText={txtPatientName => this.setState({txtPatientName})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_NO}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.txtPatientContactNumber}
                                                          onChangeText={txtPatientContactNumber => this.setState({txtPatientContactNumber})}
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
                                                          value={this.state.txtPatientRelationship}
                                                          onChangeText={txtPatientRelationship => this.setState({txtPatientRelationship})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>

                                                  <View style={styles.SectionStyle1}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_PATIENT_ADDRESS}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          value={this.state.txtPatientAddress}
                                                          onChangeText={txtPatientAddress => this.setState({txtPatientAddress})}
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
                                                          value={this.state.txtPatientDetails}
                                                          onChangeText={txtPatientDetails => this.setState({txtPatientDetails})}
                                                          />
                                                  </View>
                                                  </View>

                                              <View style={{width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10}}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8}}
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
                                                          SelectedLanguage: value,
                                                      });
                                                  }}

                                                  style={{ ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 15,
                                                        right: 15,
                                                    },
                                                   }}
                                                  value={this.state.SelectedLanguage}
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
                                                      keyboardType='numeric'
                                                      maxLength={3}
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
                                              <View style={{width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10}}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8}}
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
                                                          label: this.props.lang.CENTER_SELECT,
                                                          value: '',
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
                                                          label: this.props.lang.CENTER_SELECT_CITY,
                                                          value: '',
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

                                          {
                                            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                                          }

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
                                                 <Text  style={{ textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:16,width:'100%'}}
                                                         >
                                                         {this.props.lang.MENU_LOGOUT}
                                                         </Text>

                                            </TouchableOpacity>
                                            </View>



                                          </View>
                                          </KeyboardAwareScrollView>
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
        width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10
       
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
              flex: 1, width: 100, fontSize:16,height:40,marginLeft:5,color:'#fff'
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
 padding:40   
}

});

function mapStateToProps({ lang, selectedLangCode , auth }){
    
//debugger;
let data =  lang.body[selectedLangCode]
console.log(auth);
  return {
    lang:data,
    profileData:auth

  };
}
 export default connect(mapStateToProps)  (Profile);