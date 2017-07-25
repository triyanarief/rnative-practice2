import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';


var AImage = require('react-native-image-animation');

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var PHOTO_WIDTH = Math.floor(width * .95);
var PHOTO_HEIGHT = Math.floor(width * .95);

var IntroScreen2 = React.createClass({

  mixins: [TimerMixin],
  componentDidMount: function() {
    this.setTimeout(
      () => { console.log('Timerworks!'); },
    500
   );
 },


  animationImages:[
       require('../images/1.jpg'),
       require('../images/2.jpg'),
       require('../images/3.jpg'),   ],


  render(){
    return<View style={styles.container}>

            <View style={styles.containerSection1}>{/* Ttile  */}
            <Text style={{fontFamily: 'FFADMatro',fontSize:26,textAlign:'justify',color:'rgb(0,172,192)'}}>SHARE AND EARN{"\n"}$1 Fitness Dollar</Text>
            </View>


            <View style={styles.containerSection2}>
              <View style={styles.containerSection2_1}>
                  <View style={styles.containerSection2_1_2}>
                    <AImage
                      resizeMode='stretch'
                      animationRepeatCount= {0}
                      animationDuration={200}
                      animationImages={this.animationImages}
                      style={styles.image} />

                  </View>
              </View>
            </View>

            <View style={styles.containerSection3}>

            <Text style={{fontFamily: 'HelveticaNeue',fontSize:16,color:'rgb(129,129,129)'}}>Use Your Fitness Dollars to{"\n"}stay happy and healthy.
            </Text>


            </View>

            <View style={styles.containerSection4}>
              <View style={styles.containerSection4_1_1}>
              <Text style={{fontFamily: 'HelveticaNeue',fontSize:22,fontWeight:'bold',color:'rgb(255,255,255)',textAlign:'center'}}>
              SIGN UP
              </Text>
            </View>

            <View style={styles.containerSection4_1_2}>
            <Text style={{fontFamily: 'HelveticaNeue',fontSize:22,fontWeight:'bold',color:'rgb(255,255,255)',textAlign:'center'}}>
            LOGIN
            </Text>
          </View>
            </View>

</View>

  }

  });


var styles = StyleSheet.create({
container : {
  flex:1,
  alignItems:'stretch',
  justifyContent:'center',
},
containerSection1:{
flex:2,
alignItems:'center',
justifyContent:'flex-end',

},

containerSection2:{
flex: 8,
alignItems:'stretch',
justifyContent:'center',

},

containerSection2_1:{
flex:4,
flexDirection:'row',
alignItems:'stretch',
justifyContent:'center',

},

containerSection2_1_1:{
flex:1,
alignItems:'center',
justifyContent:'flex-start',

},

containerSection2_1_2:{
flex:1,
alignItems:'center',
justifyContent:'flex-end',

},

containerSection2_2:{
flex:4,
//flexDirection:'row',
alignItems:'stretch',
justifyContent:'center',

},

containerSection2_2_1:{
flex:1,
alignItems:'center',
justifyContent:'flex-start',

},

containerSection2_2_2:{
flex:1,
alignItems:'center',
justifyContent:'flex-end',


},


containerSection3:{
flex: 2,
alignItems:'center',
justifyContent:'center',

},

containerSection4:{
flex:2,
flexDirection:'row',
alignItems:'stretch',
justifyContent:'flex-end',
borderWidth:1,
borderColor:'blue',backgroundColor:'rgb(247,107,28)',

},

containerSection4_1_1:{
  flex:1,
  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor:'transparent',
},

containerSection4_1_2:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'transparent',

},

page:{
width:SCREEN_WIDTH,
},

image: {
        width:100,
        height:100
    }






});





module.exports=IntroScreen2;
