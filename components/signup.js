import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';


var ImagePicker = require('react-native-image-picker');

var Constant = require('./constants.js').default
import LoadingBar from './loading_bar.js'
import Spinner from 'react-native-loading-spinner-overlay';

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .05);
var BACK_ARROW_HEIGHT = Math.floor(width * .05);
var PHOTO_WIDTH = Math.floor(width * .4);
var PHOTO_HEIGHT = Math.floor(width * .4);
var EDIT_BG_WIDTH = Math.floor(width * .4);
var EDIT_BG_HEIGHT = Math.floor(width * .25);
var SIGNUP_BTN_WIDTH = Math.floor(width * .4);
var SIGNUP_BTN_HEIGHT = Math.floor(EDIT_BG_HEIGHT/3);

var SignUp = React.createClass({

  getInitialState() {
      return {
        avatarSource: null,
        //email: 'lakshman@mailinator.com',
        //fname: 'lak',
        //lname: 'manan',
        //password: '12345678',
        email: '',
        fname: '',
        lname: '',
        password: '',
        visible:false,
        behavior: 'padding',
      };
  },
  back_button_pressed(){
    this.props.navigator.pop()
  },
  signup_button_pressed(){
    if (!this.state.fname){
          Alert.alert("Signup",'Please enter a valid First name')
    }else if (!this.state.lname){
          Alert.alert("Signup",'Please enter a valid Last name')
    }else if (!this.state.email){
          Alert.alert("Signup",'Please enter a valid Email')
    }else if (!this.state.password){
          Alert.alert("Signup",'Please enter a valid Password')
    }
    else {

      this.setState({visible: true});
      this.callEmailRegistrationAPI()
    }

  },

  showErrorResponse(response){
    Alert.alert(
       "Signup Failed",
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
       "Signup Failed",
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
      Alert.alert(
         "Signup Successfull",
         "We have sent you a confirmation email to your email id.Please verify your email and login.",
         [
         {text: 'OK', onPress: () => {
           this.setState({visible: false});
           this.props.navigator.popToTop();
         }},
         ],
         { cancelable: false }
         );
  },


  photo_button_pressed(){

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          file: response.data ,
        });
      }
    });

  },



  render(){
    return<View style={styles.container}>
    <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>

  {/* Loading bar*/}
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
                <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'normal',color:'rgb(0,172,192)'}}>Close</Text>
                </View>{/* Back session End*/}
              </TouchableOpacity>
          </View>
          <View style={styles.containerSection1_2}>{/* Login title start */}
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black',marginBottom:10}}>SIGNUP</Text>
          </View>{/* Login title End */}
          <View style={styles.containerSection1_3}>{/* Empty session start*/}

          </View>{/* Empty session End*/}
        </View>

        {/* Photo */}
        <View style={styles.containerSection3}>
        <TouchableOpacity onPress={this.photo_button_pressed}>
        <View>
        { this.state.avatarSource === null ? <Image
            source={require('../images/ld_signup_image_mask-with-text-orange.png')} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT}}/> :
            <View style={styles.containerSection7}>
                        <Image source={this.state.avatarSource} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT}} >
                        <Image source={require('../images/ld_signup_image_mask-with-bg.png')} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT}}/>
                        </Image>
            </View>        }
        </View>
          </TouchableOpacity>
        </View>
        {/* Edit box*/}
        <View style={styles.containerSection4}>
          <View style={{backgroundColor: 'white', height:EDIT_BG_HEIGHT,marginLeft:25,marginRight:25,borderRadius:4,flex:1,alignItems:'stretch',justifyContent:'center'}}>
            <View style={styles.containerSection4_1}>
              <View style={styles.containerSection4_1_1}>
                <TextInput
                    style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:5,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                    ref='firstnameInput'
                    underlineColorAndroid='transparent'
                    placeholder="First Name"
                    maxLength = {40}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(fname) => this.setState({fname})}
                    onSubmitEditing={(event) => { this.refs.lastnameInput.focus(); }}
                  />
              </View>
              <View style={styles.containerSection4_1_2}>
              <View style={{backgroundColor: 'rgb(236,236,237)', width:1,height:EDIT_BG_HEIGHT/3}}></View>
              </View>
              <View style={styles.containerSection4_1_3}>
                <TextInput
                    style={{height: EDIT_BG_HEIGHT/2,marginLeft:-15,marginRight:15,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                    ref='lastnameInput'
                    underlineColorAndroid='transparent'
                    placeholder="Last Name"
                    maxLength = {40}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(lname) => this.setState({lname})}
                    onSubmitEditing={(event) => { this.refs.emailInput.focus(); }}
                  />
              </View>
            </View>
            <View style={styles.containerSection4_2}>
              <View style={{backgroundColor: 'rgb(236,236,237)', height:1,marginLeft:1,marginRight:1}}>
              </View>
            </View>
            <View style={styles.containerSection4_3}>
            <TextInput
                style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:15,backgroundColor:'white',fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                ref='emailInput'
                underlineColorAndroid='transparent'
                placeholder="Email"
                maxLength = {40}
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={(event) => { this.refs.passwordInput.focus(); }}
              />
            </View>
            <View style={styles.containerSection4_4}>
              <View style={{backgroundColor: 'rgb(236,236,237)', height:1,marginLeft:1,marginRight:1}}>
              </View>
            </View>
            <View style={styles.containerSection4_5}>
            <TextInput
                style={{height: EDIT_BG_HEIGHT/2,marginLeft:15,marginRight:15,fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black'}}
                ref='passwordInput'
                underlineColorAndroid='transparent'
                placeholder="Password"
                maxLength = {40}
                keyboardType='default'
                returnKeyType='done'
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry= {true}
                onChangeText={(password) => this.setState({password})}
              />
            </View>
          </View>
        </View>
        {/* Signup Button*/}
        <View style={styles.containerSection5}>
        <TouchableOpacity onPress={this.signup_button_pressed}>
          <View style={{borderColor: 'white', borderWidth:0.5,height:SIGNUP_BTN_HEIGHT,marginLeft:25,marginRight:25,borderRadius:4,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white'}}>Signup</Text>
          </View>
        </TouchableOpacity>
        </View>
        {/* Empty section*/}
        <View style={styles.containerSection6}>

        </View>
   </KeyboardAvoidingView>
    </View>
  },
  callEmailRegistrationAPI(){

          fetch(Constant.getEmailRegUrl(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
                'Content-Type': 'application/json',
          },
          body:JSON.stringify({
          email: this.state.email,
           password: this.state.password,
           first_name: this.state.fname,
           last_name: this.state.lname,
           avatar_data :this.state.file,
           avatar_content_type : 'image/jpg',
           //avatar: '',
         })
          }).then((response) => response.json())
              .then((responseData) => {
                var error= responseData.errors;
                if(error == null){
                  //Success Result
                  var data = responseData.data;
                  //alert(JSON.stringify(responseData.data));
                    if(responseData.data.uid != null)
                    {
                      this.showSuccessResponse();
                    }
                    else {
                      this.showAPIError();
                    }
                } else {
                  //Failure Result
                  this.showErrorResponse(responseData.errors.full_messages[0]);
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
    flex:6,
    alignItems:'center',
    justifyContent:'center',
  },
  containerSection4 : {//TextFields
    flex:3,
    alignItems:'stretch',
    justifyContent:'flex-end',
  },
  containerSection4_1 : {//first row text field
    flexDirection:'row',
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_1_1 : {//first name
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_1_2 : {//vertical line
    flex:1,
    alignItems:'flex-start',
    justifyContent:'center',
  },
  containerSection4_1_3 : {//lastname
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_2 : {//middle row text field (line)
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_3 : {//third row text field/Email
    flex:4,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_4 : {//middle row text field (line)
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSection4_5 : {//third row text field/password
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
  containerSection7 : {

      alignItems:'stretch',
      justifyContent:'center',

    },


});

module.exports = SignUp;
