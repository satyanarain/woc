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
import { SectionGrid } from 'react-native-super-grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image'

class SuggestedCentres extends React.Component {
   

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            arrState:[],
            arrSuggeationCenter:[],
            searchData:[],
            searchQuery:'',
            selectedState:'',
        };


    }

clickToSuggestedCenterDetails=(item)=>
{
  //alert(item)
  Actions.SuggestedCentreDetails({itemId:item})  ;
    
}


componentWillMount(){

  this.setState({loaded: true})

  ServiceClass.letSuggestedCenter(this.props.selectedLangCode,'get-training-center-list').then((reData) => {


    console.log(reData.data.response.body);
    this.setState({arrSuggeationCenter:reData.data.response.body});
    this.setState({searchData:reData.data.response.body});

this.setState({loaded: false});

}).catch((error) => {

  this.setState({loaded: false});
  Alert.alert(error);
});


}

    /***********************************************************/
    componentDidMount() {
      this.setState({loaded: true})

      ServiceClass.languageData('get-state-list').then((reData) => {
        for (var item in reData.data.response.body) {

                    console.log(reData.data.response.body[item].title);
                    this.state.arrState.push({
                        label: reData.data.response.body[item].title,
                        value: reData.data.response.body[item].id
                    })
                }
  this.setState({loaded: false});

  }).catch((error) => {

      this.setState({loaded: false});
      Alert.alert(error);
  });


    }

    /*
         @handleKeyDown: this function use to close the keyboard on return click.
                   */

