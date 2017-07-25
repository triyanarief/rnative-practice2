import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import dismissKeyboard from 'react-native-dismiss-keyboard';


//import ResponsiveKeyboardView from 'react-native-responsive-keyboard-view';

//var ResponsiveKeyboardView = require('react-native-responsive-keyboard-view');




var Constant = require('./constants.js').default

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .07);
var BACK_ARROW_HEIGHT = Math.floor(width * .04);
var LOGO_WIDTH = Math.floor(width * .4);
var LOGO_HEIGHT = Math.floor(width * .4);
var EDIT_BG_WIDTH = Math.floor(width * .4);
var EDIT_BG_HEIGHT = Math.floor(width * .3);
var LOGIN_BTN_WIDTH = Math.floor(width * .4);
var LOGIN_BTN_HEIGHT = Math.floor(EDIT_BG_HEIGHT/3);

var Login = React.createClass({
  getInitialState() {
      return {
        //email: '',
        //password: '',
        //email: 'lakshmanan@smaatapps.com',
        //password: 'c52uMHmH',
        email: '',
        password: '',
        visible:false,
        behavior: 'padding',
        modalOpen: false,
      };
  },
  back_button_pressed(){
    this.props.navigator.pop()
  },
  login_button_pressed(){
    if (!this.state.email){
          Alert.alert("Login",'Please enter a Email')
    }else if (!this.state.password){
          Alert.alert("Signup",'Please enter a valid Password')
    }
    else {
      this.setState({visible: true});
      this.loginApiCall(this.state.email,this.state.password);
    }
  },
  forgot_password_button_pressed(){
    this.props.navigator.push({name: 'forgotPassword'})
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
  showSuccessResponse(response){


  },

  handleKeyDown: function(e) {
      if(e.nativeEvent.key == "Enter"){
      //    dismissKeyboard();

      }
  },

  render(){
    return<View style={styles.container}>

   <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>

        {/* Navigation bar*/}
        <View style={styles.containerSection1}>
                {this.state.visible && (
                            <View>
                            <Spinner visible={this.state.visible}>

                            </Spinner>
                            </View>
                            )}
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
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black',marginBottom:10}}>LOGIN</Text>
          </View>{/* Login title End */}
          <View style={styles.containerSection1_3}>{/* Empty session start*/}

          </View>{/* Empty session End*/}
        </View>
        {/* Title */}
        <View style={styles.containerSection2}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:17,fontWeight:'normal',color:'rgb(255,255,255)',textAlign: 'center'}}>
          Welcome to LubbDubb. Earn fitness{"\n"}credit as more people join class. Let’s get{"\n"}fit together for less!
          </Text>
        </View>
        {/* logo */}
        <View style={styles.containerSection3}>
          <Image
            source={require('../images/logoCircle.png')} style={{width:LOGO_WIDTH,height:LOGO_HEIGHT}}>
          </Image>
        </View>
        {/* Edit box*/}
        <View style={styles.containerSection4}>
          <View style={{backgroundColor: 'white', height:EDIT_BG_HEIGHT,marginLeft:25,marginRight:25,borderRadius:4,flex:1,alignItems:'stretch',justifyContent:'center'}}>
            <View style={styles.containerSection4_1}>

            <TextInput
                style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:15,marginTop:10,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                underlineColorAndroid='transparent'
                ref='emailInput'
                placeholder="Email"
                maxLength = {40}
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
                onKeyPress={this.handleKeyDown}
                onSubmitEditing={(event) => { this.refs.passwordInput.focus(); }}
              />

            </View>
            <View style={styles.containerSection4_2}>
              <View style={{backgroundColor: 'rgb(236,236,237)', height:1,marginLeft:1,marginRight:1}}>
              </View>
            </View>
            <View style={styles.containerSection4_3}>
            <TextInput
                ref='passwordInput'
                style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:15,marginBottom:10,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                underlineColorAndroid='transparent'
                placeholder="Password"
                maxLength = {40}
                keyboardType='default'
                returnKeyType='done'
                secureTextEntry= {true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
              />
            </View>
          </View>
        </View>
        {/* Login Button*/}
        <View style={styles.containerSection5}>
        <TouchableOpacity onPress={this.login_button_pressed}>
          <View style={{borderColor: 'white', borderWidth:0.5,height:LOGIN_BTN_HEIGHT,marginLeft:25,marginRight:25,borderRadius:4,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white'}}>Login</Text>
          </View>
        </TouchableOpacity>
        </View>
        {/* Forgot password */}
        <View style={styles.containerSection6}>
        <TouchableOpacity onPress={this.forgot_password_button_pressed}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'white',textDecorationLine: 'underline'}}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>

</KeyboardAvoidingView>

    </View>
},

/*  API calls */
loginApiCall(username,password){
      fetch(Constant.getLoginUrl(),
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: username,
        password: password
      })
    })
    .then((response) => {

      response.json().then((responseData) => {
        var error= responseData.errors;
        if(error == null){
          //Success Result
          var data= responseData.data;
          if(data != null){
              this.storeUserAccessDetails(response);
              this.getProfileApiCall(response);

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

getProfileApiCall(response){
    fetch(Constant.getProfileUrl(),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-token':  response.headers.get('Access-Token'),
        'token-type':  response.headers.get('Token-Type'),
        'client':  response.headers.get('Client'),
        'expiry': response.headers.get('Expiry'),
        'uid': response.headers.get('Uid'),
      },

      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({visible: false});
        var error= responseData.errors;
        if(error == null){

            var insArray = responseData.user.instructors;
            var studioArray = responseData.user.studios;
            if(insArray.length==0 && studioArray.length==0){

              AsyncStorage.setItem("USER_ACCOUNT", "0");
              this.props.navigator.replace({name: 'genericuserprofile'});

            } else {
                AsyncStorage.setItem("USER_ACCOUNT", "1");
                this.props.navigator.replace({name: 'profilewithaccount'});

            }
            this.showSuccessResponse();

        } else {
          //Failure Result
            this.setState({visible: false});
            Constant.showAlert('Failure',responseData.errors.full_messages);

        }

      })
      .done();

  },

  storeUserAccessDetails(response){

      AsyncStorage.setItem("USER_LOGGED_IN", "1");

      var myArray = [response.headers.get('Access-Token'),response.headers.get('Client'),response.headers.get('Token-Type'),response.headers.get('Uid'),response.headers.get('Expiry')];
      AsyncStorage.setItem('MyToken', JSON.stringify(myArray),() => {


  });
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
        marginLeft:5,
        marginBottom:10,
      },
    containerSection1_2 : {//header Login text
      flex:1,
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
  containerSection3 : {//Logo
    flex:4,
    alignItems:'center',
    justifyContent:'center',
  },
  containerSection4 : {//TextFields
    flex:2,
    alignItems:'stretch',
    justifyContent:'flex-end',
  },
  containerSection4_1 : {//first row text field/Email
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_2 : {//middle row text field (line)
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_3 : {//third row text field/Password
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection5 : {//Login Button
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    marginTop:10,
  },
  containerSection6 : {//ForgotPassword Button
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },



});

module.exports = Login;
