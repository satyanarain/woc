/*
 * @author satya
 * created date  22nd March 2019
 * Modified 22nd March 2019
 * This is Home Screen
 */
import React from 'react';
import { StyleSheet, TextInput,Linking,KeyboardAvoidingView,SafeAreaView, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
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


class Home extends React.Component {
constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            arrSuggeationCenter:[],
         };

    }
 /***********************************************************/
    componentDidMount() {

    }


    clickToSuggestedCenterViewMore = () => {
      Actions.SuggestedCentres();
    }
    clickToTraningViewMore = (strId) => {
      Actions.TraningCentresSubList({id:strId});
    }

clickToFeedBack=()=>
{

 Actions.Feedback();

}
clickToScolarship=()=>
{

 Actions.Scolarship();

}
clickToJob=()=>
{

 Actions.TrainigJobStatus();

}
clickToAboutUs=()=>
{

 Actions.AboutUs();

}


clickToProfile=()=>
{
  Actions.Profile();
}
clickToITPartner=()=>
{
  Actions.ITPartner();
}



componentWillMount(){

  this.setState({loaded: true})

  ServiceClass.languageData('get-training-list').then((reData) => {


    console.log(reData.data.response.body);
    this.setState({arrSuggeationCenter:reData.data.response.body});
    this.setState({searchData:reData.data.response.body});

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
        if (e.nativeEvent.key == "Enter") {
            Keyboard.dismiss();
        }
    }

 renderViewAll() {
        return this.state.arrSuggeationCenter.map((array, index) =>
                                    <TouchableOpacity onPress={this.clickToTraningViewMore.bind(this,array.id)} style={styles.suggestedImg}>

                                     <Image source={{uri: array.logo}}  style={styles.imgRadius}/>

                                       {/* <Text style={styles.textColorBlack}>array.title</Text> */}
                                  </TouchableOpacity>
             );
        }

 renderView() {
        return this.state.arrSuggeationCenter.map((array, index) =>
                                 <TouchableOpacity onPress={this.clickToSuggestedCenterViewMore} style={styles.suggestedImg}>

                                       <Image source={{uri: array.logo}}  style={styles.imgRadius}/>
                                       {/* <Text style={styles.textColorBlack}>{array.title}</Text> */}

                                    </TouchableOpacity>

            );
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
                            <View style={styles.subcontainer}>
                              <View style={styles.mainRow}>
                                   <View style={styles.rowLeft1}>
                                       <ResponsiveImage  source={require('../../assets/home-logo.png')}   initWidth="147" initHeight="67"/>
                                   </View>
                                   <View style={styles.rowRight1}>
                                         <TouchableOpacity
                                           style={styles.button}
                                           onPress={ ()=>{ Linking.openURL('https://www.winovercancer.net/donate/')}} >
                                           <View style={{flexDirection:'row'}}>
                                            <View><ResponsiveImage source={require('../../assets/donate.png')}  initWidth="25" initHeight="23" /></View>
                                           <View><Text style={styles.textColor}> {this.props.lang.MENU_DONATE}</Text></View>
                                           </View>
                                       </TouchableOpacity>

                                   </View>
                                </View>
                               </View>
                               { /*******************************************Suggested Centres start************************/}
                               <KeyboardAwareScrollView>
                              <View style={styles.subcontainer}>
                               <View style={styles.mainRow}>
                                   <View style={styles.rowLeft}>
                                       <Text style={styles.textColorBold}>{this.props.lang.MENU_SUGGESSTION}</Text>
                                   </View>
                                   <View style={styles.rowRight}>


                                   </View>
                               </View>
                             {
                                                                    (loaded === true) ? <View style={styles.containerActivety}><View style={styles.loader}><ActivityIndicator style={styles.loaderSub} size="large"  /></View></View> : null
                                            }

                               <View style={styles.spaceBetween}>
                                   {this.renderView()}
                                  </View>

                                { /**********************************Suggested Centres end*********************************/}
                                { /*******************************************Training Centres start************************/}
                               <View style={styles.mainRowSub}>
                                   <View style={styles.rowLeft}>
                                       <Text style={styles.textColorBold}>{this.props.lang.MENU_TRAINING}</Text>
                                   </View>
                                   <View style={styles.rowRight}>
                                       <TouchableOpacity onPress={this.clickToTraningViewMore}
                                                         >
                                           <Text style={styles.textColorLink}></Text>
                                       </TouchableOpacity>

                                   </View>
                               </View>
                               { /***********************images********************************************/}
                                 <View style={styles.spaceBetween}>
                                  { this.renderViewAll()}
                                </View>
                                { /**********************************Training Centres end*********************************/}

                               { /***********************Profile********************************************/}
                               <View style={styles.spaceBetweenProfile}>
                                   <View style={styles.suggestedImgLeft}>
                                     <TouchableOpacity
                                           style={styles.buttonProfile}
                                           onPress={this.clickToProfile}
                                           >
                                           <ResponsiveImage source={require('../../assets/profile.png')}  initWidth="29" initHeight="27"/>
                                           <Text style={styles.textColor}> {this.props.lang.MENU_PROFILE}</Text>
                                       </TouchableOpacity>
                                      </View>
                                      <View style={styles.suggestedImgRight}>
                                       <TouchableOpacity
                                           style={styles.buttonFeedBack}
                                           onPress={this.clickToFeedBack}
                                           >
                                           <View style={{flexDirection:'row',marginTop:2}}>
                                            <View><ResponsiveImage source={require('../../assets/feedbackForm.png')}  initWidth="25" initHeight="26" /></View>
                                           <View style={styles.textColorTop}><Text style={styles.textColor}>   {this.props.lang.MENU_FEEDBACK}</Text></View>
                                           </View>

                                       </TouchableOpacity>
                                       <TouchableOpacity
                                           style={styles.buttonTrain}
                                           onPress={this.clickToJob}
                                           >
                                           <View style={{flexDirection:'row',marginTop:2}}>
                                            <View><ResponsiveImage source={require('../../assets/trainingJobStatus.png')}  initWidth="26" initHeight="24" /></View>
                                           <View style={styles.textColorTop}><Text style={styles.textColor}>   {this.props.lang.MENU_JOB}</Text></View>
                                           </View>

                                       </TouchableOpacity>
                                   </View>
                                  </View>

                                { /*********************** End Profile********************************************/}
                               { /***********************Scholarship********************************************/}
                               <View style={styles.spaceBetweenProfile}>
                                   <View style={styles.scholarshipLeft}>

                                    <TouchableOpacity
                                           style={styles.buttonScholarship}
                                           onPress={this.clickToScolarship}
                                           >
                                           <ResponsiveImage source={require('../../assets/Scholarship.png')}  initWidth="29" initHeight="27"/>
                                           <Text style={styles.textColorCenter}> {this.props.lang.MENU_SCHOLARSHIP}</Text>
                                       </TouchableOpacity>
                                    </View>
                                      <View style={styles.scholarshipRight}>
                                       <TouchableOpacity
                                           style={styles.buttonItPartner}
                                           onPress={this.clickToITPartner}
                                           >
                                           <View style={{flexDirection:'row',marginTop:3}}>
                                            <View><ResponsiveImage source={require('../../assets/ITPartner.png')}  initWidth="30" initHeight="22" /></View>
                                           <View style={styles.textColorTop}><Text style={styles.textColor}>   {this.props.lang.MENU_IT_PARTNER}</Text></View>
                                           </View>

                                       </TouchableOpacity>
                                       <TouchableOpacity
                                           style={styles.aboutUs}
                                           onPress={this.clickToAboutUs}
                                           >
                                           <View style={{flexDirection:'row',marginTop:4}}>
                                            <View><ResponsiveImage source={require('../../assets/aboutUs.png')}  initWidth="25" initHeight="25" /></View>
                                           <View style={styles.textColorTop}><Text style={styles.textColor}>   {this.props.lang.MENU_ABOUT_US}</Text></View>
                                           </View>
                                        </TouchableOpacity>
                                   </View>
                                  </View>
                                  <View style={{height:10}}></View>
                                     </View>
                                { /***********************Profile********************************************/}
                                </KeyboardAwareScrollView>
</SafeAreaView>
                      );
                }
    }

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0095d3',
    padding: 8,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:5,
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
    loader:{
  width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10
},