searchSubmit = () =>{
      console.log("am call");

          this.setState({loaded: true})

          ServiceClass.searchCenter(this.props.selectedLangCode,'get-training-center-list',this.state.searchQuery,this.state.selectedState).then((reData) => {

            //  debugger
            console.log(reData.data.response.body);
            this.setState({arrSuggeationCenter:reData.data.response.body});

              this.setState({loaded: false});

        }).catch((error) => {

          this.setState({loaded: false});
          Alert.alert(error);
        });
}



    searchChange(str){
        console.log(str);
        if (str == ''){
          Keyboard.dismiss();
          this.setState({arrSuggeationCenter:this.state.searchData});
        }else{
              this.setState({searchQuery:str});
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

             <View style={{ width: '100%' }}>
              <CustomHeader
              headerText={'Suggested Centres'}

              />
               </View>
                           <View style={styles.subcontainer}>
                                          <View style={styles.logo}>
                                              <ResponsiveImage  source={require('../../assets/logo.png')}  initWidth="164" initHeight="91"/>
                                            </View>

                                              <View style={styles.searchTop}>
                                              <View style={styles.searchText}>
                                              <TextInput style={[styles.input]}
                                              underlineColorAndroid = "transparent"
                                              placeholder = {this.props.lang.CENTER_HINT}
                                              placeholderTextColor = "#660833"
                                              autoCapitalize = "none"
                                                onChange={(event) => {
                                                  this.searchChange(event.nativeEvent.text)
                                                }}
                                                returnKeyType='search'
                                                autoFocus={false}
                                                value={ this.props.searchName }
                                                onSubmitEditing={this.searchSubmit}
                                                clearButtonMode="while-editing"
                                              />
                                              </View>
                                              <View style={styles.searchImageFirst}>
                                                   <ResponsiveImage
                                                  source={require('../../assets/search.png')}  initWidth="16" initHeight="17"/>
                                              </View>
                                              </View>
                                              <View style={styles.search}>
                                              <View style={styles.searchText1}>
                   <RNPickerSelect
                    placeholder={{
                        label: this.props.lang.CENTER_SELECT,
                        value: null,
                    }}
                     placeholderTextColor = "#660833"
                    items={this.state.arrState}
                    onValueChange={(value) => {
                        this.setState({
                            selectedState: value,
                        });
                    }}

                  style={{ ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 7,
                                                        right: 15,
                                                    },
                                                   }}
                                          Icon={() => {
                                                      return    <ResponsiveImage
                                                        source={require('../../assets/downArrow.png')}  initWidth="16" initHeight="11" />;
                                                  }}
                />
                 </View>
                        </View>
                            </View>
                                {
                                  (loaded === true) ? <View style={styles.containerActivety}>
                                  <View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                                      <ActivityIndicator size="large" color="#A82047" />
                                      </View></View> : null
                                }
                                <KeyboardAwareScrollView>
                                <View style={{width:'100%'}}>
                               <SectionGrid
                                itemDimension={150} 
                                sections={[
                                  {
                                    title: 'Title1',
                                    data: this.state.arrSuggeationCenter.slice(0, this.state.arrSuggeationCenter.length),
                                  }
                                ]}
                                style={styles.gridView}
                                renderItem={({ item, section, index }) => ( 
                                     <TouchableOpacity
                                            onPress={this.clickToSuggestedCenterDetails.bind(this,item.id)}
              
                                          >
                                  <View style={[styles.itemContainer, { backgroundColor: '#fff'}]}>
                                  <View >
                                  <View style={{}}>

                                      <FastImage
                                        style={{width:175,height:100}}
                                        source={{
                                          uri: item.icon,
                                          headers:{ Authorization: 'someAuthToken' },
                                          priority: FastImage.priority.normal,
                                        }}
                                       
                                      />
                                    </View>
                                          <View style={{borderBottomWidth:1,borderColor:'black',marginBottom:5}}>
                                            <Text
                                            numberOfLines={1}
                                            style={{fontSize:18,textAlign:'left',marginBottom:5,   fontFamily:'Helvetica'}}>{item.title}</Text>
                                          </View>
                                   </View>
                                   <View>
                                        <View style={{flexDirection:'row',marginBottom:5}}>
                                        <ResponsiveImage
                                            source={require('../../assets/location.png')}
                                            style={{marginTop:2}}
                                             initWidth="15" initHeight="18"/>
                                            <Text numberOfLines={1} style={styles.itemName}>  {item.district}{item.id}</Text>

                                        </View>
                                        <View style={{flexDirection:'row',marginBottom:5}}>
                                        <ResponsiveImage
                                            source={require('../../assets/email.png')}
                                            style={{marginTop:2}}
                                             initWidth="15" initHeight="18"/>
                                            <Text numberOfLines={1} style={styles.itemName}>  {item.email}</Text>

                                        </View>
                                        <View style={{flexDirection:'row',marginBottom:5}}>
                                        <ResponsiveImage
                                            source={require('../../assets/phone.png')}
                                            style={{marginTop:2}}
                                             initWidth="15" initHeight="18"/>
                                            <Text numberOfLines={1} style={styles.itemName}>  {item.contact_number}</Text>

                                        </View>




                                    </View>
                                  </View>
                                   </TouchableOpacity>
                                  
                                )}

                              />
                              </View>
                              </KeyboardAwareScrollView>
                             </View>
                           </SafeAreaView>
                      );
                }
    }


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      //  fontSize: 16,
        paddingTop:0,
        margin:0,
        height:30,
        paddingHorizontal: 10,
        paddingBottom:0,
        //borderWidth: 1,
        //borderColor: 'gray',
        //borderRadius: 4,
        paddingHorizontal: 10,
        //backgroundColor:'#660833',
         backgroundColor:'#f3dee6',
         fontSize:10,
        color: '#660833',
    },
    inputIOS: {
        paddingTop:0,
        margin:0,
        height:30,
        paddingHorizontal: 10,
        paddingBottom:0,
        paddingHorizontal: 10,
        backgroundColor:'#f3dee6',
        color: '#660833',

    },
});
const styles = StyleSheet.create({
  containerActivety: {

      backgroundColor: 'transparent',
      height: '100%',
      width: '100%',
      zIndex: 10000000,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
  },


 safeArea: {
    flex: 1,
    backgroundColor:'#fafafa'

  },
  MainContainer:
   {
     flex: 1,
     backgroundColor:'#fafafa'
   },
     imgBackground: {
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
        flex: 1,

    },
 input: {
    backgroundColor:'#f3dee6',
    color:'#000',
    height:30,
    paddingLeft:10,
    paddingTop:0,
    margin:0,
    borderColor:'#d0aab8',
    borderBottomWidth:1,
   justifyContent:'center',
   fontSize:15,
   justifyContent: 'center',
   alignItems: 'center'
   },
 searchTop: {
      width:'100%',
      backgroundColor:'#ccc',
      flexDirection:'row',
     
       // backgroundColor:'transparent',
       // opacity: 0.6
       borderBottomWidth:1,
       borderColor:"#fff"
     },
 search: {
      width:'100%',
      flexDirection:'row',
      },
    searchText: {
       width:'90%',

   },
    searchText1: {
       width:'100%',
       fontSize:10,

   },
 searchImageFirst: {
      width:'10%',
      paddingTop:7,
      paddingLeft:10,
      backgroundColor:'#f3dee6',
      borderColor:'#d0aab8',
     borderBottomWidth:1,
     height:30
   },
 searchImage: {
      width:'10%',
      paddingTop:7,
      paddingLeft:10,
      backgroundColor:'#f3dee6',
   },

  logo: {

        marginBottom: 10,
        padding: 0,

     width:'100%'
    },
  subcontainer: {

        margin: 10,

    },
    gridView: {

  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 5,
    height: 230,
    paddingLeft:7,
    paddingTop:10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,

  },
  itemName: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '600',
  //  fontFamily:'Helvetica'

  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});

function mapStateToProps({ lang, selectedLangCode }){
//  debugger;
    let data =  lang.body[selectedLangCode]
return { lang: data , selectedLangCode:selectedLangCode };
}


 export default connect(mapStateToProps,actions) (SuggestedCentres);
