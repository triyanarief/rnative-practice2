
//User credential
let ACCESS_TOKEN= 'ACCESS_TOKEN';
let TOKEN_TYPE= 'TOKEN_TYPE';
let CLIENT= 'CLIENT';
let EXPIRY= 'EXPIRY';
let UID= 'UID';

//Api end points.
let API_BASE_URL= 'http://lbdb.herokuapp.com/api/';
let LOGIN_API='auth/sign_in';
let EMAIL_REG_API= 'auth';
let FORGOT_PASS_API= 'users/forgot_password?email=';
let INSTRUCTOR_CREATE_API= 'instructors';
let STUDIO_CREATE_API= 'studios';
let LOGOUT_API= 'auth/sign_out';
let GET_PRODFILE= 'users/profile';
let SOCIAL_REGISTRATION= 'users/social';

//App constants
let USER_LOGGED_IN= 'USER_LOGGED_IN';
let EDITPROFILEVALUE= [];
let ISINSTRUCTOREDIT=0;

//import Instructor from './Instructor'
//var Instructor = require('./Instructor').default

import {
    AsyncStorage,
    Alert,
} from 'react-native';

class Constant{
    static getLoginUrl() {

          return API_BASE_URL+LOGIN_API;;
      }
    static getEmailRegUrl() {

        return API_BASE_URL+EMAIL_REG_API;
      }
      static getSocialRegUrl() {
              return API_BASE_URL+SOCIAL_REGISTRATION;
      }
    static getForgotPasswordUrl() {

          return API_BASE_URL+FORGOT_PASS_API;
      }
      static getCreateInstructorUrl() {

            return API_BASE_URL+INSTRUCTOR_CREATE_API;
        }
    static getCreateStudioUrl() {

        return API_BASE_URL+STUDIO_CREATE_API;
    }
    static getLogoutUrl() {

        return API_BASE_URL+LOGOUT_API;
    }
    static getProfileUrl() {

        return API_BASE_URL+GET_PRODFILE;
    }


    static showAlert(status, message){
      Alert.alert(
         status,
         message,
         [
         {text: 'OK', onPress: () => {
          // Instructor.alertOkCallback();
         }},
         ],
         { cancelable: false }
         );
    }

    static setEditValue(value) {

        EDITPROFILEVALUE = value;
    }
    static getEditValue() {

        return EDITPROFILEVALUE;
    }

    static setIsInstructorEdit(value) {

        ISINSTRUCTOREDIT = value;
    }
    static getIsInstructorEdit() {

        return ISINSTRUCTOREDIT;
    }




}

export default Constant;
