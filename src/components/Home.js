/*
 * @author satya
 * created date  22nd March 2019
 * Modified 22nd March 2019
 * This is Home Screen
 */
import React from 'react';
import { StyleSheet, TextInput,KeyboardAvoidingView,SafeAreaView, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import CustomHeader from './CustomHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
import * as actions from '../../actions';

class Home extends React.Component {
    static navigationOptions = {title: '', header: null, navigationBarHidden: true};

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
         };

    }
 /***********************************************************/
    componentDidMount() {

    }

    /*
     @handleKeyDown: this function use to close the keyboard on return click.
                   */
    handleKeyDown = (e) => {
        if (e.nativeEvent.key == "Enter") {
            Keyboard.dismiss();
        }
    }

   render() {

        const isIos = Platform.OS === 'ios'
        const {
            Login,
            loaded
        } = this.state;

const placeholder = {
            label: 'Select a sport...',
            value: null,
            color: '#9EA0A4',
        };

 return (
         <SafeAreaView style={styles.safeArea}>
                   <View style={styles.MainContainer}>
                       <View style={styles.subcontainer}>
                           <KeyboardAwareScrollView>
                               <View style={styles.mainRow}>
                                   <View style={styles.rowLeft}>
                                       <ResponsiveImage  source={require('../../assets/home-logo.png')}   initWidth="147" initHeight="67"/>
                                   </View>
                                   <View style={styles.rowRight}>
                                       <TouchableOpacity
                                           style={styles.button}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>
                                           <ResponsiveImage source={require('../../assets/donate.png')}  initWidth="16" initHeight="16"/>{this.props.lang.MENU_DONATE}</Text>
                                       </TouchableOpacity>

                                   </View>
                               </View>
                               { /*******************************************Suggested Centres start************************/}
                               <View style={styles.mainRow}>
                                   <View style={styles.rowLeft}>
                                       <Text style={styles.textColorBold}>{this.props.lang.MENU_SUGGESSTION}</Text>
                                   </View>
                                   <View style={styles.rowRight}>
                                       <TouchableOpacity onPress={this.onPress}
                                                         >
                                           <Text style={styles.textColorLink}>View More</Text>
                                       </TouchableOpacity>

                                   </View>
                               </View>
                               { /***********************images********************************************/}
                               <View style={styles.spaceBetween}>
                                   <View style={styles.suggestedImg}>
                                       <Image source={require('../../assets/sc_box_img1.png')}  style={styles.imgRadius}/>
                                       <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                                   <View style={styles.suggestedImg}>
                                       <Image source={require('../../assets/sc_box_img1.png')}  style={styles.imgRadius}/>
                                       <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                                   <View style={styles.suggestedImg}>
                                       <Image source={require('../../assets/sc_box_img1.png')}  style={styles.imgRadius}/>
                                       <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                               </View>
                                { /**********************************Suggested Centres end*********************************/}

                               { /*******************************************Training Centres start************************/}
                               <View style={styles.mainRowSub}>
                                   <View style={styles.rowLeft}>
                                       <Text style={styles.textColorBold}>{this.props.lang.MENU_TRAINING}</Text>
                                   </View>
                                   <View style={styles.rowRight}>
                                       <TouchableOpacity onPress={this.onPress}
                                                         >
                                           <Text style={styles.textColorLink}>View More</Text>
                                       </TouchableOpacity>

                                   </View>
                               </View>
                               { /***********************images********************************************/}
                               <View style={styles.spaceBetween}>
                                   <View style={styles.suggestedImg}>
                                    <Image source={require('../../assets/sc_box_img1.png')} style={styles.imgRadius}/>
                                      <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                                   <View style={styles.suggestedImg}>
                                       <Image source={require('../../assets/sc_box_img1.png')}  style={styles.imgRadius}/>
                                       <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                                   <View style={styles.suggestedImg}>
                                       <Image source={require('../../assets/sc_box_img1.png')}  style={styles.imgRadius}/>
                                       <Text style={styles.textColorBlack}>Tally Arena</Text>
                                   </View>
                               </View>
                                { /**********************************Training Centres end*********************************/}

                               { /***********************Profile********************************************/}
                               <View style={styles.spaceBetweenProfile}>
                                   <View style={styles.suggestedImgLeft}>

                                    <TouchableOpacity
                                           style={styles.buttonProfile}
                                           onPress={this.onPress}
                                           >
                                           <ResponsiveImage source={require('../../assets/profile.png')}  initWidth="29" initHeight="27"/>
                                           <Text style={styles.textColor}> {this.props.lang.MENU_PROFILE}</Text>
                                       </TouchableOpacity>
                                      </View>
                                      <View style={styles.suggestedImgRight}>
                                       <TouchableOpacity
                                           style={styles.buttonFeedBack}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>
                                           <ResponsiveImage source={require('../../assets/feedbackForm.png')}  initWidth="25" initHeight="26"/> {this.props.lang.MENU_FEEDBACK}</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                           style={styles.buttonTrain}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>
                                           <ResponsiveImage source={require('../../assets/trainingJobStatus.png')}  initWidth="26" initHeight="24"/> {this.props.lang.MENU_JOB}</Text>
                                       </TouchableOpacity>
                                   </View>
                                  </View>

                                { /*********************** End Profile********************************************/}
                               { /***********************Scholarship********************************************/}
                               <View style={styles.spaceBetweenProfile}>
                                   <View style={styles.scholarshipLeft}>

                                    <TouchableOpacity
                                           style={styles.buttonScholarship}
                                           onPress={this.onPress}
                                           >
                                           <ResponsiveImage source={require('../../assets/Scholarship.png')}  initWidth="29" initHeight="27"/>
                                           <Text style={styles.textColor}> {this.props.lang.MENU_SCHOLARSHIP}</Text>
                                       </TouchableOpacity>
                                    </View>
                                      <View style={styles.scholarshipRight}>
                                       <TouchableOpacity
                                           style={styles.buttonItPartner}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>
                                           <ResponsiveImage source={require('../../assets/ITPartner.png')}  initWidth="30" initHeight="22" style={{marginRight:10}}/> {this.props.lang.MENU_IT_PARTNER}</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                           style={styles.aboutUs}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>
                                           <ResponsiveImage source={require('../../assets/aboutUs.png')}  initWidth="25" initHeight="25"/>  {this.props.lang.MENU_ABOUT_US}</Text>
                                       </TouchableOpacity>
                                   </View>
                                  </View>
                                  <View style={{height:10}}></View>

                                { /***********************Profile********************************************/}
                                </KeyboardAwareScrollView>
                     </View>
                    </View>
                </SafeAreaView>
                      );
                }
    }



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0095d3',
    padding: 12,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
  },
  buttonFeedBack: {
    backgroundColor: '#0095d3',
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:0,
    paddingLeft: 10,
    marginBottom:5,
  },
  buttonItPartner: {
    backgroundColor: '#1262a1',
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:0,
    paddingLeft: 10,
    marginBottom:5,
  },
  buttonTrain: {
    backgroundColor: '#a5409f',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
    marginBottom:0,
  },
  aboutUs: {
    backgroundColor: '#f23c8b',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
    marginBottom:0,
  },
  buttonProfile: {
    backgroundColor: '#64c12b',
    padding: 12,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:0,
    marginBottom:0,
    height:100,
    width:100,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonScholarship: {
    backgroundColor: '#ff6c00',
    padding: 12,
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:0,

    height:100,
    width:100,
   textAlign:'center',
   justifyContent: 'center',
    alignItems: 'center',
  },

    buttonBottom: {
     backgroundColor: '#0095d3',
    padding: 10,
    borderRadius:10,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:8,
  },



 safeArea: {
    flex: 1,

  },
 imgRadius: {
   borderRadius:10,borderWidth:1,height: 100, width: 100,

  },
 spaceBetween: {
    flexDirection: 'row', justifyContent: 'space-between'
 },
 spaceBetweenProfile: {
    flexDirection: 'row', justifyContent: 'space-between',marginTop:20,marginBottom:0
 },

 suggestedImg: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'32%'
 },
 suggestedImgLeft: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'31%',
    fontFamily: "PTS75F",

 },
 scholarshipLeft: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'31%',
    fontFamily: "PTS75F",

 },
 suggestedImgRight: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'67%',
    fontFamily: "PTS75F",
 },
 scholarshipRight: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'67%',
    height:120,
    fontFamily: "PTS75F",
 },

   textColorBlack: {
      color:'#471e24',
       fontFamily: "PTS75F",
       fontSize:14,
       paddingTop:10,
       textAlign:'center'
   },


  MainContainer:
   {
     flex: 1,
      backgroundColor: '#fff',
      fontFamily: "PTS75F",

   },
  mainRow: {
      width:'100%',
      flexDirection:'row',
       borderBottomWidth:1,
       borderColor:"#fff",
       paddingBottom:5,
       fontFamily: "PTS75F",
     },
  mainRowSub: {
      width:'100%',
      flexDirection:'row',
       borderBottomWidth:1,
       borderColor:"#fff",
       paddingBottom:5,
       // backgroundColor: '#0f0',
        paddingTop:20,
        fontFamily: "PTS75F",
     },

    rowLeft: {
       width:'70%',
       fontFamily: "PTS75F",

   },
    textColor: {
       color:'#fff',
     fontFamily: "PTS75F",
   },
    textColorBold: {
       color:'#471e24',
      fontFamily: "PTS75F",
      fontSize:16,
   },
    textColorLink: {
       color:'#75364e',
       fontFamily: "PTS75F",
       fontSize:14,
   },
 rowRight: {
      width:'30%',
      paddingTop:7,
      paddingLeft:10,
      fontFamily: "PTS75F",

   },

 subcontainer: {
       width:'95%',
       marginTop: 10,
        marginLeft: 10,
        fontFamily: "PTS75F",
    },
});
function mapStateToProps({ lang, selectedLangCode }){
 debugger;

let data =  lang.body[selectedLangCode]
console.log(data);

  return {
   lang:data
  };
}
 export default connect(mapStateToProps)  (Home);
