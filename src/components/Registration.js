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
import { connect } from 'react-redux';
class Registration extends React.Component {
    static navigationOptions = {title: '', header: null, navigationBarHidden: true};

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
            txtLast:'',
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
                    }  else if (this.state.txtAge === undefined) {
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
                            ServiceClass.signUp(this.state.txtFName,this.state.txtLast,this.state.txtCompany,this.state.txtEmail,this.state.txtPassword,this.state.txtConifPassword,'signup-member').then((reData) => {
                               //debugger;
                                 console.log(reData);

                           alert("An activation link is sent on your registered Email ID!");
                           Actions.pop();
                            this.setState({loaded: false});

                            }).catch((error) => {
                                //debugger;
                                console.log(error);
                                 alert("This Email ID is already existing. Please try another Email ID.");
                                this.setState({loaded: false});
                                  //alert(error)
                            });

                    }

                  }



     headerView() {
       return (
                 <View style={styles.containerView}>
                     <View style={{width:'12%',paddingTop: 5,justifyContent:'center',alignItems:'center'}}>
                     <TouchableOpacity
                       onPress={() => Actions.pop()}
                       title=""
                     >

                         </TouchableOpacity>
                           </View>
                           <View style={{width:'55%',  paddingTop: 5,justifyContent:'center',alignItems:'center'}} >
                             <Text style={{fontSize: 20,
                             color: 'white'}}>Register</Text>

                         </View>
                         <View style={{width:'28%',justifyContent:'center',alignItems:'center',paddingTop:5}}>
                         <TouchableOpacity
                           onPress={() => this.clickToRegistration()}
                           title=""
                         >

                             </TouchableOpacity>
                               </View>

                   </View>


       );
    }

    render() {

        const isIos = Platform.OS === 'ios'
        const {
            Login,
            loaded
        } = this.state;




            return (
              <View style={styles.container}>



                                      <ImageBackground
                                          style={styles.imgBackground}
                                          resizeMode='cover'
                                          source={require('../../assets/background.jpg')}>
                                          <View style={styles.container}>
                                              <Image
                                                  source={require('../../assets/logo.jpg')}
                                                  style={{marginBottom: 30, marginTop: 50,height:73,width:159}}/>
                                                  <KeyboardAwareScrollView>
                                              <View style={{width:320}}>
                                              <View style={{width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10}}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8}}
                                                                  >
                                                                  {this.props.lang.REGISTER_PERSONAL_INFO}
                                                                  </Text>
                                                  </View>
                                              <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>

                                              <View style={styles.SectionStyle1}>
                                                  <TextInput
                                                      style={{flex: 1, width: 100, fontSize:16}}
                                                      placeholder={this.props.lang.REGISTER_NAME}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      onChangeText={txtFName => this.setState({txtFName})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={{flex: 1, width: 100, fontSize:16}}
                                                      placeholder={this.props.lang.REGISTER_LAST_NAME}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      onChangeText={txtLName => this.setState({txtLName})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                              <View style={styles.SectionStyle2}>
                                                  <TextInput
                                                      style={{flex: 1, width: 100, fontSize:16}}
                                                      placeholder={this.props.lang.REGISTER_AGE}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      keyboardType='numeric'
                                                      maxLength={3}
                                                      onChangeText={txtAge => this.setState({txtAge})}
                                                      />
                                              </View>
                                              </View>
                                              <View style={{width:'100%',backgroundColor:'#FFFFFF10',height:40,marginTop:5,marginBottom:10}}>

                                                            <Text  style={{ textAlign:'left',color:'#000',fontSize:18,margin:8}}
                                                                  >
                                                                  {this.props.lang.REGISTER_CONTACT_INFO}
                                                                  </Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={{flex: 1, width: 100, fontSize:16}}
                                                          placeholder={this.props.lang.REGISTER_MOBILE_NO}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                           keyboardType='numeric'
                                                          onChangeText={txtMobile => this.setState({txtMobile})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={{flex: 1, width: 100, fontSize:16}}
                                                          placeholder={this.props.lang.REGISTER_EMAIL}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          onChangeText={txtEmail => this.setState({txtEmail})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={{flex: 1, width: 100, fontSize:16}}
                                                          placeholder={this.props.lang.REGISTER_PASSWORD}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          onChangeText={txtPassword => this.setState({txtPassword})}
                                                          />
                                                  </View>
                                                  </View>
                                                  <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>


                                                  <View style={styles.SectionStyle2}>
                                                      <TextInput
                                                          style={{flex: 1, width: 100, fontSize:16}}
                                                          placeholder={this.props.lang.REGISTER_CONFIRM_PASSWORD}
                                                          placeholderTextColor="#fff"
                                                          underlineColorAndroid="transparent"
                                                          onChangeText={txtConifPassword => this.setState({txtConifPassword})}
                                                          />
                                                  </View>
                                                  </View>

                                          {
                                            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                                          }

                                          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',height:45,marginTop:20}}>
                                          <TouchableOpacity
                                            onPress={this.clickToRegistration}
                                          >
                                          <View style={{flexDirection:'row'}}>
                                          <Image
                                                   source={require('../../assets/signInBtn_icon.png')}
                                                   style={{width:17,height:19,marginRight:10}}
                                                   />

                                                   <Text  style={{ textAlign:'left',color:'#000',fontWeight:'bold',fontSize:16}}
                                                         >
                                                         {this.props.lang.REGISTER_BUTTON_SUBMIT}
                                                         </Text>
                                              </View>
                                            </TouchableOpacity>
                                            </View>

                                          <View style={{width:'100%',flexDirection:'row',marginTop:20,justifyContent:'center',alignItems:'center'}}>

                                            <TouchableOpacity
                                                  onPress={this.clickToLogin}
                                                  >


                                                        <Text  style={{ textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:16}}
                                                              >
                                                            {this.props.lang.REGISTER_OLD_ACCOUNT}
                                                              </Text>



                                              </TouchableOpacity>



                                          </View>

                                          </View>
                                          </KeyboardAwareScrollView>
                                      </View>
                                  </ImageBackground>




              </View>

                      );
                                                    }
    }


/*
<View style={{backgroundColor:'#1A44F2', padding:10,bottom:0,position:'absolute',zIndex:10000000}}>
  <Text style={styles.textTittle}>After completing we will send you an email to the account you entered above so you can activate it.</Text>
</View>
*/


const styles = StyleSheet.create({
  mainRowLast: {
    flexDirection: 'row',

            width:'100%',


          },
  mainRow: {
    flexDirection: 'row',
            marginBottom: 5,
            width:'100%',
            borderColor:'#F2E3CE',
            borderBottomWidth:1,

            },    viewContent: {
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
                height: 40,
                borderWidth: 1,
                marginVertical: 5,
                alignSelf: 'stretch',
                padding: 8,
                fontSize: 16,
                backgroundColor: '#ede9e0',
                color: '#ede9e0',
                borderColor: '#ede9e0',
                width: 267,
                margin: 30,
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
    box: {
        width: 100,
        height: 100
    },
    box1: {
        backgroundColor: '#2196F3'
    },
    box2: {
        backgroundColor: '#8BC34A'
    },
    box3: {
        backgroundColor: '#e3aa1a'
    },
    containerActivety: {

        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        zIndex: 10000000,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }


});

function mapStateToProps({ lang, selectedLangCode }){
  debugger;

let data =  lang.body[selectedLangCode]
console.log(data);

  return {

    lang:data
  };
}
 export default connect(mapStateToProps)  (Registration);
