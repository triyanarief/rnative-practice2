import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var ICON_WIDTH = Math.floor(width * .1);
var ICON_HEIGHT = Math.floor(width * .1);


var ForgotPasswordConfirm = React.createClass({

  back_button_pressed(){
    this.props.navigator.popToTop()
  },
  render(){
    return<View style={styles.container}>

        {/* Navigation bar*/}

        <View style={styles.containerSection1}>
            <View style={styles.containerSection1_1}>
            <TouchableWithoutFeedback onPress={this.back_button_pressed}>
                <Image
                  source={require('../images/ld_profile_bb_myclasses_orange.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}>
                </Image>
            </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerSection1_2}>{/* Login title start */}
            <TouchableWithoutFeedback onPress={this.back_button_pressed}>
            <View>
              <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:14,fontWeight:'normal',color:'black',marginBottom:10}}>
              Check your email!{"\n"}We sent you a new password.
              </Text>
              </View>
              </TouchableWithoutFeedback>
            </View>{/*title End */}
          </View>

        {/* Empty section */}
        <View style={styles.containerSection2}>
        <TouchableWithoutFeedback onPress={this.back_button_pressed}>
        <View>
        <Text>
        </Text>
        </View>
        </TouchableWithoutFeedback>
        </View>

    </View>
},


  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',
    backgroundColor: 'rgb(245,255,245)',
  },
  containerSection1 : {//header
    flexDirection:'row',
    flex:1,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: 'rgb(255,255,255)',
    borderColor:'gray',
    borderWidth:1
  },
  containerSection1_1 : {//header icon
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
  },
  containerSection1_2 : {//text
    flex:4,
    alignItems: 'flex-start',
    justifyContent:'center',
  },

  containerSection2 : {//ForgotPassword Button
    flex:7,
    alignItems:'stretch',
    justifyContent:'center',
  },



});

module.exports = ForgotPasswordConfirm;
