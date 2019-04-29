import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';
class CustomHeader extends Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = { count: 0 };
    }
 render() {
      return (
                <View style={styles.containerView}>
                    <View style={{width: '20%',padding:0}}>
                    <TouchableOpacity
                      onPress={() => Actions.pop()}
                   style={{width:120,paddingLeft:20,height: 48,}}
                      
                    >
                                      <Image
      
                                             source={require('../../assets/Back-icon.png')} style={styles.ImageStyle}
                                      />
                        </TouchableOpacity>
                          </View>
                          <View style={{width: '80%', height: 40, paddingTop: 5,paddingRight: 50,alignItems: 'center',}} >
                            <Text style={styles.textStyle}>{this.props.headerText}</Text>
      
                        </View>
                  </View>


      );
    }

}


const styles = {

  containerView: {
    flex: 0,
      justifyContent: 'space-around',
      flexDirection: 'row',
     
      height: 48,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative',
      backgroundColor:'#e48478',
  },

  ImageStyle: {
    width:9,
    height:13,
    marginTop:17,
    
},

  textStyle: {
    fontSize: 18,
    alignItems: 'center',
    //justifyContent: 'center',
     fontFamily: "PTS75F",
     color:'#fff',
     marginTop:5,

  }
};

export default CustomHeader;
