/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet, SafeAreaView,TextInput,KeyboardAvoidingView,Linking,AsyncStorage, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';
import CustomHeader from './CustomHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ResponsiveImage from 'react-native-responsive-image';
import { SectionGrid } from 'react-native-super-grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';

class TrainigJobStatus extends React.Component {

    constructor(props) {
        super(props);
          this.inputRefs = {};
        this.state = {
            loaded: false,
            token: "",
             date:"",
             taken:"",
             training_started:"",
             training_completed:"",
             training_center:"",
             cource_engaged:"",
             scholarship_status:"",
             training_started:"",
             training_completed:"",
             
            tokenCopyFeedback: "",
            isVisible: true,
            Login: false,
            SelectedFeedbackType:'',
            txtMessage:'',
            
            arrJobType:[{
              label: this.props.lang.SELECT_JOB_TAKEN,
              value: this.props.lang.SELECT_JOB_TAKEN
            },
            {
              label: this.props.lang.SELECT_JOB_NOT_TAKEN,
              value: this.props.lang.SELECT_JOB_NOT_TAKEN
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
    // alert(this.props.getLoginData());
     AsyncStorage.getItem('logindata').then((response) =>{
       if (response !== null){
        
         
         this.setState({ isLogin: true });
        let value = JSON.parse(response);
this.setState({user_id:value.id});

           dispatch({type:LOGIN_SUCCESS, payload:value});


       }else{
           this.setState({ isLogin: false });
       }

      })


  } 
  
  /***************@function for taken not taken job ********************************************/
  
     onChangeFunc=(value)=>{
         
   alert(value)          
   this.setState({taken:value});       
                 }
  
    handleKeyDown = (e) => {
                  if (e.nativeEvent.key == "Enter"){
                  Keyboard.dismiss();
                  }
                  }

                  clickToLogin(){
                    Actions.pop();
                  }
               

                  clickToSave = () =>{
                   
                    if (this.state.training_center === '') {
                      alert(this.props.lang.TRAINING_NAME_ERROR);
                  }  else if (this.state.cource_engaged === '') {
                        alert(this.props.lang.TRAINING_COURSE_ERROR);
                  }  else if (this.state.training_started === '') {
                        alert(this.props.lang.TRAINING_START_DATE_ERROR);
                  }  else if (this.state.training_completed === '') {
                        alert(this.props.lang.TRAINING_END_DATE_ERROR);
                  }  else if (this.state.scholarship_status === '') {
                        alert(this.props.lang.TRAINING_SCHOLARSHIP_ERROR);
                 }else{
                   //  alert("rtrtr");
                    this.setState({loaded: true});
                            ServiceClass.saveTrainingJobStatusForm(this.state.training_center,this.state.cource_engaged,this.state.scholarship_status,this.state.training_started,this.state.training_completed,this.state.job_started_on,this.state.job_title,this.state.job_income,this.state.user_id,this.props.selectedLangCode,'job-status').then((reData) => {
                            // debugger;
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
                                debugger;
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
            loaded,
            taken,
        } = this.state;


            return (
                <SafeAreaView style={styles.safearea}>
              <View style={styles.MainContainer}>
              <CustomHeader
                headerText={this.props.lang.MENU_JOB}
  
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
                                                
                                                
                                               { /********************************************/}
                                                 <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_NAME}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.training_center}
                                                            onChangeText={training_center => this.setState({training_center})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_COURSE}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.cource_engaged}
                                                            onChangeText={cource_engaged => this.setState({cource_engaged})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                    
                                                      { /**********************start date**********************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                   
                                                  <DatePicker
                         style={styles.date}
                         value={this.state.training_started}
                         customStyles={{
                           dateInput: {
                         alignItems: 'flex-start',
                         borderWidth: 0,

                        },

                        placeholderText: {
                          color: '#fff',
                          fontSize: 16,
                          paddingLeft:2,
                        },
                         
                       dateText:{
                        // textAlign: 'left',

                         color: '#fff',
                            paddingLeft:0,
                           }
                     }}
                         showIcon={false}
                         //customStyles={customStyles}
                        ref='datepicker'
                         date={this.state.training_started}
                         mode="date"
                         placeholder={this.props.lang.TRAINING_START_DATE}
                         format="MM/DD/YYYY"
                         minDate="01/01/1950"
                         maxDate="01/01/2050"
                         autoComplete="off"
                         confirmBtnText="OK"
                         cancelBtnText="Cancel"
                         onDateChange={(date) => {this.setState({training_started: date})}}   />      
                                                   
                                                    </View>
                                                    </View>
{ /*****************Completion date***************************/}
              <View style={styles.mainRow}>
                 <View style={styles.subrow}>
                  <DatePicker
                         style={styles.date}
                         value={this.state.training_completed}
                         customStyles={{
                           dateInput: {
                         alignItems: 'flex-start',
                         borderWidth: 0,

                        },

                        placeholderText: {
                          color: '#fff',
                          fontSize: 16,
                          paddingLeft:2,
                        },
                         
                       dateText:{
                        // textAlign: 'left',

                         color: '#fff',
                            paddingLeft:0,
                           }
                     }}
                         showIcon={false}
                         //customStyles={customStyles}
                        ref='datepicker'
                         date={this.state.training_completed}
                         mode="date"
                         placeholder={this.props.lang.TRAINING_END_DATE}
                         format="MM/DD/YYYY"
                         minDate="01/01/1950"
                         maxDate="01/01/2050"
                         autoComplete="off"
                         confirmBtnText="OK"
                         cancelBtnText="Cancel"

                         onDateChange={(date) => {this.setState({training_completed: date})}}   /> 
                      </View>
                     </View>
                              { /********************************************/}
                                                  
                                                <View style={styles.mainRow}>
                                                <View style={styles.subrow}>
        { /********************Select box************************/}
                                              <RNPickerSelect
                                                  placeholder={{
                                                      label: this.props.lang.SELECT_JOB_SELECT,
                                                      value: '',
                                                  }}
                                                  placeholderTextColor='white'
                                                  items={this.state.arrJobType}
                                                  onValueChange={(value) => {
                                                 this.onChangeFunc(value)
                                                      this.setState({
                                                          scholarship_status: value,
                                                      });
                                                  }}

                                                  style={{ ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 15,
                                                        right:15,
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
                                                
                                               
  
                                            {
                                                                    (loaded === true) ? <View style={styles.containerActivety}><View style={styles.loader}><ActivityIndicator style={styles.loaderSub} size="large"  /></View></View> : null
                                            }
  
  
  {                                                 (taken==='Taken') ?
                                                 <View style={{backgroundColor:'#0f0'}}>
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_JOB}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.job_started_on}
                                                            onChangeText={job_started_on => this.setState({job_started_on})}
                                                            />
                                                    </View>
                                                    </View>
                                                  
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_JOB_TITLE}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.job_title}
                                                            onChangeText={job_title => this.setState({job_title})}
                                                            />
                                                    </View>
                                                    </View>
                                                    
                                                    <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_SALARY}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.job_income}
                                                            onChangeText={job_income => this.setState({job_income})}
                                                            />
                                                    </View>
                                                    </View>
                                                    </View>  : null }
                                            <View style={styles.submit}>
                                            <TouchableOpacity
                                              onPress={this.clickToSave}
                                            >
                                                    <Text  style={styles.submitText}
                                                           >
                                                           {this.props.lang.REGISTER_BUTTON_SUBMIT}
                                                           </Text>
                                                 </TouchableOpacity>
                                              </View>
                                            <View style={styles.submit}>
                                            <TouchableOpacity
                                              onPress={ ()=>{ Linking.openURL('https://winovercancer.net/WOCJobPortal/')}}
                                            >
                                                    <Text  style={styles.submitText}
                                                           >
                                                           WIN OVER CANCER JOB PORTAL
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
       width:'100%',
       color: 'white',
       

    },
    inputAndroid: {
      fontSize: 16,
       height:40,
       borderColor: 'white',
       width:'100%',
       color: 'white',
      
    },
});

