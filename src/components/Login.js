/*
 * @author satya
 * created password  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
        import {AsyncStorage, StyleSheet, TextInput, View,Linking, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
        import ResponsiveImage from 'react-native-responsive-image';
        import { Actions } from 'react-native-router-flux';
        import ServiceClass from './ServiceClass';
        import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
        import { connect } from 'react-redux';
        import * as actions from '../../actions';
        class Login extends React.Component {

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
                this.setState({placeholderEmail:this.props.lang.LOGIN_EMAIL_HINT});
                this.setState({placeholderPassword:this.props.lang.LOGIN_PASSWORD_HINT});
                this.setState({forgotPassword:this.props.lang.FORGOT_HEADER});
                this.setState({singUp:this.props.lang.LOGIN_BUTTON_SIGN_UP});
                this.setState({watchVideo:this.props.lang.LOGIN_BUTTON_SIGN_UP});
                this.setState({singIn:this.props.lang.LOGIN_BUTTON_SIGN_IN});
        }


        validate = (text) => {

        console.log(text);
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (reg.test(text) === false)
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
        clickToRegistration = () => {


        Actions.Registration();
        }
        clickToForgotPass = () => {


        Actions.ForgotPassword();
        }

        clickToLogin = () => {
        //debugger;

//ServiceClass.SecondClassFunctionWithArgument('82503220', '07/01/1997', 'login');
        const {txtEmail} = this.state;
                const {password} = this.state;
                var isValid = this.validate(txtEmail);
                if (txtEmail === '') {
        alert(this.props.lang.LOGIN_EMAIL_ERROR);
        } else if (isValid === false) {
        alert(this.props.lang.LOGIN_EMAIL_VALID_ERROR);
        }
        else if (password === '') {
        alert(this.props.lang.LOGIN_PASSWORD_ERROR);
        } else {

        this.setState({loaded: true})
                ServiceClass.loginData(txtEmail, password, this.props.selectedLangCode, 'login').then((reData) => {

        if (reData.data.response.httpCode === '200'){
        this.props.saveLoginData(reData.data.response.body);
                this.setState({loaded: false});
                Actions.Home();
                this.setState({txtEmail:''})
        } else{
        alert('error');
        }

        this.setState({loaded: false});
        }).catch((error) => {

        alert(error.message);
                this.setState({loaded: false});
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
    <Image source={require('../../assets/background.jpg')} resizeMode='cover' />

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
                source={require('../../assets/logo.png')}
                initWidth="164" initHeight="91" style={styles.logo}/>
            <View style={styles.containerSub}>
                <View style={styles.mainRow}>

                    <View style={{width:'12%', padding:12}}>
                        <ResponsiveImage
                            source={require('../../assets/email-icon.png')}
                            style={{height:13, width:18}}/>
                    </View>
                    <View style={styles.emailbox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={this.state.placeholderEmail}
                            placeholderTextColor="#fff"
                            underlineColorAndroid="transparent"
                            onChangeText={txtEmail => this.setState({txtEmail})}
                            />
                    </View>
                </View>
                <View style={styles.mainRow}>

                    <View style={{width:'12%', padding:12}}>
                        <ResponsiveImage
                            source={require('../../assets/password-icon.png')}
                            style={{height:21, width:17}}/>
                    </View>
                    <View style={styles.passbox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={this.state.placeholderPassword}
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={password => this.setState({password})}
                            />
                    </View>
                </View>



                {
                        (loaded === true) ? <View style={styles.containerActivety}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#A82047" /></View>
                </View> : null
                }
                
                
                <TouchableOpacity
                    onPress={this.clickToLogin}
                    style={styles.buttonHeading}
                    >
                    <View style={styles.signUp}>
                       
                            <Image
                                source={require('../../assets/signInBtn_icon.png')} style={styles.signButton}
                                />
                             <Text style={styles.textHeadingImage}>
                            {this.state.singIn}
                            </Text>
                   </View>
                </TouchableOpacity>
                
                
                
                <View style={styles.forgotPasswordrow}>
                    <View style={styles.rowFiftyPercent}>
                        <TouchableOpacity onPress={this.clickToForgotPass} > 
                            <Text  style={styles.textHeadingWhite}>
                            {this.state.forgotPassword}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowFiftyPercent}>
                        <TouchableOpacity
                            onPress={this.clickToRegistration}
                            >
                            <Text  style={styles.textHeadingWhiteRight}
                                   >
                            {this.state.singUp}
                            </Text>

                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity
                    onPress={ ()=>{ Linking.openURL('https://www.youtube.com/watch?v=BpylyIr6hVw')}}
                    >
                    <View style={styles.watchVideo}>
                        <Text style={styles.watchVideoText} >Watch Video</Text>
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
        logo: {

        marginTop: 30,
        },
        buttonHeading: {
         flexDirection:'row',width:'100%', justifyContent: 'center',alignItems: 'center'
        },
        
         textHeadingImage: {

        color:'#000', fontWeight:'bold', fontSize:16,width:'20%'

        },
        signButton:{width:17, height:19, marginRight:10},
        
        
        
        
        watchVideo:{width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'#FFFFFF10', height:50, marginTop:20},
        
        watchVideoText:{ textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:18,width:'100%', },
        
        containerSub :
        {
         padding:40,   
        },
       
        
        
        row: {
        flexDirection:'row'
        },
        rowFiftyPercent: {
        width:'50%'
        },
        signUp: {

        justifyContent:'center', alignItems:'center', backgroundColor:'white', height:45, marginTop:20,  width:'100%', flexDirection:'row'

        },
        textHeadingWhite: {

        textAlign:'left', color:'#fff', fontWeight:'bold', fontSize:16

        },
        textHeadingWhiteRight: {

        textAlign:'left', color:'#fff', fontWeight:'bold', fontSize:16,
                textAlign:'right'

        },
        forgotPasswordrow: {

        width:'100%', flexDirection:'row', marginTop:20

        },
        MainContainer:
{
flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
},
        mainRow: {
        flexDirection:'row', width:'100%', borderRadius: 5, borderColor:'#fff',
                borderBottomWidth:1,
                marginBottom:15
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
        emailbox: {
        flexDirection: 'row',
                width:'88%',
                height: 40,
        },
        passbox: {
        flexDirection: 'row',
                width:'88%',
                height: 40,
                marginTop:5

        },
        textInput:
{
textAlign:'left',
        fontSize:16,
        width:'100%'
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
        loader:
{
width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10

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
let data = lang.body[selectedLangCode]
        return { lang: data, selectedLangCode:selectedLangCode };
        }

export default connect(mapStateToProps, actions) (Login);
