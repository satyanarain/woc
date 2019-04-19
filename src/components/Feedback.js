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
import FastImage from 'react-native-fast-image'
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import call from 'react-native-phone-call';
import email from 'react-native-email';
class Feedback extends React.Component {
   

    constructor(props) {
        super(props);
          this.inputRefs = {};
        this.state = {
            loaded: false,
            token: "",
            entities:'',
           // user_id:'',
            tokenCopyFeedback: "",
            isVisible: true,
            Login: false,
            SelectedFeedbackType:'',
            txtMessage:'',
            
            arrFeedbackType:[{
              label: this.props.lang.SELECT_FEEDBACK_CENTERS,
              value: this.props.lang.SELECT_FEEDBACK_CENTERS
            },
          {
              label: this.props.lang.SELECT_FEEDBACK_COURSES,
              value: this.props.lang.SELECT_FEEDBACK_COURSES
            },
          {
              label: this.props.lang.SELECT_FEEDBACK_SCHOLARSHIP,
              value: this.props.lang.SELECT_FEEDBACK_SCHOLARSHIP
            },
          {
              label: this.props.lang.SELECT_FEEDBACK_JOBS,
              value: this.props.lang.SELECT_FEEDBACK_JOBS
            },
            
            {
              label: this.props.lang.SELECT_FEEDBACK_OTHER,
              value: this.props.lang.SELECT_FEEDBACK_OTHER
            },

            ]

        };

    }
    
clickToLogout=()=>
{
  Actions.LandingScreen();  
    
}
    /***********************************************************/
  /*
  @handleKeyDown: this function use to close the keyboard on return click.
  */
   componentWillMount() {
      this.props.fetchLang();
      this.props.getLanguage();
     //alert(this.props.getLoginData());
     AsyncStorage.getItem('logindata').then((response) =>{
       if (response !== null){
        
         
         this.setState({ isLogin: true });
        let value = JSON.parse(response);
  //    debugger;
//        console.log(value.id);
//        console.log(value[0].id);
//        console.log(value.id[0]);

this.setState({user_id:value.id});

           dispatch({type:LOGIN_SUCCESS, payload:value});


       }else{
           this.setState({ isLogin: false });
       }

      })


  } 
                  
                  
                  
                  handleKeyDown = (e) => {
                  if (e.nativeEvent.key == "Enter"){
                  Keyboard.dismiss();
                  }
                  }

                  clickToLogin(){
                    Actions.pop();
                  }

                  clickToUpdate = () =>{
                   
                    if (this.state.SelectedFeedbackType === '') {
                      alert(this.props.lang.FEEDBACK_TYPE_ERROR);
                    }  else if (this.state.txtMessage === '') {
                        alert(this.props.lang.FEEDBACK_MESSAGE_ERROR);
                    
                    }else{

                    this.setState({loaded: true});
                            ServiceClass.saveFeedbackForm(this.state.SelectedFeedbackType,this.state.txtMessage,this.state.user_id,this.props.selectedLangCode,'feedback-form').then((reData) => {
                           // debugger;
                                // console.log(reData);
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
                                 //alert(".");
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
        const Entities = require('html-entities').AllHtmlEntities;
        const entities = new Entities();


            return (
              <SafeAreaView style={{flex:1,backgroundColor:'#B98699'}}>
            <View style={styles.MainContainer}>
            <CustomHeader
              headerText={this.props.lang.MENU_FEEDBACK}

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
                                              <View style={styles.mainRow}>
                                              <View style={styles.rowHundredPercent}>
                                              <RNPickerSelect
                                                  placeholder={{
                                                      label: this.props.lang.SELECT_FEEDBACK_SELECT,
                                                      value: '',
                                                  }}
                                                  placeholderTextColor='white'
                                                  items={this.state.arrFeedbackType}
                                                  onValueChange={(value) => {
                                                      this.setState({
                                                          SelectedFeedbackType: value,
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
                                              <View style={styles.rowHundredPercent}>
                                                  <TextInput
                                                      style={styles.textInput}
                                                      placeholder={this.props.lang.FEEDBACK_MESSAGE}
                                                      placeholderTextColor="#fff"
                                                      underlineColorAndroid="transparent"
                                                      numberOfLines={10}
                                                       multiline={true}
                                                      value={this.state.txtMessage}
                                                      onChangeText={txtMessage => this.setState({txtMessage})}
                                                      />
                                                     
                                              </View>
                                              </View>
                                             

                                           {
                                                                    (loaded === true) ? <View style={styles.containerActivety}><View style={styles.loader}><ActivityIndicator style={styles.loaderSub} size="large"  /></View></View> : null
                                            }
  

                                          <View style={styles.submit}>
                                          <TouchableOpacity
                                            onPress={this.clickToUpdate}
                                          >
                                                  <Text  style={styles.submitText}
                                                         >
                                                         {this.props.lang.REGISTER_BUTTON_SUBMIT} 
                                                         </Text>

                                            </TouchableOpacity>
                                            </View>
                                          </View>
                                          </KeyboardAwareScrollView>
                                      </View>
                                  </ImageBackground>

              </View>
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
 
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    submit: 
            {
             justifyContent:'center',backgroundColor:'white',height:45,marginTop:20   
                
            },
    submitText: 
            {
             textAlign:'center',color:'#000',fontWeight:'bold',fontSize:16,width:'100%'   
                
            },
      imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
  
  
    mainRow: {
        flexDirection:'row',width:'100%', 
        borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,
        marginBottom:15,
       
    },
 
    rowHundredPercent: {
       width:'100%'
    },
 
 logo: {

        marginTop: 30,
        },
    textInput:
            {
             fontSize:16,height:100,marginLeft:5,color:'#fff',
             textAlignVertical: 'top',
             paddingTop:0,
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
    
 MainContainer:
   {
     flex: 1,
   },
   containerSub :
{
 padding:40,
},




});

function mapStateToProps({ lang, selectedLangCode }){
    //debugger;
    let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}


 export default connect(mapStateToProps,actions) (Feedback);


