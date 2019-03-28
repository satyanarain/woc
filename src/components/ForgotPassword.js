/*
 * @author satya
 * created password  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import {AsyncStorage, StyleSheet, TextInput, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { connect } from 'react-redux';

class ForgotPassword extends React.Component {
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
            password: '',
            placeholderPassword:'Password',
            placeholderEmail:'Password',
            forgotPassword:'',
            singUp:'',
            watchVideo:'',
            singIn:'',

        };

    }


    componentDidMount  ()  {



      //console.log(this.props.lang);

        this.setState({placeholderEmail:this.props.lang.LOGIN_EMAIL_HINT});
        this.setState({placeholderPassword:this.props.lang.LOGIN_PASSWORD_HINT});


        this.setState({watchVideo:this.props.lang.LOGIN_BUTTON_SIGN_UP});
        this.setState({singIn:this.props.lang.LOGIN_BUTTON_SIGN_IN});

    }


    validate = (text) => {

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
    clickToCancle = () =>{


      Actions.pop();
    }

    clickToLogin = () => {
      //debugger;

//ServiceClass.SecondClassFunctionWithArgument('82503220', '07/01/1997', 'login');
        const {txtEmail} = this.state;
        const {password} = this.state;

      var isValid    = this.validate(txtEmail);


        if (txtEmail === '') {
            alert(this.props.lang.FORGOT_EMAIL_ERROR);
        }   else if (isValid === false) {
            alert(this.props.lang.LOGIN_EMAIL_VALID_ERROR);
          }
          else {

            this.setState({loaded: true})
            ServiceClass.loginData(txtEmail, password,'v2/login').then((reData) => {

                    this.setState({loaded: false});
                    let token = reData.data.accessToken;
                    console.log("accessToken" + token);
                    RNSecureKeyStore.set("accessToken", token, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then((res) => {
                      console.log(res);
                    }, (err) => {
                      console.log(err);
                    });
                    this.setState({loaded: false});
                    Actions.Home();

            }).catch((error) => {
                //debugger;
                console.log(error.message);
                  alert('Please enter correct Email ID or Password');
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

        let Splash_Screen = (
                <View style={styles.SplashScreen_RootView}>
                    <Image source={require('../../assets/background.jpg')}
                           style={{height:'100%',width:'100%',flex:1}}
                             resizeMode='cover' />

                </View>);


            return (
                    <View style={styles.container}>

                        {

                                            <ImageBackground
                                                style={styles.imgBackground}
                                                resizeMode='cover'
                                                source={require('../../assets/background.jpg')}>
                                                <View style={styles.container}>
                                                    <ResponsiveImage
                                                        source={require('../../assets/logo.jpg')}
                                                        style={{marginBottom: 30, marginTop: 210,height:73,width:159}}/>
                                                    <View style={{width:320}}>
                                                    <View style={{flexDirection:'row',width:'100%',  borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,marginBottom:15}}>

                                                    <View style={{width:'12%',padding:12}}>
                                                    <ResponsiveImage
                                                        source={require('../../assets/email-icon.png')}
                                                        style={{height:13,width:18}}/>
                                                    </View>
                                                    <View style={styles.SectionStyle1}>
                                                        <TextInput
                                                            style={{flex: 1, width: 100, fontSize:16}}
                                                            placeholder={this.state.placeholderEmail}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            onChangeText={txtEmail => this.setState({txtEmail})}
                                                            />
                                                    </View>
                                                    </View>




                                                {
                                                  (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                                                }
                                                <TouchableOpacity
                                                  onPress={this.clickToLogin}
                                                >
                                                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',height:45,marginTop:20}}>

                                                <View style={{flexDirection:'row'}}>
                                                <Image
                                                         source={require('../../assets/signInBtn_icon.png')}
                                                         style={{width:17,height:19,marginRight:10}}
                                                         />

                                                         <Text  style={{ textAlign:'left',color:'#000',fontWeight:'bold',fontSize:16}}
                                                               >
                                                               {this.props.lang.FORGOT_BUTTON_OK}
                                                               </Text>
                                                    </View>

                                                  </View>
</TouchableOpacity>
<TouchableOpacity
        onPress={this.clickToCancle}
        >
                                                <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF10',height:50,marginTop:20}}>




                                                              <Text  style={{ textAlign:'right',color:'#fff',fontWeight:'bold',fontSize:18,}}
                                                                    >
                                                                    {this.props.lang.FORGOT_BUTTON_CANCEL}
                                                                    </Text>





                                                    </View>
                                                      </TouchableOpacity>
                                                </View>
                                            </View>
                                        </ImageBackground>
                    }



                    </View>
                                                      );
                                                    }
                                                }





const styles = StyleSheet.create({

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
//console.log(data);

  return { lang: data , selectedLangCode:selectedLangCode };
}

 export default connect(mapStateToProps) (ForgotPassword);
