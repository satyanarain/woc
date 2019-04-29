/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet,TextInput,KeyboardAvoidingView,Linking,SafeAreaView,WebView,Dimensions, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
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
 const htmlContent = `<p style="diplay:flex;justify-content:center;align-items:center;">Win Over Cancer is a registered, 80 G approved Trust working for the cause of cancer impacted families since 2011. This mobile application is a part of "Survive" project of Win Over Cancer. Any member of a cancer impacted family can benefit from this program. Under our "Survive" mission, we help members of these families get themselves skilled, get a good job, regain capabilities to earn and lead a respectable life.

Why this porject? Livelihood of more than 8 lac families is severely impacted due to cancer every year. Out of these, appx 6.5 lac families get pushed to poverty line.

This mobile application is a part of our "Survive" project. Through this application, you can search a "Skill Development Center" nearest to your area of domicile. You can contact these centers, check the ongoing courses with them and get yourself enrolled for a compatible skill development program.

On successful completion of training, we help the candidates get a job. Win Over Cancer also provides scholarship to deserving candidates on merit to help them meet the cost of such training.

Candidates can also register their profiles on the job portal at <a href="https://winovercancer.net/WOCJobPortal/">https://winovercancer.net/WOCJobPortal/</a> This is Asia's only job portal for cancer survivors.

To know more about our programs and contribute for the cause, please visit <a href="http://www.winovercancer.net">http://www.winovercancer.net</a></p>`;


return (
 <SafeAreaView style={styles.safeArea}>
       <View style={styles.MainContainer}>
            <CustomHeader
              headerText={this.props.lang.MENU_ABOUT_US}

              />
           <KeyboardAwareScrollView>
            <View style={styles.container}>
             {  
                                            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
              }
                <View style={styles.logo}>
                    <ImageBackground source={require('../../assets/about-us.png')}  style={styles.imgContent}>
                       <Text style={styles.contentHeadingWhite}>{this.props.lang.MENU_ABOUT_US}</Text>
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
                  <View style={styles.mainRowwtBorder}>
                           
                                 <TouchableOpacity
                                           style={styles.button}
                                          onPress={ () => { Linking.openURL('https://www.youtube.com/watch?v=BpylyIr6hVw')}}
                                           >
                                           <Text style={styles.textColor} numberOfLines={1}>WATCH VIDEO</Text>
                                       </TouchableOpacity>
                                
                                 <TouchableOpacity
                                           style={styles.button1}
                                          onPress={this.handleEmail}
                                           >
                                           <Text style={styles.textColor}>EMAIL</Text>
                                       </TouchableOpacity>
                                        <TouchableOpacity
                                           style={styles.buttoncall}
                                          onPress={this.call}
                                           >
                                           <Text style={styles.textColor}>CALL</Text>
                                       </TouchableOpacity>
                           
                            </View>
                      {/***************************end row*****************/}  
                         
                         
                      {/***************************end row*****************/}      
                      
                   
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
     paddingLeft:10,
    paddingRight:10,
 },
  
 buttoncall: {
   backgroundColor: '#e48478',
    
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
    marginLeft:'5%',
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
      mainRowwtBorder: {
      width:'100%',
      flexDirection:'row',
      paddingTop:0,
      padding:20,
      
     
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
      textAlign:'center',
      fontSize:13,
     
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
        textAlign:'center',
        fontWeight:'bold'
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
     containerActivety: {

        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        zIndex: 10000000,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // watchVideo:{width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'#FFFFFF10', height:50, marginTop:20},
        
      //  watchVideoText:{ textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:18,width:'100%', },
    
    
});


function mapStateToProps({ lang, selectedLangCode }){
let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}


 export default connect(mapStateToProps,actions) (AboutUs);