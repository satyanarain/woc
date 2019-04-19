/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet, TextInput,KeyboardAvoidingView, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ResponsiveImage from 'react-native-responsive-image';
import { connect } from 'react-redux';
import CustomHeader from './CustomHeader';
class Registration extends React.Component {
   

    constructor(props) {
        super(props);

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


        };

    }

    /***********************************************************/
    componentDidMount() {
      //alert(this.props.lang.REGISTER_AGE)
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
clickSuggestedCentres=()=>
{
  Actions.SuggestedCentres();
}
clickToHome=()=>
{
  Actions.Home();
}
 clickToSuggestedCentreDetails(){
                    Actions.SuggestedCentreDetails();
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

                  clickToRegistration = () =>{
                      var isValid    = this.validate(this.state.txtEmail);
                    //  alert(this.state.txtPassword.length);
                    if (this.state.txtFName === undefined) {
                      alert(this.props.lang.REGISTER_PATIENT_NAME_ERROR);
                    }  else if (this.state.txtLName === '') {
                        alert(this.props.lang.REGISTER_PATIENT_NAME_ERROR);
                    }
                     else if (this.state.txtAge === undefined) {
                        alert(this.props.lang.REGISTER_AGE_ERROR);
                    } else if (this.state.txtMobile === undefined) {
                        alert(this.props.lang.REGISTER_MOBILE_NO_ERROR);
                    }
                    else if (this.state.txtEmail === '') {
                       alert(this.props.lang.REGISTER_EMAIL_ERROR);
                   }
                       else if (isValid === false) {
                          alert(this.props.lang.REGISTER_EMAIL_VALID_ERROR);
                    } else if (this.state.txtPassword === undefined) {
                      alert(this.props.lang.REGISTER_PASSWORD_ERROR);}
                    // }else if (this.state.txtPassword.length < 6) {
                    //     alert('The Password should be at least 6 characters');
                    // }REGISTER_CONFIRM_PASSWORD
                     else if (this.state.txtConifPassword === undefined) {
                        alert(this.props.lang.REGISTER_CONFIRM_PASSWORD_ERROR);
                    } else if (this.state.txtPassword !== this.state.txtConifPassword) {
                          alert(this.props.lang.REGISTER_CONFIRM_PASSWORD_ERROR);
                    }else{

                    this.setState({loaded: true});
                            ServiceClass.signUp(this.state.txtFName,this.state.txtLName,this.state.txtEmail,this.state.txtMobile,this.state.txtPassword,this.state.txtAge,'signup-member').then((reData) => {
                               debugger;
                                 console.log(reData);
                                 if (reData.data.response.httpCode === '200'){
                                   //this.props.saveLoginData(reData.data.response.body);
                                    this.setState({loaded: false});
                                   alert(reData.data.response.message);
                                    Actions.pop();

                                 }else{
                                   alert('error');
                                    this.setState({loaded: false});
                                 }


                            }).catch((error) => {
                                //debugger;
                                console.log(error);
                                 alert("This Email ID is already existing. Please try another Email ID.");
                                this.setState({loaded: false});
                                  //alert(error)
                            });

                    }

                  }



  

    render() {

        const isIos = Platform.OS === 'ios'
        const {
            Login,
            loaded
        } = this.state;

    return (
              <View style={styles.container}>
<CustomHeader
              headerText={this.props.lang.REGISTER_HEADER}

              />
                                      <ImageBackground
                                          style={styles.imgBackground}
                                          resizeMode='cover'
                                          source={require('../../assets/background.jpg')}>
                                             <KeyboardAwareScrollView>
                                          <View style={styles.container}>
                                            
                                                    <ResponsiveImage
                source={require('../../assets/logo.png')}
                initWidth="164" initHeight="91" style={styles.logo}/>                                               
                                              <View style={{width:320}}>
                                              <View styles={styles.mainRowHeading}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8,marginLeft:3}}
                                                                  >
                                                                  {this.props.lang.REGISTER_PERSONAL_INFO}
                                                                  </Text>
                                                  </View>
                                              <View style={styles.mainRow}>

                                              <View style={styles.SectionStyle1}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.REGISTER_NAME}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
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
                                                      onChangeText={txtAge => this.setState({txtAge})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={styles.mainRow}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:3}}
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
                                                          onChangeText={txtEmail => this.setState({txtEmail})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>


                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          secureTextEntry={true}
                                                          placeholder={this.props.lang.REGISTER_PASSWORD}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          onChangeText={txtPassword => this.setState({txtPassword})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={styles.mainRow}>
                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={styles.textInput}
                                                          placeholder={this.props.lang.REGISTER_CONFIRM_PASSWORD}
                                                          placeholderTextColor="#fff"
                                                          secureTextEntry={true}
                                                          underlineColorAndroid="transparent"
                                                          onChangeText={txtConifPassword => this.setState({txtConifPassword})}
                                                          />
                                                  </View>
                                                  </View>

                                          {
                                            (loaded === true) ? <View style={styles.containerActivety}>
                                            <View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                                          }

                                         {/* <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',height:45,marginTop:20}}>
                                          <TouchableOpacity
                                            onPress={this.clickToRegistration}
                                          >
                                          <View style={{flexDirection:'row',width:'100%', justifyContent: 'center',
                                            alignItems: 'center'}}>
                                          <Image
                                                   source={require('../../assets/signInBtn_icon.png')}
                                                   style={{width:17,height:19,marginRight:10}}
                                                   />

                                                   <Text  style={{ color:'#000',fontWeight:'bold',fontSize:16}}
                                                         >
                                                         {this.props.lang.REGISTER_BUTTON_SUBMIT}
                                                         </Text>
                                              </View>
                                            </TouchableOpacity>
                                            </View>*/}
                                            
                                            
                                             <TouchableOpacity
                    onPress={this.clickToRegistration}
                    style={styles.buttonHeading}
                    >
                    <View style={styles.signUp}>
                       
                            <Image
                                source={require('../../assets/signInBtn_icon.png')} style={styles.signButton}
                                />
                             <Text style={styles.textHeadingImage}>
                            {this.props.lang.REGISTER_BUTTON_SUBMIT}
                            </Text>
                   </View>
                </TouchableOpacity>
                                   
                                          <View style={{width:'100%',flexDirection:'row',marginTop:20,justifyContent:'center',alignItems:'center'}}>

                                            <TouchableOpacity
                                                  onPress={this.clickToLogin}
                                                 style={{width:'100%'}} >


                                                        <Text  style={{ textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:16}}
                                                              >
                                                            {this.props.lang.REGISTER_OLD_ACCOUNT}
                                                              </Text>

                                                      </TouchableOpacity>

                                                      </View>
                                                      <View style={{width:'100%',flexDirection:'row',marginTop:20,height:30,justifyContent:'center',alignItems:'center'}}>
                                                       </View> 
                                                      
                                
                                          </View>
                                        
                                      </View>
                                        </KeyboardAwareScrollView>
                                  </ImageBackground>




              </View>

                      );
                                                    }
    }


