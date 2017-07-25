import React from 'react';
import {
  View,
  Image,
  StyleSheet,

} from 'react-native';



var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;


var LandingScreen = React.createClass({


  render(){
    return<View style={styles.container}>
        <Image
            source={require('../images/Loading_Screen.png')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT}}/>
</View>
}

  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',

  },



});

module.exports = LandingScreen;
