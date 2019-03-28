/*
 * @author satya
 * created date  2 Aug 2018
 * Modified  19 November 2018
 * This is page for Request Form Appointment
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

class SuggestedCentreDetails extends React.Component {
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

const placeholder = {
            label: 'Select a sport...',
            value: null,
            color: '#9EA0A4',
        };

return (
 <SafeAreaView style={styles.safeArea}>
       <View style={styles.MainContainer}>
            <CustomHeader
              headerText={'Suggested Centre Details'}

              />
           <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/Default-Image.png')}  style={{width:'100%', height:179}}/>
                </View>
               
                    <View style={styles.containerSub}>
                     <ScrollView
                style={{ flex: 1,height:430, }}
          contentContainerStyle={styles.scrollview}
           
            >
                      {/***************************row*****Training Partner Name ************/}
                       <View style={styles.mainRow}>
                           
                            <View style={styles.rowRight}>
                                <View style={styles.row}><Text style={styles.contentHeading}>Aaruthal Foundation</Text></View>
                                <View style={styles.row}><Text style={styles.contents}>Training Partner ID : 10000</Text></View>
                                <View style={styles.row}><Text style={styles.contents}>Job Role : 10000</Text></View>
                            </View>
                            </View>
                            
                      {/***************************end row*****************/} 
                    {/***************************row*****************/}
                        <View style={styles.mainRow}>
                            <View style={styles.rowleft}>
                                <ResponsiveImage
                                    source={require('../../assets/Contact-Icon.png')}  initWidth="44" initHeight="44"/>
                            </View>
                            <View style={styles.rowRight}>
                                <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_CONTACT_PERSON}</Text><Text style={styles.contents}> : Satya</Text></View>
                                <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_PHONE_NO}</Text><Text style={styles.contents}> : 8510074970</Text></View>
                            </View>
                            </View>
                      {/***************************end row*****************/}      
                      
                    {/***************************row*****************/}
                        <View style={styles.mainRow}>
                            <View style={styles.rowleft}>
                                <ResponsiveImage
                                    source={require('../../assets/Email-Icon.png')}  initWidth="44" initHeight="44"/>
                            </View>
                            <View style={styles.rowRight}>
                                 <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_EMAIL}</Text><Text style={styles.contents}> : satya2000chauhan@gmail.com</Text></View>
                             </View>
                            </View>
                      {/***************************end row*****************/}      
                    {/***************************row*****************/}
                        <View style={styles.mainRow}>
                            <View style={styles.rowleft}>
                                <ResponsiveImage
                                    source={require('../../assets/Address-Icon.png')}  initWidth="44" initHeight="44"/>
                            </View>
                            <View style={styles.rowRight}>
                                 <View style={styles.row}>
                                 <Text ><Text style={styles.contentBold}>{this.props.lang.CENTER_ADDRESS}</Text> <Text style={styles.contents}> : H.No. 5 Hastsal village Near Tyagi Chaupal Uttan Magar</Text></Text>
                                
                                 </View>
                            
                                
                            </View>
                            </View>
                      {/***************************end row*****************/}      
                       {/***************************row*****************/}
                        <View style={styles.mainRow}>
                            <View style={styles.rowleft}>
                                <ResponsiveImage
                                    source={require('../../assets/India-Icon.png')}  initWidth="44" initHeight="44"/>
                            </View>
                            <View style={styles.rowRight}>
                                <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_DISTRICT}</Text><Text style={styles.contents}> : Delhi</Text></View>
                                <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_CITY}</Text><Text style={styles.contents}> : Uttam Nagar</Text></View>
                                <View style={styles.row}><Text style={styles.contentBold}>{this.props.lang.CENTER_STATE}</Text><Text style={styles.contents}> : 8510074970</Text></View>
                            </View>
                            </View>
                      {/***************************end row*****************/}  
                       {/***************************row*****************/}
                        <View style={styles.mainRowwtBorder}>
                           
                                 <TouchableOpacity
                                           style={styles.button}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>Call</Text>
                                       </TouchableOpacity>
                                 <TouchableOpacity
                                           style={styles.button}
                                           onPress={this.onPress}
                                           >
                                           <Text style={styles.textColor}>Email</Text>
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
    
    borderRadius:5,
    color:'#fff',
    fontFamily: "PTS75F",
    marginTop:5,
    marginLeft:50,
    width:'21%'
  },
 mainRow: {
      width:'100%',
      flexDirection:'row',
      borderBottomWidth:1,
      borderColor:"#dfdfdf",
      padding:20,
     },
 mainRowwtBorder: {
      width:'100%',
      flexDirection:'row',
      padding:20,
     },
 rowleft: {
      width:'18%',

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
        paddingBottom:5
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
  containerSub: {
      backgroundColor:'#fff',
      position: 'absolute', 
      zIndex: 1,
      marginTop:160,
      margin:15,

    },
});

function mapStateToProps({ lang, selectedLangCode }){
 let data =  lang.body[selectedLangCode]
  return {
   lang:data
  };
}
export default connect(mapStateToProps)  (SuggestedCentreDetails);