const styles = StyleSheet.create({
  mainRowLast: {
    flexDirection: 'row',

            width:'100%',
  },
      mainRowHeading: {
        width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10
       
    }, 
     mainRow: {
       flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15
       
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


    imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
  
    SectionStyle1: {
        flexDirection: 'row',
      
        width:'80%',
        height: 40,
 },
    SectionStyle2: {
      flexDirection: 'row',
    
      width:'80%',
      height: 40,
      marginTop:5

    },
    textInput:
            {
       fontSize:16,
       height:40,
       width:'100%'
     
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

 buttonHeading: {
         flexDirection:'row',width:'100%', justifyContent: 'center',alignItems: 'center'
        },
        signUp: {

        justifyContent:'center', alignItems:'center', backgroundColor:'white', height:45, marginTop:20,  width:'100%', flexDirection:'row'

        },
         textHeadingImage: {

        color:'#000', fontWeight:'bold', fontSize:16,width:'20%'

        },
        signButton:{width:17, height:19, marginRight:10},
 logo: {

        marginTop: 30,
        },


});

function mapStateToProps({ lang, selectedLangCode }){
  // debugger;

let data =  lang.body[selectedLangCode]
console.log(data);

  return {

    lang:data
  };
}
 export default connect(mapStateToProps)  (Registration);
