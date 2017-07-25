import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .05);
var BACK_ARROW_HEIGHT = Math.floor(width * .05);
var PHOTO_WIDTH = Math.floor(width);
var PHOTO_HEIGHT = Math.floor(height * .70);
var ICON_WIDTH = Math.floor(width * .06);
var ICON_HEIGHT = Math.floor(width * .06);

var UserOptions = React.createClass({

  getInitialState() {
      return {
        avatarSource: null,
        email: '',
        fname: '',
        lname: '',
      };
  },
  back_button_pressed(){
    this.props.navigator.pop()
  },
  studio_button_pressed(){

    this.props.navigator.push({name: 'addstudiostep1'})
  },

  instructor_button_pressed(){
  this.props.navigator.push({name: 'addinstructorstep1'})
  },



  render(){
    return<View style={styles.container}>

        {/* Navigation bar*/}
        <View style={styles.containerSection1}>
        <View style={styles.containerSection1_3}>{/* Empty session start*/}

        </View>{/* Empty session End*/}

          <View style={styles.containerSection1_2}>{/* Login title start */}
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}>
            List a Class
            </Text>
          </View>{/* Login title End */}
          <View style={styles.containerSection1_1}>
            <TouchableOpacity onPress={this.back_button_pressed}>
            <View style={styles.containerSection1_1_1}>{/* Back session start*/}
              <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'rgb(0,172,192)',marginRight:10}}>Close</Text>
              </View>{/* Back session End*/}
            </TouchableOpacity>
        </View>
        </View>

        {/* Photo */}
        <View style={styles.containerSection3}>
        <Image
            source={require('../images/place-holder_useroptions.png')} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT}}/>
        </View>

        {/* studio Button*/}
        <View style={styles.containerSection4}>
        <TouchableOpacity onPress={this.studio_button_pressed} style={styles.containerSection5}>
            <View style={styles.containerSection5_1}>
            <Image
              source={require('../images/ld_add_instructor_home_icon.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
            </View>
            <View style={styles.containerSection5_2}>
              <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
              I Manage a Studio
              </Text>
            </View>
            <View style={styles.containerSection5_1}>
              <Image
                source={require('../images/ld_add_instructor_right_arrow.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
            </View>
        </TouchableOpacity>
        </View>
        {/* instuctor section*/}
        <View style={styles.containerSection6}>
          <TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSection5}>
              <View style={styles.containerSection5_1}>
              <Image
                source={require('../images/ld_add_instructor_user_icon.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
              </View>
              <View style={styles.containerSection5_2}>
                <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
                I{"'"}m an Instructor
                </Text>
              </View>
              <View style={styles.containerSection5_1}>
                <Image
                  source={require('../images/ld_add_instructor_right_arrow.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
              </View>
          </TouchableOpacity>
        </View>

    </View>
}

  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',

  },
  containerSection1 : {//header
    flexDirection:'row',
    flex:10, //in percentage
    alignItems: 'stretch',
    justifyContent:'center',
    backgroundColor: 'rgb(255,255,255)',
    paddingBottom:10,
  },
    containerSection1_1 : {//header back
      flex:1,
      alignItems: 'flex-start',
      justifyContent:'flex-end',
    },
      containerSection1_1_1 : {//header back
        flexDirection:'row',
        flex:1,
        alignItems: 'center',
        justifyContent:'center',

      },
    containerSection1_2 : {//header Login text
      flex:4,
      alignItems: 'center',
      justifyContent:'center',
    },
    containerSection1_3 : {//header empty
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
    },

  containerSection3 : {//photo
    flex:70,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4 : {//studio Button
    flex:10,
    alignItems:'stretch',
    justifyContent:'center',
    backgroundColor: 'rgb(255,255,255)',

  },
  containerSection6 : {//Instructor Button
    flex:10,
    alignItems:'stretch',
    justifyContent:'center',
    backgroundColor: 'rgb(228,238,239)',

  },
  containerSection5 : {//studio elements
    flexDirection:'row',
    flex:2,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:0.5,
    borderColor:'gray'
  },
  containerSection5_1 : {//Icon
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  },
  containerSection5_2 : {//text
    flex:5,
    alignItems:'flex-start',
    justifyContent:'center'
  },



});

module.exports = UserOptions;
