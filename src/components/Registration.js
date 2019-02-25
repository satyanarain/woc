/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
 */
import React from 'react';
import { StyleSheet, TextInput,KeyboardAvoidingView, View, Alert, Button, Text, Platform, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StatusBar,Keyboard,Animated,ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import ServiceClass from './ServiceClass';

class Registration extends React.Component {
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
            date: '',
            txtLast:'',
            txtCompany:'',
            //date: '07/01/1997',

        };
//this.state = {date:"2016-05-15"}
    }

    /***********************************************************/
    componentDidMount() {
        //  ServiceClass.SecondClassFunction();
        var that = this;
          //  alert(DeviceInfo.getDeviceId());

        setTimeout(function () {

            that.HideSplashScreen();

        }, 3000);

        setTimeout(() => {
            this.setState({Login: true});
        }, 2000);
    }
    HideSplashScreen = () => {

        this.setState({
            isVisible: false

        });
    }



    validate = (text) => {
      //debugger
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


    /*
                   @handleKeyDown: this function use to close the keyboard on return click.
                   */
                  handleKeyDown = (e) => {
                  if (e.nativeEvent.key == "Enter"){
                  Keyboard.dismiss();
                  }
                  }


                  clickToRegistration = () =>{
                      var isValid    = this.validate(this.state.txtEmail);
                    //  alert(this.state.txtPassword.length);
                    if (this.state.txtName === undefined) {
                      alert('Please enter the Name.');
                    } else if (this.state.txtEmail === '') {
                        alert('Please enter the Email ID.');
                    }     else if (isValid === false) {
                        alert('You have entered an invalid Email ID!');
                    } else if (this.state.txtPassword === undefined) {
                        alert('Please enter the Password.');
                    }else if (this.state.txtPassword.length < 6) {
                        alert('The Password should be at least 6 characters');
                    }
                     else if (this.state.txtConifPassword === undefined) {
                        alert('Please enter Confirm Password.');
                    } else if (this.state.txtPassword !== this.state.txtConifPassword) {
                        alert('Please re-enter the Password.');
                    }else{

                    this.setState({loaded: true});
                            ServiceClass.signUp(this.state.txtName,this.state.txtLast,this.state.txtCompany,this.state.txtEmail,this.state.txtPassword,this.state.txtConifPassword,'v2/account').then((reData) => {
                               //debugger;
                                 console.log(reData);

                           alert("An activation link is sent on your registered Email ID!");
                           Actions.pop();
                            this.setState({loaded: false});

                            }).catch((error) => {
                                //debugger;
                                console.log(error);
                                 alert("This Email ID is already existing. Please try another Email ID.");
                                this.setState({loaded: false});
                                  //alert(error)
                            });

                    }

                  }



     headerView() {
       return (
                 <View style={styles.containerView}>
                     <View style={{width:'12%',paddingTop: 5,justifyContent:'center',alignItems:'center'}}>
                     <TouchableOpacity
                       onPress={() => Actions.pop()}
                       title=""
                     >
                                       <Image

                                              source={require('../../assets/back.png')}
                                       />
                         </TouchableOpacity>
                           </View>
                           <View style={{width:'55%',  paddingTop: 5,justifyContent:'center',alignItems:'center'}} >
                             <Text style={{fontSize: 20,
                             color: 'white'}}>Register</Text>

                         </View>
                         <View style={{width:'28%',justifyContent:'center',alignItems:'center',paddingTop:5}}>
                         <TouchableOpacity
                           onPress={() => this.clickToRegistration()}
                           title=""
                         >
                         <Image

                                source={require('../../assets/done-btn.png')}
                         />
                             </TouchableOpacity>
                               </View>

                   </View>


       );
    }

    render() {

        const isIos = Platform.OS === 'ios'
        const {
            Login,
            loaded
        } = this.state;




            return (
                    <View style={styles.MainContainer}>
                        <ImageBackground
                          style={styles.imgBackground}
                          resizeMode='cover'
                          source={require('../../assets/background-img.png')}>
                           {
                                                  (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#1A44F2" /></View></View> : null
                             }

                             <View style={{width:'100%'}}>
                             {this.  headerView()}
                             </View>



                           <ScrollView>
                           <View style={{ width:'100%'}}>
                          <View style={{marginTop:25,marginBottom:30,marginLeft:15,marginRight:15}}>
                          {/****************************************************************************/}
                          <View style={{backgroundColor:'#fff',marginBottom:25,borderRadius:15}}>
                          <View style={{backgroundColor:'#1A44F2',padding:10,borderTopRadius:5,borderTopLeftRadius: 5, borderTopRightRadius: 5,flexDirection:'row'}}>
                        <View style={{paddingTop:5}}>
                              <Image source={require('../../assets/personalInfo-icon.png')} />
                        </View>
                            <View><Text style={styles.textTittle}>PERSONAL INFORMATION</Text></View>
                          </View>
                          <View style={styles.mainRow}>

                                  <TextInput
                                      style={styles.textArea}
                                      underlineColorAndroid="transparent"
                                      placeholderTextColor="grey"
                                      placeholder=" First Name"
                                      numberOfLines={1}
                                      returnKeyType="done"
                                      onKeyPress={this.handleKeyDown}
                                      value={this.state.txtName}
                                      onChangeText={txtName => this.setState({txtName:txtName})}
                                     />


                        </View>

                        <View style={styles.mainRow}>

                                <TextInput
                                    style={styles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="grey"
                                    placeholder=" Last Name"
                                    numberOfLines={1}
                                    returnKeyType="done"
                                    onKeyPress={this.handleKeyDown}
                                    onChangeText={txtLast => this.setState({txtLast:txtLast})}
                               />


                      </View>

                      <View style={styles.mainRowLast}>

                              <TextInput
                                  style={styles.textArea}
                                  underlineColorAndroid="transparent"
                                  placeholderTextColor="grey"
                                  placeholder=" Company Name"
                                  numberOfLines={1}
                                  returnKeyType="done"
                                  onKeyPress={this.handleKeyDown}
                                  onChangeText={txtCompany => this.setState({txtCompany:txtCompany})}
                                 />

                    </View>
                    </View>

                    {/****************************************************************************/}
                      <View style={{backgroundColor:'#fff',borderRadius:15,shadowColor:'gray',shadowOpacity:0.8}}>
                    <View style={{backgroundColor:'#1A44F2',padding:10,borderTopRadius:5,borderTopLeftRadius: 5, borderTopRightRadius: 5,flexDirection:'row'}}>
                    <View style={{paddingTop:5}}>
                          <Image source={require('../../assets/loginInfo-icon.png')} />
                    </View>
                      <View><Text style={styles.textTittle}>LOG IN INFORMATION</Text></View>
                    </View>

                    <View style={styles.mainRow}>

                            <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="grey"
                                placeholder="Email ID"
                                numberOfLines={1}
                                returnKeyType="done"
                                onKeyPress={this.handleKeyDown}
                                onChangeText={txtEmail => this.setState({txtEmail:txtEmail})}
                           />


                  </View>


                  <View style={styles.mainRow}>

                          <TextInput
                              style={styles.textArea}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="grey"
                              placeholder="Enter Password (at least 6 characters)"
                              numberOfLines={1}
                              returnKeyType="done"
                              onKeyPress={this.handleKeyDown}
                              onChangeText={txtPassword => this.setState({txtPassword:txtPassword})}
                             />


                </View>


                <View style={styles.mainRowLast}>


                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="grey"
                            placeholder="Confirm Password"
                            numberOfLines={1}
                            returnKeyType="done"
                            onKeyPress={this.handleKeyDown}
                            onChangeText={txtConifPassword => this.setState({txtConifPassword:txtConifPassword})}
                           />

              </View>


  </View>
                      </View>
                      <View style={{width:'100%'}}>
                         <Text style={styles.textBottom}>After completing we will send you an email to the account you entered above so you can activate it.</Text>
                         </View>
                      </View>
                    </ScrollView>


                    </ImageBackground>

                    </View>

                                                      );
                                                    }
    }


/*
<View style={{backgroundColor:'#1A44F2', padding:10,bottom:0,position:'absolute',zIndex:10000000}}>
  <Text style={styles.textTittle}>After completing we will send you an email to the account you entered above so you can activate it.</Text>
</View>
*/


const styles = StyleSheet.create({
  mainRowLast: {
    flexDirection: 'row',

            width:'100%',


          },
  mainRow: {
    flexDirection: 'row',
            marginBottom: 5,
            width:'100%',
            borderColor:'#F2E3CE',
            borderBottomWidth:1,

            },    viewContent: {
    width: '33%'
            },
    viewText: {
    width: '67%'
            },
    textArea: {
    height:40,
            borderRadius:3,
            justifyContent: "flex-start",
            paddingLeft:10,
            fontFamily:'GOTHMBOL', fontSize:16,
            width: '100%', backgroundColor: '#ffffff', color:'#000'
    },
    textSub: {
        color: '#000',
        fontSize: 16,
        paddingTop:10,
        fontFamily:'GOTHMBOL',
        },

        textTittle: {
            color: '#fff',
            fontSize: 18,
            fontFamily:'GOTHMBOL',
            textAlign:'left',
            backgroundColor:'#1A44F2',
            padding:10,
            fontWeight:'bold',
            width:'100%'
            },
            textBottom: {
                color: '#fff',
                fontSize: 16,
                fontFamily:'GOTHMBOL',
                textAlign:'left',
                backgroundColor:'#1A44F2',
                padding:10,
                width:'100%'
                },

  containerView: {

      justifyContent: 'space-around',
      backgroundColor: '#1A44F2',
      flexDirection: 'row',
      padding: 10,
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
  },

  ImageStyle: {
     height: 25,
      width: 25,
},

  textStyle: {
    fontSize: 20,
    color: 'white',
    textAlign:'left',


  },

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
        width: 267,
        paddingLeft: 40,
        shadowOffset: {width: 5, height: 5, },
        borderWidth: 1,

    },

    SectionStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#000',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 10,
        width: 267,
    },
    SectionStyle2: {
        borderWidth: .5,
        marginRight: 30,
        width: 90,
        height: 90
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
                width: 267,
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
 export default Registration;
