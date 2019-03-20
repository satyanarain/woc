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
import ResponsiveImage from 'react-native-responsive-image';
class SuggestedCentres extends React.Component {
    static navigationOptions = {title: '', header: null, navigationBarHidden: true};

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            

        };
//this.state = {date:"2016-05-15"}
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

    return (
              
      
       <SafeAreaView style={styles.safeArea}>
       <View style={styles.MainContainer}>
           <ImageBackground
                                          style={styles.imgBackground}
                                          resizeMode='cover'
                                          source={require('../../assets/background.png')}>
                                           <View style={{ width: '100%' }}>
              <CustomHeader
              headerText={'Suggested Centres'}

              />
               </View>
                           <View style={styles.subcontainer}>
                                          <View style={styles.logo}>
                                              <ResponsiveImage  source={require('../../assets/logo.jpg')}   initWidth="159" initHeight="73"/>      
                                            </View>    
                                             <KeyboardAwareScrollView>
                                              <View style={styles.searchTop}>
                                              <View style={styles.searchText}>
                                              <TextInput style = {styles.input}
                                                underlineColorAndroid = "transparent"
                                                placeholder = "Search by Keyword"
                                                placeholderTextColor = "#9a73ef"
                                                autoCapitalize = "none"
                                                onChangeText = {this.searchText}/>    
                                              </View>
                                              <View style={styles.searchImage}>
                                                   <ResponsiveImage
                                                  source={require('../../assets/search.png')}  initWidth="16" initHeight="16"/>
                                              </View>
                                              </View>
                                              <View style={styles.search}>
                                              <View style={styles.searchText}>
                                              <TextInput style = {styles.input}
                                                underlineColorAndroid = "transparent"
                                                placeholder = "Search by Keyword"
                                                placeholderTextColor = "#9a73ef"
                                                autoCapitalize = "none"
                                                onChangeText = {this.searchText}/>    
                                              </View>
                                              <View style={styles.searchImage}>
                                                   <ResponsiveImage
                                                  source={require('../../assets/downArrow.png')}  initWidth="16" initHeight="16"/>
                                              </View>
                                              </View>
                                              
                                              
                                              
                                              
                                              
                                              
                                          </KeyboardAwareScrollView>
                                </View>
                              </ImageBackground>
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
     imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
 input: {
      margin: 15,
      height: 20,
      borderColor: '#ccc',
     borderRadius:5
   },
 searchTop: {
      width:'100%',
      backgroundColor:'#ccc',
      flexDirection:'row',
      height:30,
       // backgroundColor:'transparent',
       // opacity: 0.6
       borderBottomWidth:1,
       borderColor:"#fff"
     },
 search: {
      width:'100%',
      backgroundColor:'#ccc',
      flexDirection:'row',
      height:30,
      
       
     },
    searchText: {
       width:'90%',
   },
 searchImage: {
      width:'10%',
      paddingTop:7,
      paddingLeft:10,
   },

  logo: {
       
        marginBottom: 10,
        padding: 0,
   
     width:'100%'        
    },
  subcontainer: {
       width:'90%',
        marginLeft: 20,
    },
});
 export default SuggestedCentres;