const styles = StyleSheet.create({
safearea:
        {
          flex: 1, backgroundColor: '#B98699'
        },
 
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        //justifyContent: 'center',
        //  paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    date: {
        width: '100%',color:'#fff',fontSize:16
    },
     imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
   submit: 
            {
             justifyContent:'center',backgroundColor:'white',height:45,marginTop:20   
                
            },
    submitText: 
            {
             textAlign:'center',color:'#000',fontWeight:'bold',fontSize:16 ,width:'100%'  
                
            },
  
    mainRow: {
        flexDirection:'row',width:'100%', 
        borderRadius: 5,borderColor:'#fff',borderBottomWidth:1,
        marginBottom:15,
       backgroundColor:'#0f0',
    },
    mainRowNoBorder: {
        flexDirection:'row',width:'100%', 
        borderRadius: 5,
        marginBottom:15,
       
    },
      subrow: {
      flexDirection: 'row',
    backgroundColor:'#0f0',
      width:'100%',
      height: 40,
      marginTop:5

    },
 
    rowHundredPercent: {
       width:'100%'
    },
 
 logo: {

        marginTop: 30,
        },
    textArea:
            {
             fontSize:16,height:100,marginLeft:5,color:'#fff',
             textAlignVertical: 'top',
             paddingTop:0,
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
 MainContainer:
   {
     flex: 1,
   },
containerSub:
{
 padding:40   
}
,
loader:{
  width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10 
},
loaderSub:{
  color:"#1A44F2"
}

});

function mapStateToProps({ lang, selectedLangCode }){
    //debugger;
    let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}


 export default connect(mapStateToProps,actions) (TrainigJobStatus);


