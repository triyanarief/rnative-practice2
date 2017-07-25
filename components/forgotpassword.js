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
  Alert,
} from 'react-native';

var Constant = require('./constants.js').default
import Spinner from 'react-native-loading-spinner-overlay';
const dismissKeyboard = require('dismissKeyboard')

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .07);
var BACK_ARROW_HEIGHT = Math.floor(width * .04);
var EDIT_BG_HEIGHT = Math.floor(width * .3);
var SUBMIT_BTN_WIDTH = Math.floor(width * .4);
var SUBMIT_BTN_HEIGHT = Math.floor(EDIT_BG_HEIGHT/3);

var ForgotPassword = React.createClass({

  getInitialState() {
      return {
        email: '',
        progress: 0,
        visible:false,
      };
  },

  back_button_pressed(){
    this.props.navigator.pop()
  },
  submit_button_pressed(){
    //this.state.email
    if (!this.state.email){
      Alert.alert("Forgot Password",'Please enter a valid Email')
    }else {
      this.setState({visible: true});
      this.callForgotPassword(this.state.email);

    }
  },
  showErrorResponse(response){
    Alert.alert(
       "Forgot Password",
       response,
       [
       {text: 'OK', onPress: () => {
         this.setState({visible: false});
       }},
       ],
       { cancelable: false }
       );

  },
  showAPIError(){
    Alert.alert(
       "Forgot Password",
       "Something went wrong in proccessing your request. Please try again later.",
       [
       {text: 'OK', onPress: () => {
         this.setState({visible: false});
       }},
       ],
       { cancelable: false }
       );
  },
  showSuccessResponse(response){
           this.setState({visible: false});
             this.props.navigator.push({name: 'forgotpasswordconfirm'})
  },


  render(){
    return<View style={styles.container}>

    {/*Loading bar*/}
        {this.state.visible && (
              <View>
                <Spinner visible={this.state.visible}>

                </Spinner>
              </View>
                  )}
        {/* Navigation bar*/}
        <View style={styles.containerSection1}>
            <View style={styles.containerSection1_1}>
              <TouchableOpacity onPress={this.back_button_pressed}>
              <View style={styles.containerSection1_1_1}>{/* Back session start*/}
                <Image
                  source={require('../images/ld_add_instructor_back_button.png')} style={{width:BACK_ARROW_WIDTH,height:BACK_ARROW_HEIGHT,marginBottom:2}}>
                </Image>
                <Text style={{marginBottom:0,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'rgb(0,172,192)'}}>Back</Text>
                </View>{/* Back session End*/}
              </TouchableOpacity>
          </View>
          <View style={styles.containerSection1_2}>{/* Login title start */}
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black',marginBottom:10}}>LOST PASSWORD</Text>
          </View>{/* Login title End */}
          <View style={styles.containerSection1_3}>{/* Empty session start*/}

          </View>{/* Empty session End*/}
        </View>
        {/* Title */}
        <View style={styles.containerSection2}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:17,fontWeight:'normal',color:'rgb(255,255,255)',textAlign: 'center'}}>
          Enter your email below{"\n"}and we will send you a new password{"\n"}to your email.
          </Text>
        </View>
        {/* Edit box*/}
        <View style={styles.containerSection4}>
          <View style={{backgroundColor: 'white', height:EDIT_BG_HEIGHT/2.5,marginLeft:25,marginRight:25,borderRadius:4}}>

          <TextInput
              style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:15,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
              underlineColorAndroid='transparent'
              placeholder="Email"
              maxLength = {40}
              keyboardType='email-address'
              returnKeyType='done'
              autoCapitalize="none"
                autoCorrect={false}
              onChangeText={(email) => this.setState({email})}
            />

          </View>

        </View>
        {/* Login Button*/}
        <View style={styles.containerSection5}>
        <TouchableOpacity onPress={this.submit_button_pressed}>
          <View style={{borderColor: 'white', borderWidth:0.5,height:SUBMIT_BTN_HEIGHT,marginLeft:25,marginRight:25,borderRadius:4,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white'}}>Submit</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.containerSection6}>
        </View>

    </View>
},
callForgotPassword(email){
    fetch(Constant.getForgotPasswordUrl() + email,
     {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseData) => {
        var error= responseData.errors;
        if(error == null){
          //Success Result
          var data= responseData.message;
          if(data != null){
          this.showSuccessResponse();
        }else {
          this.showAPIError();
        }

        } else {
          //Failure Result
        this.showErrorResponse(responseData.errors.full_messages);
        }

      })
      .done();
  }

  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',
    backgroundColor: 'rgb(0,172,192)',
  },
  containerSection1 : {//header
    flexDirection:'row',
    flex:1,
    alignItems: 'flex-end',
    justifyContent:'space-between',
    backgroundColor: 'rgb(255,255,255)',
  },
    containerSection1_1 : {//header back
      flex:1,
      alignItems: 'flex-start',
      justifyContent:'flex-end',
    },
      containerSection1_1_1 : {//header back
        flexDirection:'row',
        flex:1,
        alignItems: 'flex-end',
        justifyContent:'flex-start',
        marginLeft:10,
        marginBottom:10,
      },
    containerSection1_2 : {//header Login text
      flex:3,
      alignItems: 'center',
      justifyContent:'center',
    },
    containerSection1_3 : {//header empty
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
    },
  containerSection2 : {//Title
    flex:2,
    alignItems:'center',
    justifyContent:'center',
  },
  containerSection4 : {//TextFields
    flex:1,
    alignItems:'stretch',
    justifyContent:'flex-end',
  },
  containerSection5 : {//Forgot password Button
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection6 : {//Empty
    flex:6,
    alignItems:'center',
    justifyContent:'center',
      marginTop:10,
  },



});

module.exports = ForgotPassword;