loaderSub:{
  color:"#1A44F2"
},


  buttonFeedBack: {
    backgroundColor: '#0095d3',
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:0,
    paddingLeft: 10,
    marginBottom:10,
  },
  buttonItPartner: {
    backgroundColor: '#1262a1',
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:0,
    paddingLeft: 10,
    marginBottom:13,
  },
  buttonTrain: {
    backgroundColor: '#a5409f',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:5,
    marginBottom:0,
  },
  aboutUs: {
    backgroundColor: '#f23c8b',
    paddingBottom:6,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:5,
    marginBottom:0,
  },
  buttonProfile: {
    backgroundColor: '#64c12b',
    padding: 12,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:0,
    marginBottom:0,
    height:100,
    width:125,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonScholarship: {
    backgroundColor: '#ff6c00',
    padding: 12,
    borderRadius:5,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:0,
    height:100,
    width:125,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

    buttonBottom: {
    backgroundColor: '#0095d3',
    padding: 10,
    borderRadius:10,
    color:'#fff',
    fontFamily: "Helvetica",
    marginTop:8,
  },

 safeArea: {
    flex: 1,
     backgroundColor: '#fff',
},
 imgRadius: {
 borderRadius:10,borderWidth:1,height: 100, width: 100,
  backgroundColor: '#000',
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
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    width:'32%'
 },
 suggestedImgLeft: {
   width:'35%',
 },
 scholarshipLeft: {
   width:'35%',
},
 suggestedImgRight: {

    width:'65%',

 },
 scholarshipRight: {
    width:'65%',
},

   textColorBlack: {
      color:'#471e24',
       fontFamily: "Helvetica",
       fontSize:14,
       paddingTop:10,
       textAlign:'center'
   },

  MainContainer:
   {
     flex: 1,
      backgroundColor: '#fff',
      fontFamily: "Helvetica",

   },
  mainRow: {
      width:'100%',
      flexDirection:'row',
       borderBottomWidth:1,
       borderColor:"#fff",
       paddingBottom:5,
       fontFamily: "Helvetica",
     },
  mainRowSub: {
      width:'100%',
      flexDirection:'row',
       borderBottomWidth:1,
       borderColor:"#fff",
       paddingBottom:5,
       // backgroundColor: '#0f0',
        paddingTop:20,
        fontFamily: "Helvetica",
     },
 textColor: {
       color:'#fff',
     fontFamily: "Helvetica",
   },
    textColorCenter: {
    color:'#fff',
    fontFamily: "Helvetica",
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    },
    textColorTop: {
      marginTop:3
   },
    textColorBold: {
       color:'#471e24',
      fontFamily: "Helvetica",
      fontSize:16,
   },
    textColorLink: {
       color:'#75364e',
       fontFamily: "Helvetica",
       fontSize:14,
   },

     rowLeft: {
       width:'70%',
       fontFamily: "Helvetica",

   },
 rowRight: {
      width:'30%',
      paddingTop:7,
      paddingLeft:10,
      fontFamily: "Helvetica",

   },
     rowLeft1: {
       width:'67%',
       fontFamily: "Helvetica",

   },
 rowRight1: {
      width:'33%',
      paddingTop:7,
      paddingLeft:10,
      fontFamily: "Helvetica",

   },

 subcontainer: {
       width:'95%',
       marginTop: 10,
        marginLeft: 10,
        fontFamily: "Helvetica",
    },
});


function mapStateToProps({ lang, selectedLangCode }){
    //debugger;
    let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}

export default connect(mapStateToProps,actions) (Home);