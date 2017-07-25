import React from 'react';

import {
  AppRegistry,
} from 'react-native';

import Main from './components/main.js'
AppRegistry.registerComponent('LubbDubb', () => Main);
//import AddInstructorStep1 from './components/faqscreen.js'
//AppRegistry.registerComponent('LubbDubb', () => AddInstructorStep1);


/* Image picker referene */
//https://github.com/marcshilling/react-native-image-picker
//1. npm install react-native-image-picker@latest --save
//2. react-native link
//3. For iOS 10+, Add the NSPhotoLibraryUsageDescription, NSCameraUsageDescription, and NSMicrophoneUsageDescription (if allowing video) keys to your Info.plist with strings describing why your app needs these permissions
//4. For Android,Add the required permissions in AndroidManifest.xml:
//<uses-permission android:name="android.permission.CAMERA" />
//<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

/*  activity indicator  */
//https://www.npmjs.com/package/react-native-loading-spinner-overlay
//1. npm install --save react-native-loading-spinner-overlay@latest
//2. import Spinner from 'react-native-loading-spinner-overlay';

/* dismissKeyboard */
//https://www.npmjs.com/package/react-native-dismiss-keyboard
// npm install react-native-dismiss-keyboard --save
//import dismissKeyboard from 'react-native-dismiss-keyboard';
//dismissKeyboard()


/* Facebook Login (not using, but ..good)*/
//http://brentvatne.ca/facebook-login-with-react-native/

/* facebook retrieve user information */
//npm install --save react-native-fbsdkcore
/*var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
} = FBSDKCore;
*/

/* Facebok using */
//https://github.com/magus/react-native-facebook-login
/*
<key>LSApplicationQueriesSchemes</key>
<array>
        <string>fbapi</string>
        <string>fb-messenger-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
</array>
*/
