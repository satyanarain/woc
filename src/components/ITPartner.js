/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet,TextInput,KeyboardAvoidingView,SafeAreaView,WebView,Dimensions, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import CustomHeader from './CustomHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ResponsiveImage from 'react-native-responsive-image';
import { SectionGrid } from 'react-native-super-grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image'
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import call from 'react-native-phone-call';
import email from 'react-native-email';
class AboutUs extends React.Component {
   

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            arrSuggeationCenterDetails:[]
         };

    }
    handleEmail = () => {
        const to = [this.state.arrSuggeationCenterDetails.email] // string or array of email addresses
        email(to, {
            // Optional additional arguments
          //  cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
           // bcc: 'mee@mee.com', // string or array of email addresses
            subject: '',
            body: ''
        }).catch(console.error)
    }

/***********************************************************/
 call = () => {
    //handler to make a call
    const args = {
      number:'7897979788',
      prompt: false,
    };
    call(args).catch(console.error);
  };

/**********************************************************************/

  componentWillMount(){

  this.setState({loaded: true})
//alert(this.props.itemId);
  ServiceClass.letSuggestedCenterDetails(this.props.itemId,'get-training-center-detail').then((reData) => {
    console.log(reData.data.response.body);
    this.setState({arrSuggeationCenterDetails:reData.data.response.body});
   // debugger;

this.setState({loaded: false});

}).catch((error) => {

  this.setState({loaded: false});
  Alert.alert(error);
});


}

    /*
         @handleKeyDown: this function use to close the keyboard on return click.
                   */
        handleKeyDown = (e) => {
        if (e.nativeEvent.key == "Enter"){
        Keyboard.dismiss();
        }
        }

  render() {
   const isIos = Platform.OS === 'ios'
                const {
                Login,
                        loaded
                } = this.state;
                
                
//var str = "12345.00";
//str = str.substring(0, str.length - 1); // "12345.0"
 const htmlContent = "<p>OPIANT TECHNOLOGIES PVT. LTD. is an ISO 9001:2015 certified consulting company with focus on delivering Information Technology and business excellence through various software solution  tools. Experts in developing easy-to-use, search-friendly, mobile-friendly, database driven websites and content management systems.<br>Opiant develops Customized software solutions for a variety of industries worldwide for Windows devices, iOS devices, and Android-powered devices. We offer end-to-end services in mobile app development, right from the inception of the idea to design, development, testing and quality assurance, deployment on App Store, maintenance and upgrades.<br>Specializes in developing Smart Cards and Biometrics solutions to fulfil your authentication and security requirements.<br>Our experience in our field, our expert programmers, testing team, and effective project management, help us to implement and deliver our projects on time</p>";


return (
 <SafeAreaView style={styles.safeArea}>
       <View style={styles.MainContainer}>
            <CustomHeader
              headerText={this.props.lang.MENU_IT_PARTNER}

              />
           <KeyboardAwareScrollView>
            <View style={styles.container}>
             {  
                                            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
              }
                <View style={styles.logo}>
                    <ImageBackground source={require('../../assets/opiant.png')}  style={styles.imgContent}>
                       <Text style={styles.contentHeadingWhite}></Text>
                    </ImageBackground>


                </View>
               
                    <View style={styles.containerSub}>
                     <ScrollView
                style={{ flex: 1,height:440, }}
          contentContainerStyle={styles.scrollview}
           
            >
                      
                    {/***************************row*****************/}
                        <View style={styles.mainRow}>
                            <View style={styles.rowleft}>
                              <HTMLView value={htmlContent} stylesheet={styles1} />
                            </View>
                            
                            </View>
                      {/***************************end row*****************/}      
                       <View style={styles.mainRowwtBorder}>
                           
                               
                                 <TouchableOpacity
                                           style={styles.button}
                                          onPress={this.handleEmail}
                                           >
                                           <Text style={styles.textColor}>EMAIL</Text>
                                       </TouchableOpacity>
                                         <TouchableOpacity
                                           style={styles.button1}
                                          onPress={this.call}
                                           >
                                           <Text style={styles.textColor}>CALL</Text>
                                       </TouchableOpacity>
                           
                            </View>
                   
                              </ScrollView>
                     </View>
             
            </View>
               </KeyboardAwareScrollView>
            </View>
 </SafeAreaView>
                      );
                }
    }

const styles1 = StyleSheet.create({
  p: {
      fontFamily: "PTS55F",
        color:"#000",
        padding:0,
        width:'100%',
    textAlign: 'justify',
  },
  b: {
      fontFamily: "PTS75F",
      color:'#000'
  },
});

const styles = StyleSheet.create({

 safeArea: {
    flex: 1,
 },
  MainContainer:
   {
     flex: 1,
   },
 button: {
    backgroundColor: '#e48478',
    
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
   paddingLeft:10,
    paddingRight:10,
  
  },
 button1: {
   backgroundColor: '#e48478',
   
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
    marginLeft:'4%',
     paddingLeft:15,
    paddingRight:15,
 },
 mainRow: {
      width:'100%',
      flexDirection:'row',
      
      padding:20,
     },
 
 rowleft: {
      width:'100%',

      },
 row: {
      width:'100%',
      flexDirection:'row',
      },
 rowRight: {
      width:'82%',

      },
    contents: {
      
        fontFamily: "PTS55F",
        color:"#000",
        paddingBottom:5
   },
    textColor: {
      
        fontFamily: "PTS55F",
        color:"#fff",
        padding:5,
      textAlign:'center'
   },
    contentHeading: {
       fontFamily: "PTS55F",
        color:"#000",
        fontSize:26,
    },
    contentHeadingWhite: {
       fontFamily: "PTS55F",
        color:"#fff",
        fontSize:26,
        textAlign:'center'
    },
    contentBold: {
     
        fontFamily: "PTS75F",
        fontWeight:'bold',
        color:'#000'
   },

  logo: {
        marginBottom: 10,
        padding: 0,
    width:'100%'
    },
  container: {
      backgroundColor:'#c8c8c8',
      height:600
    },
    imgContent:{
    width:'100%', 
    height:189,
    justifyContent:'center',
    alignItems:'center',
    },
  containerSub: {
      backgroundColor:'#fff',
      position: 'absolute', 
      zIndex: 1,
      marginTop:160,
      margin:15,

    },
     mainRowwtBorder: {
      width:'100%',
      flexDirection:'row',
      paddingTop:0,
      padding:20,
     
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
let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}


 export default connect(mapStateToProps,actions) (AboutUs);