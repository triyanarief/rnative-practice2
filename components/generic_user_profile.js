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
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginManager} = FBSDK;
var Constant = require('./constants.js').default
var ImagePicker = require('react-native-image-picker');
import Spinner from 'react-native-loading-spinner-overlay';

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .05);
var BACK_ARROW_HEIGHT = Math.floor(width * .05);
var PHOTO_WIDTH = Math.floor(width);
var PHOTO_HEIGHT = Math.floor(height * .75);
var ICON_WIDTH = Math.floor(width * .08);
var ICON_HEIGHT = Math.floor(width * .08);
var PROFILE_PHOTO_WIDTH = Math.floor(width*.42);
var PROFILE_PHOTO_HEIGHT = Math.floor(height*.25);
var INVITE_BTN_HEIGHT = Math.floor(height*0.05);
var INVITE_BTN_WIDTH = Math.floor(width*0.45);

var ADDCLASS_BTN_WIDTH = Math.floor(width*0.33);

var FOOTER_MENU_SIZE = Math.floor(width*0.05);

var ADDCLASS_BG_WIDTH = Math.floor(width);
var ADDCLASS_BG_HEIGHT = Math.floor(height*0.15);

var ADDCLASS_BTN_WIDTH = Math.floor(width*0.5);
var ADDCLASS_BTN_HEIGHT = Math.floor(height*0.05);

var PROFILE_ICON_WIDTH = Math.floor(width*0.075);
var PROFILE_ICON_HEIGHT = Math.floor(width*0.075);

