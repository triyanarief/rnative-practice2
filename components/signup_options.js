import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

var Constant = require('./constants.js').default;

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,AccessToken} = FBSDK;

var {width, height} = require('Dimensions').get('window');

var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var LOGO_WIDTH = Math.floor(width * .60);//456/2;
var LOGO_HEIGHT = Math.floor(width * .60);//467/2;
var FB_WIDTH = Math.floor(width * .075);//71/2;
var FB_HEIGHT = Math.floor(width * .075);//66/2;
var LINE_WIDTH = 2;
var LINE_HEIGHT = Math.floor(height * .075);
var EMAIL_WIDTH = Math.floor(width * .075);
var EMAIL_HEIGHT = Math.floor(width * .075);

var FB_UID = '';
var FB_EMAIL = '';
var FB_NAME = '';
var isSuccess = false;


function callFacebookLoginAPI()
{

};

var SignupOptions = React.createClass({

  getInitialState() {
      return {
        visible:false,
        provider: 'facebook', // Do not change
        email: '', // change with email get fb
        uid: '', // change with UId get fb
        fname:'',// change with fname get fb
        lname:'', // change with lname get fb
      };
  },
  showErrorResponse(response){
      Alert.alert(
         "Login Failed",
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
         "Login Failed",
         "Something went wrong in proccessing your request. Please try again later.",
         [
         {text: 'OK', onPress: () => {
           this.setState({visible: false});
         }},
         ],
         { cancelable: false }
         );
    },
    showSuccessResponse(){
      this.setState({visible: false})
        this.props.navigator.push({name: 'genericuserprofile'})
    },
    callSocialRegistrationAPI(uid,name,email){ // Call this method after FB callback success

            fetch(Constant.getSocialRegUrl(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
                  'Content-Type': 'application/json',
            },
            body:JSON.stringify({

             provider :this.state.provider,
             uid : uid,
             first_name: name,
             last_name: name,
             email: email,

           })
            }).then((response) => {

              response.json().then((responseData) => {
                var error= responseData.errors;
                if(error == null){
                  //Success Result
                  var data= responseData.data.uid;
                  if(data != null){
                      this.storeUserAccessDetails(response);

                  } else {

                    this.showAPIError();
                  }

                } else {

                    this.showErrorResponse(responseData.errors[0]);
                }
            });
          })
                .done();
          },

          storeUserAccessDetails(response){

              AsyncStorage.setItem(Constant.USER_LOGGED_IN, 1);

              var myArray = [response.headers.get('Access-Token'),response.headers.get('Client'),response.headers.get('Token-Type'),response.headers.get('Uid'),response.headers.get('Expiry')];
              AsyncStorage.setItem('MyToken', JSON.stringify(myArray),() => {

              this.showSuccessResponse();
          });


        },



  fb_button_pressed(){



//this.props.navigator.push({name: 'fblogin'})
var that = this;

LoginManager.logInWithReadPermissions(['public_profile','email','basic_info']).then(

  function(result) {
    //this.props.navigator.push({name: 'login'})
    if (result.isCancelled) {
      //alert('Login cancelled');

    } else {

  AccessToken.getCurrentAccessToken().then(
          (data) => {
            that.setState({visible: true})
            accesstoken = data.accessToken
            alert(accesstoken.toString())
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accesstoken)
            .then((response) => response.json())
            .then((json) => {
              //alert(json.id+'-'+json.name+'-'+json.email);
              that.callSocialRegistrationAPI(json.id,json.name,json.email);
              FB_UID = json.id;
              FB_EMAIL = json.email;
              FB_NAME = json.name;

              //callFacebookLoginAPI();
              //isSuccess = true;
              //alert(json.id+'-'+json.name+'-'+json.email);
            })
            .catch(() => {

              //reject('ERROR GETTING DATA FROM FACEBOOK')
              //that.visible = false;
              alert("Error in facebook communication");
            })
          }
        )

    }
  },
  function(error) {
    //that.visible = false;
    alert('Login fail with error: ' + error);
  }
);
  },


  email_button_pressed(){
    this.props.navigator.push({name: 'signup'})
  },
  already_user_button_pressed(){
    this.props.navigator.push({name: 'login'})
  },

  render(){
    return<View style={styles.container}>
    <StatusBar hidden={true} />

    <Image
      source={require('../images/orangebg.png')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT}}>

      {/* Section 1 Header logo Start */}
      <View style={styles.containerSection1}>
      {this.state.visible && (
                  <View>
                  <Spinner visible={this.state.visible}>

                  </Spinner>
                  </View>
                  )}

        <Image
          source={require('../images/idlogo.png')} style={{width:LOGO_WIDTH,height:LOGO_HEIGHT}}>
        </Image>
      </View>
      {/* Header logo End */}
      {/* Section 2  start */}
      <View style={styles.containerSection2}>
          {/* Head text  start */}
        <View style={styles.containerSection2_1}>
             <Text style={{fontFamily: 'FFAD Matro',fontSize:32,fontWeight:'bold',color:'white'}}> SIGN UP WITH</Text>
        </View>
        {/* Head text end */}
        {/* Button section start */}
        <View style={styles.containerSection2_2}>
          <View style={styles.containerSection2_2_1}>
           <TouchableOpacity onPress={this.fb_button_pressed}>
              <Image
                source={require('../images/ld_login_fb_icon.png')} style={{width:FB_WIDTH,height:FB_WIDTH}}>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.containerSection2_2_2}>
              <Image
                source={require('../images/ld_login_divider.png')} style={{width:LINE_WIDTH,height:LINE_HEIGHT}}>
                </Image>
           </View>
           <View style={styles.containerSection2_2_3}>
            <TouchableOpacity onPress={this.email_button_pressed}>
              <Image
                source={require('../images/ld_login_mail_icon.png')} style={{width:EMAIL_WIDTH,height:EMAIL_HEIGHT}}>
              </Image>
            </TouchableOpacity>
            </View>
        </View>
        {/* Button section End */}
        {/* Registration section start */}
        <View style={styles.containerSection2_3}>
          <TouchableOpacity onPress={this.already_user_button_pressed}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'white'}}>ALREADY HAVE AN ACCOUNT?</Text>
          </TouchableOpacity>
        </View>
        {/* Registration section End */}
      </View>
      {/* Section 2  End */}
      </Image>
    </View>
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
containerSection1: { //logo section - total 2/1
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-end',
  },
  containerSection2: {  //button section - total 2/1
      flex: 1,
  },
  containerSection2_1: {//signup title
      flex: 1,
      alignItems: 'center',
      justifyContent:'flex-end',
   },
   containerSection2_2: { //button section
      flexDirection:'row',
      flex: 1,
      alignItems: 'center',
      justifyContent:'space-around',
    },
    containerSection2_2_1: { //button1 section
       flex: 1,
       alignItems: 'flex-end',
       justifyContent:'center',
     },
     containerSection2_2_2: { //button2 section
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    containerSection2_2_3: { //button3 section
       flex: 1,
       alignItems: 'flex-start',
       justifyContent:'center',
     },
    containerSection2_3: {//ALREADY account section
      flex: 2,
      alignItems:'center',
      justifyContent:'center',
    },
});
module.exports = SignupOptions;
