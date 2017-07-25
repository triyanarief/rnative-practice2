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



var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = Math.floor(width * 0.65);
var BACK_ARROW_WIDTH = Math.floor(width * .065);
var BACK_ARROW_HEIGHT = Math.floor(width * .05);
var PHOTO_WIDTH = Math.floor(width * 0.25);
var PHOTO_HEIGHT = Math.floor(width * 0.25);
var EDIT_BG_WIDTH = Math.floor(width * .4);
var EDIT_BG_HEIGHT = Math.floor(width * .3);
var SIGNUP_BTN_WIDTH = Math.floor(width * .4);
var SIGNUP_BTN_HEIGHT = Math.floor(EDIT_BG_HEIGHT/3);
var INSTA_WIDTH = Math.floor(width * 0.075);
var INSTA_HEIGHT = Math.floor(width * 0.05);

var FAQScreen = React.createClass({

  back_button_pressed(){
    this.props.navigator.pop()
  },

  render(){
    return<View style={styles.container}>
    
    {/* start Header image */}
     <Image source={require('../images/ld_faq_header_bg.png')}  style={styles.containerSection1} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT}}>
     {/* start Header title */}
      <View style={styles.containerSection1_1}>

        <View style={styles.containerSection1_1_1}>
          <TouchableOpacity onPress={this.back_button_pressed}>
            <Image source={require('../images/lb_back_white.png')} style={{width:BACK_ARROW_WIDTH,height:BACK_ARROW_HEIGHT}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.containerSection1_1_2}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:22,fontWeight:'bold',color:'white'}}>
            FAQ
          </Text>
        </View>
        <View style={styles.containerSection1_1_3}>
        </View>
      </View>
      {/* End Header title */}
      {/* start contact section */}
      <View style={styles.containerSection1_2}>
      <View style={styles.containerSection1_2_1}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'white',marginBottom:10}}>
          Contact Us
          </Text>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'white',marginBottom:10}}>
          info@lubbdubb.io
          </Text>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'white',marginBottom:10}}>
          415-123-4567
            </Text>
      </View>
      {/* End contact section */}
        <View style={styles.containerSection1_2}>
          <TouchableOpacity>
          <Image source={require('../images/lb_instagram_icon.png')} style={{width:INSTA_WIDTH,height:INSTA_WIDTH}}/>
            </TouchableOpacity>

            <TouchableOpacity>
            <Image source={require('../images/lb_twiiter_icon.png')} style={{width:INSTA_WIDTH,height:INSTA_WIDTH}}/>
            </TouchableOpacity>

            <TouchableOpacity>
            <Image source={require('../images/lb_facebook_icon.png')} style={{width:INSTA_WIDTH,height:INSTA_WIDTH}}/>
            </TouchableOpacity>
            </View>
            </View>
        </Image>
        {/* End Header image */}

{/*dteails cost schedule*/}
    <View style={styles.containerSection2}>
    <View style={styles.containerSection2_1}>
    <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:14,fontWeight:'bold',color:'rgb(24,38,53)',marginTop:15}}> Questions </Text>
    </View>
  </View>


  <View style={styles.containerSection3}>

      <View style={styles.containerSection3_1}>

      <TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSection3_1}>

          <View style={styles.containerSection3_1_1}>
                <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'rgb(24,38,53)',marginBottom:10}}> How do I add a class? </Text>
              </View>

              <View style={styles.containerSection3_1_2}>
              <Image source={require('../images/lb_right_arrow.png')} style={{width:BACK_ARROW_WIDTH,height:BACK_ARROW_HEIGHT}}/>
                </View>
                  </TouchableOpacity>
            </View>
                    <View style={styles.containerSection3_2}>
                        <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:14,fontWeight:'bold',color:'rgb(213,213,213)',marginBottom:10}}> 2 Answers
                          </Text>
                    </View>


    </View>


        <View style={styles.containerSection4}>
        <View style={styles.containerSection4_1}>
<TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSection4_1}>
            <View style={styles.containerSection4_1_1}>

                <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'rgb(24,38,53)'}}>How do I sign up as a teacher? </Text>

              </View>
                <View style={styles.containerSection4_1_2}>

                  <Image source={require('../images/lb_right_arrow.png')} style={{width:BACK_ARROW_WIDTH,height:BACK_ARROW_HEIGHT}}/>

                  </View>
                  </TouchableOpacity>
      </View>

          <View style={styles.containerSection4_2}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:15,fontWeight:'bold',color:'rgb(213,213,213)',marginBottom:10}}>2 Answers </Text>

            </View>
    </View>

        <View style={styles.containerSection5}>


          </View>
    <View style={styles.containerSection6}>

    </View>


      <View style={styles.containerSection7}>

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
    //flexDirection:'row',
    flex:8,
    alignItems: 'stretch',
    justifyContent:'center',
    marginTop: 30,
    backgroundColor:'transparent',
  },

    containerSection1_1 : {
      flex:1,
      flexDirection:'row',
      alignItems: 'stretch',
      justifyContent:'center',
      backgroundColor: 'transparent',
    },
    containerSection1_1_1 : {//header back
      flex:3,
      alignItems: 'center',
      justifyContent:'center',
      //marginLeft: 18,
    },
    containerSection1_1_2 : {//header title FAQ
      flex:10,
      alignItems: 'center',
      justifyContent:'center',
    },
    containerSection1_1_3 : {//header right empty
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
    },

    containerSection1_2 : {//contact details
      flex:2,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor:'transparent',
    },
    containerSection1_2_1 : {//contact details first section
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor:'transparent',
    },

containerSection2:{
   flex:2,

  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor: 'rgb(255,255,255)',
  borderWidth: 1.0, borderColor:'rgb(213,213,213)',
},
containerSection2_1:{
  flex:1,
  alignItems:'stretch',
  justifyContent:'center',
  marginLeft: 40,
},

containerSection3:{
  flex:3,
  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor: 'rgb(255,255,255)',
  borderWidth: 0.5, borderColor:'rgb(213,213,213)',
},
containerSection3_1:{
  flex:2,
  flexDirection:'row',
  alignItems:'stretch',
  justifyContent:'space-around',


},

containerSection3_1_1:{
  flex:4,

  alignItems:'center',
  justifyContent:'center',
  marginTop:15,
  marginLeft: 25,

},
containerSection3_1_2:{
  flex:2,
  //flexDirection:'row',

  alignItems:'flex-end',
  justifyContent:'center',
  marginRight:50,
  marginTop: 15,
},
containerSection3_2:{
  flex:1,
  alignItems:'stretch',
  justifyContent:'center',
  marginLeft: 40,
   marginBottom: 20,
 },
containerSection4:{
  flex:3,
  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor: 'rgb(255,255,255)',
  borderWidth: 0.5, borderColor:'rgb(213,213,213)',


},
containerSection4_1:{
  flex:2,
  flexDirection:'row',
  alignItems:'stretch',
  justifyContent:'space-around',
},
containerSection4_1_1:{
  flex:6,

  alignItems:'center',
  justifyContent:'center',
  marginTop:15,
  marginLeft: 20,


},
containerSection4_1_2:{
  flex:1,
  //flexDirection:'row',

  alignItems:'flex-end',
  justifyContent:'center',
  marginRight:50,
  marginTop: 15,
},
containerSection4_2:{
  flex:1,
  alignItems:'stretch',
  justifyContent:'center',
  marginLeft: 40,
  marginBottom:10,
},
containerSection5:{
  flex:6,
  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor: 'rgb(228,238,239)',
  borderWidth: 0.5, borderColor:'rgb(215,183,213)',

},

containerSection6:{
  flex:2,
  flexDirection:'row',
  alignItems:'stretch',
  justifyContent:'center',
  backgroundColor: 'rgb(255,255,255)',
  borderWidth: 1.0, borderColor:'rgb(213,213,213)',

},


});

module.exports = FAQScreen;
