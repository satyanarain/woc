/*
 * @author satya
 * created password  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { AsyncStorage, StyleSheet, TextInput, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import RNPickerSelect from 'react-native-picker-select';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import UserData from './UserData';


class LandingScreen extends React.Component {
    static navigationOptions = {title: '', header: null, navigationBarHidden: true};

    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            loaded: false,
            arrLanguage: [],
            SelectedLanguage:'hi',


        };

    }
clickSuggestedCentres=()=>
{
  Actions.SuggestedCentres();
}
clickToHome=()=>
{
  Actions.Home();
}




    componentWillMount(){

      this.setState({loaded: true})

  ServiceClass.languageData('get-language-list').then((reData) => {
      for (var item in reData.data.response.body) {

                    console.log(reData.data.response.body[item].name);
                    this.state.arrLanguage.push({
                        label: reData.data.response.body[item].name,
                        value: reData.data.response.body[item].code
                    })
                }


  }).catch((error) => {

      this.setState({loaded: false});
      Alert.alert(error);
  });
    }


    /***********************************************************/
    componentDidMount() {



        var that = this;
          //  alert(DeviceInfo.getDeviceId());

        setTimeout(function () {

            that.HideSplashScreen();

        }, 1000);

        setTimeout(() => {
            this.setState({Login: true});
        }, 1000);
    }
    HideSplashScreen = () => {

        this.setState({
            isVisible: false

        });
    }

    validate = (text) => {
    //  debugger
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
    clickToRegistration = () =>{


      Actions.Registration();
    }

    clickToContinue = async () => {
      if (this.state.SelectedLanguage == ''){
        alert('Please select a language');
      }else{

          this.props.saveLanguage(this.state.SelectedLanguage);
          Actions.Login();
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



                                            <ImageBackground
                                                style={styles.imgBackground}
                                                resizeMode='cover'
                                                source={require('../../assets/background.jpg')}>
                                                <View style={{justifyContent:'center',alignItems:'center',marginBottom: 30, marginTop: 210}}>
                                                <ResponsiveImage
                                                    source={require('../../assets/logo.jpg')}
                                                    style={{height:73,width:159}}/>
                                            </View>
                                      <View style={{justifyContent:'center',alignItems:'center',padding:25}}>
                                      <RNPickerSelect
                  placeholder={{
                      label: 'Choose Language',
                      value: null,
                  }}
                  placeholderTextColor='white'
                  items={this.state.arrLanguage}
                  onValueChange={(value) => {
                      this.setState({
                          SelectedLanguage: value,
                      });
                  }}

                  style={{ ...pickerSelectStyles }}
                  value={this.state.SelectedLanguage}
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
              <TouchableOpacity
                              onPress={this.clickToContinue}
                              style = {{width:'100%'}}
                              >

                              <View style={{marginTop: 20, width:'100%',backgroundColor: 'white', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{color: 'red', textAlign: 'center'}}>Continue</Text>
                              </View>

                          </TouchableOpacity>

                      </View>
                                        </ImageBackground>


                    {
                              (this.state.isVisible === true) ? Splash_Screen : null
                    }
                    <StatusBar

                        barStyle="light-content"
                        />

   <View style={{width:'100%',flexDirection:'row',marginTop:1,justifyContent:'center',alignItems:'center'}}>

                                             <TouchableOpacity
                                                  onPress={this.clickSuggestedCentres}
                                                  >
                                                     <Text  style={{ textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:16}}>
                                                           Suggested Centres
                                                        </Text>
                                                </TouchableOpacity>
                                            </View>
                
                    </View>






                                                      );
                                                    }
  }





  const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 20,
         paddingVertical: 12,
         paddingHorizontal: 10,
         borderBottomWidth: 1,
         borderColor: 'white',
         borderRadius: 4,
         color: 'white',

         paddingRight: 30,
      },
  });

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



 export default connect(null,actions) (LandingScreen);
