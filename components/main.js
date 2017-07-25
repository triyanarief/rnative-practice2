import React, { Component, PropTypes } from 'react';
import {
    Navigator,
    BackAndroid,
    AsyncStorage,
} from 'react-native';

var Constant = require('./constants.js').default;

import SignupOptions from './signup_options.js'
import ForgotPassword from './forgotpassword.js'
import ForgotPasswordConfirm from './forgotpassword_confirm.js'
import Login from './login.js'
import Signup from './signup.js'
import UserOptions from './user_options.js'
import GenericUserProfile from './generic_user_profile.js'
import FAQScreen from './faqscreen.js'
import AddInstructorStep1 from './addinstructor_step1.js'
import AddStudioStep1 from './addstudio_step1.js'
import ProfileWithAccount from './profilewithaccount.js'
import LandingScreen from './landingscreen.js'


const routes ={
  signupoptions: SignupOptions,
  forgotPassword: ForgotPassword,
  login: Login,
  signup: Signup,
  forgotpasswordconfirm: ForgotPasswordConfirm,
  useroptions: UserOptions,
  genericuserprofile: GenericUserProfile,
  faqscreen: FAQScreen,
  useroptions: UserOptions,
  addinstructorstep1: AddInstructorStep1,
  addstudiostep1: AddStudioStep1,
  profilewithaccount: ProfileWithAccount,
  landingscreen:LandingScreen,
}

var Main = React.createClass({

  componentDidMount(){
    this.getValueFromStorage();
  },


  getInitialState() {

      return {
        isLogedIn: "0",
        dataFetched:false,
        dataFetched1:false,
        userAccount:"0",

      };

  },
  getValueFromStorage(){
      AsyncStorage.getItem("USER_LOGGED_IN", (err, result) =>{
      this.setState({isLogedIn: result,dataFetched:true});

           });
     AsyncStorage.getItem("USER_ACCOUNT", (err, result) =>{
     this.setState({userAccount: result,dataFetched1:true});

          });
     },

    render(){

      /*return(
        <Navigator

            initialRoute={{name:'landingscreen'
              }}

            renderScene={this.renderScene}
        />
      )*/
     if (!this.state.dataFetched || !this.state.dataFetched1) {
        return null;
    } else {
      return(
        <Navigator

            initialRoute={{name:
              this.state.isLogedIn == 1 ? (this.state.userAccount == 0 ?'genericuserprofile':'profilewithaccount')
                :
                'signupoptions'
              }}

            renderScene={this.renderScene}
        />
      )
    }
    },
    renderScene(route,navigator){
      let Component = routes[route.name];

      //Android handle the BackButton action
      BackAndroid.addEventListener('hardwareBackPress', () => {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
              navigator.pop();
              return true;
          }
          return false;
        });
      return(
        <Component
            navigator={navigator}
        />
      )
    },


});

module.exports = Main;
