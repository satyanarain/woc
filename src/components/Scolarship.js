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

class Scolarship extends React.Component {
   

        constructor(props) {
        super(props);
                this.inputRefs = {};
                this.state = {
                loaded: false,
                        token: "",
                        date:"",
                        tokenCopyFeedback: "",
                        family_income: "",
                        earning_members: "",
                        patient_relationship: "",
                        center_code: "",
                        center_details: "",
                        course_title: "",
                        course_details: "",
                        training_duration: "",
                        training_cost: "",
                        scholarship_type: "",
                        scholarship_detail: "",
                        center_poc: "",
                        isVisible: true,
                        Login: false,
                        SelectedFeedbackType:'',
                        txtMessage:'',
                        arrScholarshipType:[{
                        label: this.props.lang.SELECT_SCHOLARSHIP_COST,
                                value: this.props.lang.SELECT_SCHOLARSHIP_COST
                        },
                        {
                        label: this.props.lang.SELECT_SCHOLARSHIP_OTHER,
                                value: this.props.lang.SELECT_SCHOLARSHIP_OTHER
                        },
                        ]

                };
        }

        clickToLogout = () =>
                {
                Actions.LandingScreen();
                        }
        /***********************************************************/

        /*
         @componentWillMount: For get language.
         */
        componentWillMount() {
        this.props.fetchLang();
        this.props.getLanguage();
        AsyncStorage.getItem('logindata').then((response) => {
        if (response !== null){


        this.setState({ isLogin: true });
                let value = JSON.parse(response);
                this.setState({user_id:value.id});
                dispatch({type:LOGIN_SUCCESS, payload:value});
        } else{
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

        clickToSave = () => {

        if (this.state.family_income === '') {
        alert(this.props.lang.FAMILY_INCOME_ERROR);
        } else if(this.state.earning_members===''){
        alert(this.props.lang.EARNING_MEMBER_ERROR);
        } else if(this.state.patient_relationship===''){
        alert(this.props.lang.PATIENT_RELATION_ERROR);
        } else if(this.state.center_code===''){
        alert(this.props.lang.CENTER_CODE_ERROR);
        } else if(this.state.center_details===''){
        alert(this.props.lang.CENTER_DETAILS_ERROR);
        } else if(this.state.course_title===''){
        alert(this.props.lang.COURSE_TITLE_ERROR);
        } else if(this.state.course_details===''){
        alert(this.props.lang.CENTER_DETAILS_ERROR);
        } else if(this.state.training_duration===''){
        alert(this.props.lang.TRAINING_DURATION_ERROR);
        } else if(this.state.training_cost===''){
        alert(this.props.lang.TRAINING_COST_ERROR);
        } else if(this.state.training_cost===''){
        alert(this.props.lang.TRAINING_COST_ERROR);
        } else if(this.state.scholarship_type===''){
        alert(this.props.lang.SCHOLARSHIP_TYPE_ERROR);
        } else if(this.state.scholarship_detail===''){
        alert(this.props.lang.SCHOLARSHIP_DETAILS_ERROR);
        } else if(this.state.center_poc===''){
        alert(this.props.lang.CONTACT_DETAILS_ERROR);
      
        } else{

        this.setState({loaded: true});
                ServiceClass.saveScholarshipForm(this.state.family_income,this.state.earning_members,this.state.patient_relationship,this.state.center_code,this.state.center_details,this.state.course_title,this.state.course_details,this.state.training_duration,this.state.training_cost,this.state.scholarship_type,this.state.scholarship_detail,this.state.center_poc, this.state.user_id, this.props.selectedLangCode, 'scholarship-form').then((reData) => {
       // debugger;
        //console.log(reData);
        if (reData.data.response.httpCode === '200'){
        //this.props.saveLoginData(reData.data.response.body);
        this.setState({loaded: false});
                alert(reData.data.response.message);
                Actions.pop();
        } else{
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


            return (
                <SafeAreaView style={styles.safearea}>
              <View style={styles.MainContainer}>
              <CustomHeader
                headerText={this.props.lang.MENU_SCHOLARSHIP}
  
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
                                                            placeholder={this.props.lang.FAMILY_INCOME}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.familyincome}
                                                            onChangeText={family_income => this.setState({family_income})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.EARNING_MEMBER}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.earning_members}
                                                            onChangeText={earning_members => this.setState({earning_members})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                       
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.PATIENT_RELATION}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.patient_relationship}
                                                            onChangeText={patient_relationship => this.setState({patient_relationship})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                       
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.CENTER_CODE}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.center_code}
                                                            onChangeText={center_code => this.setState({center_code})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                       
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.CENTER_DETAILS}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.center_details}
                                                            onChangeText={center_details => this.setState({center_details})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.COURSE_TITLE}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.course_title}
                                                            onChangeText={course_title => this.setState({course_title})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.COURSE_DETAILS}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            value={this.state.txtPcourse_detailsatientName}
                                                            onChangeText={course_details => this.setState({course_details})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_DURATION}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                             keyboardType='numeric'
                                                            value={this.state.training_duration}
                                                            onChangeText={training_duration => this.setState({training_duration})}
                                                            />
                                                    </View>
                                                    </View>
                                                        { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.TRAINING_COST}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                             keyboardType='numeric'
                                                            value={this.state.training_cost}
                                                            onChangeText={training_cost => this.setState({training_cost})}
                                                            />
                                                    </View>
                                                    </View>
                                                      
                                                  
                                                <View style={styles.mainRow}>
                                                <View style={styles.rowHundredPercent}>
   
                                                <RNPickerSelect
                                                    
                                                     placeholder={{
                                                      label: this.props.lang.SCHOLARSHIP_TYPE,
                                                      value: '',
                                                  }}
                                                    placeholderTextColor='white'
                                                    items={this.state.arrScholarshipType}
                                                    onValueChange={(value) => {
                                                       this.setState({
                                                        scholarship_type: value,
                                                        });
                                                    }}
  
                                                    style={
                                                {...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 15,
                                                        right: 0,
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
  
                                           { /********************************************/}
                                                     <View style={styles.mainRow}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.SCHOLARSHIP_DETAILS}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            
                                                            value={this.state.scholarship_detail}
                                                            onChangeText={scholarship_detail => this.setState({scholarship_detail})}
                                                            />
                                                    </View>
                                                    </View>
                                                                        
                                           { /********************************************/}
                                                     <View style={styles.mainRowNoBorder}>
                                                   <View style={styles.subrow}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder={this.props.lang.CONTACT_DETAILS}
                                                            placeholderTextColor="#fff"
                                                            underlineColorAndroid="transparent"
                                                            
                                                            value={this.state.center_poc}
                                                            onChangeText={center_poc => this.setState({center_poc})}
                                                            />
                                                    </View>
                                                    </View>
                                                                        
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
       marginLeft:0

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
       
    },
    mainRowNoBorder: {
        flexDirection:'row',width:'100%', 
        borderRadius: 5,
        marginBottom:15,
       
    },
      subrow: {
      flexDirection: 'row',
    
      width:'80%',
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


 export default connect(mapStateToProps,actions) (Scolarship);