var GenericUserProfile = React.createClass({

  getInitialState() {

      return {

        avatarSource: null,
        name:'Name',
        wallet:'5',
        visible:false,
        ACCESS_TOKEN:'',
        TOKEN_TYPE:'',
        UID:'',
        CLIENT:'',
        EXPIRY:'',

      };

  },


componentDidMount(){
    this.getValueFromStorage();
},

  componentDidUpdate(){

  },

  back_button_pressed(){
  //  this.props.navigator.pop()

  },


  logout_button_pressed(){

    Alert.alert(
       "",
       "Do you really want to logout?",
       [
       {text: 'Yes', onPress: () => {
         this.setState({visible: true});
        this.logoutApiCall();
       }},
       {text: 'No', onPress: () => {

       }},
       ],
       { cancelable: false }
       );

  },
  faq_button_pressed(){
    //this.props.navigator.push({name: 'faqscreen'})
  },
  invite_button_pressed(){

  },
  addclass_button_pressed(){

  //  this.setState({visible: true});
  this.props.navigator.push({name: 'useroptions'})
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
      {/* Profile photo section */}
    <View style={styles.containerSectionProfilePhoto}>
        <View style={styles.containerSectionProfilePhoto_photo}>
        <View>
        { this.state.avatarSource === null ? <Image
            source={require('../images/ld_profile_placeholder_image.png')} style={{width:PROFILE_PHOTO_WIDTH,height:PROFILE_PHOTO_HEIGHT}}/> :
           <Image source={{uri:this.state.avatarSource}} style={{width:PROFILE_PHOTO_WIDTH,height:PROFILE_PHOTO_HEIGHT}} />
        }
        </View>

        </View>

        <View style={styles.containerSectionProfilePhoto_userInfo}>
          <View style={styles.containerUserinfo}>
          <View style={styles.containerUserinfoText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white',textAlign:'left'}}>
            {this.state.name}
            </Text>
          </View>
          <View style={styles.containerUserinfoText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:14,fontWeight:'normal',color:'white',textAlign:'left',}}>
            FITNESS WALLET
            </Text>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'bold',color:'white',textAlign:'left',}}>
            ${this.state.wallet}
            </Text>
          </View>
          <View style={styles.containerUserinfoText}>
          <TouchableOpacity onPress={this.invite_button_pressed}>
            <View style={{borderColor: 'white', borderWidth:1,width:INVITE_BTN_WIDTH,height:INVITE_BTN_HEIGHT,borderRadius:4,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            <Image
              source={require('../images/ld_profile_add_user_icon_full.png')} style={{width:PROFILE_ICON_WIDTH,height:PROFILE_ICON_HEIGHT}}>
            </Image>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white'}}>Invite Friends</Text>
            </View>
          </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>

    {/* Menu option section*/}
    <View style={styles.containerSectionMenuOption}>
      <TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSectionMenuItem}>

          <View style={styles.containerSectionMenuItemText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
            Find Classes
            </Text>
          </View>
          <View style={styles.containerSectionMenuItemIcon}>
            <Image
              source={require('../images/ld_profile_arrow.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
          </View>
      </TouchableOpacity>
      <View style={{backgroundColor:'rgb(213,213,213)',height:1,marginLeft:Math.floor(width*0.09),marginRight:Math.floor(width*0.09)}}>
      </View>
      <TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSectionMenuItem}>

          <View style={styles.containerSectionMenuItemText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
            Share for Credits
            </Text>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:14,fontWeight:'normal',color:'rgb(146,146,146)',textAlign:'left'}}>
            You{''}r earned $200 by sharing
            </Text>
          </View>
          <View style={styles.containerSectionMenuItemIcon}>
            <Image
              source={require('../images/ld_profile_share.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
          </View>
      </TouchableOpacity>
      <View style={{backgroundColor:'rgb(213,213,213)',height:1,marginLeft:Math.floor(width*0.09),marginRight:Math.floor(width*0.09)}}>
      </View>
      <TouchableOpacity onPress={this.instructor_button_pressed} style={styles.containerSectionMenuItem}>

          <View style={styles.containerSectionMenuItemText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
            Credit Card
            </Text>
          </View>
          <View style={styles.containerSectionMenuItemIcon}>
            <Image
              source={require('../images/ld_profile_card.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
          </View>
      </TouchableOpacity>
      <View style={{backgroundColor:'rgb(213,213,213)',height:1,marginLeft:Math.floor(width*0.09),marginRight:Math.floor(width*0.09)}}>
      </View>
      <TouchableOpacity onPress={this.faq_button_pressed} style={styles.containerSectionMenuItem}>

          <View style={styles.containerSectionMenuItemText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
            FAQ
            </Text>
          </View>
          <View style={styles.containerSectionMenuItemIcon}>
            <Image
              source={require('../images/ld_profile_arrow.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
          </View>
      </TouchableOpacity>
      <View style={{backgroundColor:'rgb(213,213,213)',height:1,marginLeft:Math.floor(width*0.09),marginRight:Math.floor(width*0.09)}}>
      </View>
      <TouchableOpacity onPress={this.logout_button_pressed} style={styles.containerSectionMenuItem}>

          <View style={styles.containerSectionMenuItemText}>
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'black',textAlign:'left'}}>
            Logout
            </Text>
          </View>
          <View style={styles.containerSectionMenuItemIcon}>
            <Image
              source={require('../images/ld_profile_lock.png')} style={{width:ICON_WIDTH,height:ICON_HEIGHT}}/>
          </View>
      </TouchableOpacity>

    </View>
    {/* Add class section */}
    <View style={styles.containerSectionAddClass}>
   <Image source={require('../images/ld_add_class_bg.png')} style={{width:ADDCLASS_BG_WIDTH,height:ADDCLASS_BG_HEIGHT}}>


          <View style={styles.containerSectionAddClassTop}>
          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'normal',color:'white',textAlign:'center',backgroundColor:'transparent'}}>
            Are you a fitness professional?
            </Text>
          </View>
          <View style={styles.containerSectionAddClassBottom}>
        <TouchableOpacity onPress={this.addclass_button_pressed}  style={{marginLeft:40}}>
            <View style={{borderColor: 'white', borderWidth:0.5,borderRadius:4,alignItems:'center',justifyContent:'center',width:ADDCLASS_BTN_WIDTH,height:ADDCLASS_BTN_HEIGHT}}>
              <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white',backgroundColor:'transparent'}}>
                      Add a Class
            </Text>
            </View>
          </TouchableOpacity>
          </View>

      </Image>
</View>
    {/* Add class section */}
    <View style={styles.containerSectionFooter}>

        {/*  <View style={styles.containerSectionFooterDivider}> */}

                <TouchableOpacity onPress={this.classes_button_pressed}>

                    <View style={styles.containerSectionFooterIcon}>
                      <Image
                        source={require('../images/ld_profile_bb_classes_grey.png')} style={{width:FOOTER_MENU_SIZE,height:FOOTER_MENU_SIZE}}/>

                      <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'normal',color:'black',textAlign:'center'}}>
                      Classes
                      </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={this.classes_button_pressed}>

                    <View style={styles.containerSectionFooterIcon}>
                      <Image
                        source={require('../images/ld_profile_bb_myclasses_grey.png')} style={{width:FOOTER_MENU_SIZE,height:FOOTER_MENU_SIZE}}/>

                      <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'normal',color:'black',textAlign:'center'}}>
                      My Classes
                      </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={this.classes_button_pressed}>

                    <View style={styles.containerSectionFooterIcon}>
                      <Image
                        source={require('../images/ld_profile_bb_profile_orange.png')} style={{width:FOOTER_MENU_SIZE,height:FOOTER_MENU_SIZE}}/>

                      <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:16,fontWeight:'normal',color:'black',textAlign:'center'}}>
                      Profiles
                      </Text>
                    </View>

                </TouchableOpacity>
            {/* </View> */}
    </View>
    </View>


},
  getValueFromStorage(){

     AsyncStorage.getItem('MyToken', (err, result) =>{
            var temp = JSON.parse(result);
            this.state.ACCESS_TOKEN=temp[0]
            this.state.CLIENT=temp[1],
            this.state.TOKEN_TYPE=temp[2],
            this.state.UID=temp[3],
            this.state.EXPIRY=temp[4],
            this.state.visible= true,
            this.getProfileApiCall();
            });

 },
  getProfileApiCall(){
      fetch(Constant.getProfileUrl(),
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-token':  this.state.ACCESS_TOKEN,
          'token-type':  this.state.TOKEN_TYPE,
          'client':  this.state.CLIENT,
          'expiry': this.state.EXPIRY,
          'uid': this.state.UID,
        },
        })
          .then((response) => response.json())
          .then((responseData) => {

          var error= responseData.errors;
          if(error == null){
            //Success Result
              this.state.name = responseData.user.name;
              this.state.wallet = responseData.user.wallet;

              //Compare to check is that default URL without actual image
                if((responseData.user.avatar_url.toUpperCase()) != (("/images/original/missing.png").toUpperCase())){
                  this.state.avatarSource = responseData.user.avatar_url;

                }

              this.setState({visible: false});
          } else {
            //Failure Result
              this.setState({visible: false});
              Constant.showAlert('Failure',responseData.errors.full_messages);

          }

        })
        .done();

    },
    logoutApiCall(){
      fetch(Constant.getLogoutUrl(),
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-token':  this.state.ACCESS_TOKEN,
          'token-type':  this.state.TOKEN_TYPE,
          'client':  this.state.CLIENT,
          'expiry': this.state.EXPIRY,
          'uid': this.state.UID,
        },

    })
      .then((response) => response.json())
      .then((responseData) => {

           this.setState({visible: false});
          var error= responseData.errors;
         AsyncStorage.setItem("USER_LOGGED_IN", "0");
          if(this.props.navigator.getCurrentRoutes().length ==1){
            this.props.navigator.replace({name: 'signupoptions'})
          } else {
            this.props.navigator.popToTop();
          }

        })
        .done();

    },

  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',

  },


  containerUserinfo : {

    flex:3,
    alignItems:'stretch',
    justifyContent:'center',

  },
  containerUserinfoText : {//text
    flex:1,
    alignItems:'flex-start',
    justifyContent:'center',
    marginLeft :Math.floor(width*0.09), // 9 % left margin
  },
  containerSectionMenuItem : {//Each menu item height of 10 %
    flexDirection:'row',
    flex:10,
    alignItems:'stretch',
    justifyContent:'center',
    backgroundColor: 'rgb(255,255,255)',
    //borderWidth:0.5,
    //borderColor:'gray',

  },
  containerSectionMenuItemIcon : {//Icon
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  },
  containerSectionMenuItemText : {//text
    flex:5,
    alignItems:'flex-start',
    justifyContent:'center',
    marginLeft :Math.floor(width*0.09), // 9 % left margin
  },


  containerSectionProfilePhoto : {//Profile photo section height: 25 %
    flex:25,
    alignItems:'stretch',
    justifyContent:'center',
    flexDirection:'row'
  },
  containerSectionProfilePhoto_photo : {//Photo Width :42 %
    flex:42,
    alignItems:'center',
    justifyContent:'center',

  },
  containerSectionProfilePhoto_userInfo : {//User info width 68%,
    flex:68,
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor:'rgb(0,178,192)'
  },

  containerSectionMenuOption : {// Add class height: 53 %
    flex:51,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSectionAddClass : {// Add class height: 13 %
    flex:15,
    alignItems:'stretch',
    justifyContent:'center',

  },
  containerSectionAddClassTop : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',

  },
  containerSectionAddClassBottom : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  containerSectionFooter : {//Footer height: 9%
    flexDirection:'row',
    flex:9,
    alignItems:'stretch',
    justifyContent:'space-around',
  },
  containerSectionFooterDivider : {//diver for footer item (NOT USING)
    flexDirection:'row',
    flex:9,
    alignItems:'stretch',
    justifyContent:'center',
  },
  containerSectionFooterItem : {//Indivitual footer item
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',

  },
  containerSectionFooterIcon : {//Icon
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },


});

module.exports = GenericUserProfile;
