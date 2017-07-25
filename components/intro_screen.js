import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,viewpager
} from 'react-native';



var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var LOGO_WIDTH = Math.floor(width * .5);
var LOGO_HEIGHT = Math.floor(width * .5);


var IntroScreen = React.createClass({

  getInitialState() {
      return {
        avatarSource: null,
        email: '',
        fname: '',
        lname: '',

      };
  },


  signup_button_pressed(){
    if (!this.state.email){
        alert('Please enter a valid Email')
    }else if (!this.state.fname){
        alert('Please enter a valid First name')
    }else if (!this.state.lname){
        alert('Please enter a valid Last name')
    }else {

    }

  },





    render(){
      return<View style={styles.container}>


              <View style={styles.containerSection1}>{/* Ttile  */}
              <Text style={{fontFamily: 'FFADMatro',fontSize:26,textAlign:'justify',color:'rgb(0,172,192)'}}>GET A GROUP{"\n"}ENERGY BOOST</Text>
              </View>


              <View style={styles.containerSection2}>
                <View style={styles.containerSection2_1}>
                    <View style={styles.containerSection2_1_1}>
                    <Text style={{fontFamily: 'HelveticaNeue',fontSize:16,color:'rgb(129,129,129)'}}>Share your{"\n"}favorite classes.
                    </Text>
                    </View>

                    <View style={styles.containerSection2_1_2}>
                    <Image
                      source={require('../images/workout_mate_Gif_animation.gif')} style={{width:LOGO_WIDTH,height:LOGO_HEIGHT,marginBottom:2}}>
                    </Image>
                    </View>
                </View>

                <View style={styles.containerSection2_2}>
                  <View style={styles.containerSection2_2_1}>
                  <Image
                    source={require('../images/workout_mate_Gif_animation.gif')} style={{width:LOGO_WIDTH,height:LOGO_HEIGHT,marginBottom:2}}>
                  </Image>
                  </View>

                  <View style={styles.containerSection2_2_2}>
                  <Text style={{fontFamily: 'HelveticaNeue',fontSize:16,color:'rgb(129,129,129)'}}>More friends means{"\n"}more fitness dollars{"\n"}towards your next class.
                  </Text>
                  </View>

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
  flexDirection:'row',
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
  alignItems:'stretch',
  justifyContent:'center',
    borderWidth:1,borderColor:'green',
},

page:{
  width:SCREEN_WIDTH,
},






  });





module.exports=IntroScreen;
