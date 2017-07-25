import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';

var ImagePicker = require('react-native-image-picker');
var Constant = require('./constants.js').default
import Spinner from 'react-native-loading-spinner-overlay';
import Prompt from 'react-native-prompt';

var {width, height} = require('Dimensions').get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;
var BACK_ARROW_WIDTH = Math.floor(width * .05);
var BACK_ARROW_HEIGHT = Math.floor(width * .05);
var PHOTO_WIDTH = Math.floor(width * .2);
var PHOTO_HEIGHT = Math.floor(width * .2);
var STAR_ICON_WIDTH = Math.floor(width * .03);
var STAR_ICON_HEIGHT = Math.floor(width * .03);
var PROFILE_ICON_WIDTH = Math.floor(width * .07);
var PROFILE_ICON_HEIGHT = Math.floor(width * .07);
var EDIT_BG_HEIGHT  = Math.floor(height * .17);
var CREATE_BUTTON_HEIGHT  = Math.floor(width * .1);

var index= 0;
var AddInstructorStep1 = React.createClass({

  getInitialState() {
      return {
        avatarSource: null,
        teachername: '',
        file:'',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        bio: '',
        fblink:'',
        twitterlink:'',
        visible:false,
        ACCESS_TOKEN:'',
        TOKEN_TYPE:'',
        UID:'',
        CLIENT:'',
        EXPIRY:'',
        certificationArray: [],
        certificationPromptVisible: false,
        socialPromptVisible: false,
        selectedSocialMedia:1 //1 - Fb , 2- twitter
      };
  },

  componentDidMount(){
      this.getValueFromStorage();
  },

  back_button_pressed(){
    this.props.navigator.pop()
  },
  studio_button_pressed(){

  },

  addinstructor_button_pressed(){
    if (!this.state.teachername){
          Alert.alert("Instructor",'Please enter Teacher Name')
    }else if (!this.state.city){
          Alert.alert("Instructor",'Please enter City')
    }
    else if (!this.state.phone){
          Alert.alert("Instructor",'Please enter Teacher\'s Phone Number')
    }else if (!this.state.email){
          Alert.alert("Instructor",'Please enter Teacher\'s Email')
    }
    else if (this.state.certificationArray.length == 0){
          Alert.alert("Instructor",'Please enter Teacher\'s Certification details')
    }
    else {
     this.setState({visible: true});
     this.createInstructorApiCall();
    }


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
  showErrorResponse(response){
    Alert.alert(
       "Instructor creation Failed",
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
       "Instructor creation Failed",
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
         "Success",
         "Instructors created successfully",
         [
         {text: 'OK', onPress: () => {
           this.setState({visible: false});


            this.props.navigator.replace({name: 'profilewithaccount'})
         }},
         ],
         { cancelable: false }
         );
  },

    pressAddCertButton() {
        this.setState({ certificationPromptVisible: true })
      },
    addCertToView(certification) {
          this.setState({certificationPromptVisible: false})
          this.state.certificationArray.push(certification)
          this.setState({
            certificationArray: this.state.certificationArray
          })
      },
    removeCertFromView(position) {
        var array = this.state.certificationArray;
        this.state.certificationArray.splice(position, 1);
        this.setState({certificationArray: this.state.certificationArray });

      },

  render(){

    let Arr = this.state.certificationArray.map((a, i) => {
      return  <TouchableOpacity key={i} onPress={() =>this.removeCertFromView(i)}>
        <View  style={{backgroundColor: 'rgb(0,178,192)',borderColor:'transparent', borderWidth:0.5,marginTop:10,marginBottom:10,marginRight:5,borderRadius:4,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'white',paddingLeft:10,paddingRight:10, paddingTop:5,paddingBottom:5,}}>{a+'  x'}</Text>
        </View>
     </TouchableOpacity>
   })
    return<View style={styles.container}>

    {/* Loading bar*/}
        {this.state.visible && (
            <View>
              <Spinner visible={this.state.visible}>

              </Spinner>
            </View>
                )}
        {/*Navigation bar*/}
        <View style={styles.containerSection1}>
            <View style={styles.containerSection1_1}>
              <TouchableOpacity onPress={this.back_button_pressed}>
              <View style={styles.containerSection1_1_1}>{/* Back session start*/}
                <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'rgb(0,172,192)'}}>Close</Text>
                </View>{/* Back session End*/}
              </TouchableOpacity>
          </View>
          <View style={styles.containerSection1_2}>{/* Login title start */}
            <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'black',marginBottom:10}}>
            Create An Account
            </Text>
          </View>{/* Login title End */}
          <View style={styles.containerSection1_3}>{/* Empty session start*/}

          </View>{/* Empty session End*/}
        </View>

        {/* Photo session Start*/}
        <View style={styles.containerSection2}>
          <TouchableOpacity onPress={this.photo_button_pressed}>
            <View>
            { this.state.avatarSource === null ? <Image
                source={require('../images/ld_add_instructor_add-portfolio_image-1.png')} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT}}/> :
               <Image source={this.state.avatarSource} style={{width:PHOTO_WIDTH,height:PHOTO_HEIGHT,borderRadius:38,borderWidth:2,borderColor:'rgb(255,108,25)'}} />
            }
            </View>
          </TouchableOpacity>
        </View>
        {/* Photo session End*/}
        {/* Teachername session Start*/}

          <View style={styles.containerSection2_1}>
          <ScrollView >
        <View style={styles.containerSection3}>
          <View style={styles.containerSection3_1}>
            <Image source={require('../images/ld_add_location_star.png')} style={{width:STAR_ICON_WIDTH,height:STAR_ICON_HEIGHT}}/>
          </View>
          <View style={styles.containerSection3_2}>

            <TextInput
                underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="Teacher Name"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='default'
                returnKeyType='next'
                onChangeText={(teachername) => this.setState({teachername})}
              />
          </View>
          <View style={styles.containerSection3_3}>
            <Image source={require('../images/ld_add_location_street_address_icon.png')} style={{width:PROFILE_ICON_WIDTH,height:PROFILE_ICON_HEIGHT}}/>
          </View>

        </View>
        {/* Teachername session End*/}
        {/* city state session Start*/}
        <View style={styles.containerSection4}>
          <View style={styles.containerSection4_1}>
            <Image source={require('../images/ld_add_location_star.png')} style={{width:STAR_ICON_WIDTH,height:STAR_ICON_HEIGHT}}/>
          </View>
          <View style={styles.containerSection4_2}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="City"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='default'
                returnKeyType='next'
                onChangeText={(city) => this.setState({city})}
              />
          </View>
          <View style={styles.containerSection4_3}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="State"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='default'
                returnKeyType='next'
                onChangeText={(state) => this.setState({state})}
              />
          </View>
          <View style={styles.containerSection4_4}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="Zip"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='phone-pad'
                returnKeyType='next'
                onChangeText={(zip) => this.setState({zip})}
              />
          </View>
        </View>
        {/* city state session End*/}
        {/* phone session Start*/}
        <View style={styles.containerSection5}>
          <View style={styles.containerSection5_1}>
            <Image source={require('../images/ld_add_location_star.png')} style={{width:STAR_ICON_WIDTH,height:STAR_ICON_HEIGHT}}/>
          </View>
          <View style={styles.containerSection5_2}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="Phone Number"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='phone-pad'
                returnKeyType='next'
                onChangeText={(phone) => this.setState({phone})}
              />
          </View>

        </View>
        {/* phone session End*/}
        {/* email session Start*/}
        <View style={styles.containerSection6}>
          <View style={styles.containerSection5_1}>
            <Image source={require('../images/ld_add_location_star.png')} style={{width:STAR_ICON_WIDTH,height:STAR_ICON_HEIGHT}}/>
          </View>
          <View style={styles.containerSection5_2}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="Email"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {40}
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={(email) => this.setState({email})}
              />
          </View>
        </View>
        {/* email session End*/}
        {/* bio session Start*/}
        <View style={styles.containerSection7}>
          <View style={styles.containerSection5_1}>
          {/*Empty view for left margin*/}
          </View>
          <View style={styles.containerSection5_2}>
            <TextInput
              underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
                placeholder="Add Bio"
                placeholderTextColor ='rgb(191,191,191)'
                maxLength = {500}
                keyboardType='default'
                returnKeyType='done'
                onChangeText={(bio) => this.setState({bio})}
              />
            </View>
        </View>
        {/* bio session End*/}
        {/* certification session Start*/}
          <View style={styles.containerSection8}>
            <View style={styles.containerSection8_1}>
                  <View style={styles.containerSection5_1}>
                    <Image source={require('../images/ld_add_location_star.png')} style={{width:STAR_ICON_WIDTH,height:STAR_ICON_HEIGHT,marginTop:10,}}/>
                  </View>
                  <View style={styles.containerSection8_1_1}>
                    <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'rgb(80,80,80)'}}>Certifications  </Text>
                    <Image source={require('../images/ld_add_location_question.png')} style={{width:PROFILE_ICON_WIDTH/1.5,height:PROFILE_ICON_HEIGHT/1.5}}/>
                  </View>
            </View>

            <View style={styles.containerSection8_2}>
            <View style={styles.containerSection5_1}>
              {/*Empty view for left margin*/}
            </View>
            <View style={styles.containerSection8_3}>

            <ScrollView horizontal={true}>

                 { Arr }
                 <TouchableOpacity onPress={this.pressAddCertButton}>
                   <View style={{borderColor: 'black',marginTop:10,marginBottom:10, borderWidth:0.5,borderRadius:4,alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'bold',color:'rgb(0,178,192)',paddingLeft:10,paddingBottom:5,paddingTop:5,paddingRight:10}}>Add</Text>
                   </View>
                 </TouchableOpacity>

              </ScrollView>

            </View>
              </View>

        </View>
        {/* certification session End*/}
        {/* social session Start*/}
        <View style={styles.containerSection9}>
                    <View style={styles.containerSection9_3}>
                      {/*Empty view for left margin*/}
                    </View>
                  <View style={styles.containerSection9_1}>
                          <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:18,fontWeight:'normal',color:'rgb(80,80,80)'}}>Social</Text>
                    </View>
                        <View style={styles.containerSection9_2}>
                          <TouchableOpacity onPress={()=> this.showSocialPopup(2)}>
                            { this.state.twitterlink == '' ?
                              <Image source={require('../images/ld_add_location_twitter_icon_deactive.png')} style={{width:PROFILE_ICON_WIDTH+10,height:PROFILE_ICON_HEIGHT+10}}/> :
                              <Image source={require('../images/ld_add_location_twitter_icon_active.png')} style={{width:PROFILE_ICON_WIDTH+10,height:PROFILE_ICON_HEIGHT+10}}/>
                            }

                          </TouchableOpacity>
                        </View>
                          <View style={styles.containerSection9_2}>
                            <TouchableOpacity onPress={()=> this.showSocialPopup(1)}>
                                { this.state.fblink == '' ?
                                  <Image source={require('../images/ld_add_location_fb_icon_deactive.png')} style={{width:PROFILE_ICON_WIDTH+10,height:PROFILE_ICON_HEIGHT+10}}/> :
                                  <Image source={require('../images/ld_add_location_fb_icon_active.png')} style={{width:PROFILE_ICON_WIDTH+10,height:PROFILE_ICON_HEIGHT+10}}/>
                                }
                              </TouchableOpacity>
                            </View>
                        <View style={styles.containerSection9_3}>
                          {/*Empty view for left margin*/}
                        </View>
                  </View>

        {/* social session End*/}
        {/* Create button  session Start*/}
        <View style={styles.containerSection10}>
        <TouchableOpacity onPress={this.addinstructor_button_pressed}>
            <View style={{height:EDIT_BG_HEIGHT/2.5,marginLeft:10,marginRight:10,backgroundColor:'rgb(255,108,25)',borderRadius:6,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily: 'HelveticaNeue-Light',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>
              Add Instructor
              </Text>
            </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
        {/* Create button session End*/}

        {/*Prompt for add certification*/}
        <Prompt
          title="Add Certification"
          placeholder="Enter here"
          submitText  = "Add"
          cancelText = "Cancel"
          visible={this.state.certificationPromptVisible}
          onCancel={() => this.setState({ certificationPromptVisible: false})}
          onSubmit={(value) => this.addCertToView(value)}/>

          {/*Prompt for add social link*/}
          <Prompt
            title= {this.state.selectedSocialMedia == 1 ?"Facebok Link" :"Twitter Link"}
            placeholder="Enter here"
            defaultValue={this.state.selectedSocialMedia == 1 ?this.state.fblink :this.state.twitterlink}
            submitText  = "Add"
            cancelText = "Cancel"
            visible={this.state.socialPromptVisible}
            onCancel={() => this.setState({ socialPromptVisible: false})}
            onSubmit={(value) => this.saveSocialLink(value)}/>

    </View>

},

  showSocialPopup(socialMedia) {
      this.state.selectedSocialMedia = socialMedia
      this.setState({socialPromptVisible: true})
      },
  saveSocialLink(value) {
      this.setState({socialPromptVisible: false})
        if(this.state.selectedSocialMedia ==1){
          this.state.fblink = value
        } else {
          this.state.twitterlink = value
        }

    },

createInstructorApiCall(){

        fetch(Constant.getCreateInstructorUrl(),
      {
       method: 'POST',
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'access-token':  this.state.ACCESS_TOKEN,
         'token-type':  this.state.TOKEN_TYPE,
         'client':  this.state.CLIENT,
         'expiry': this.state.EXPIRY,
         'uid': this.state.UID,
       },
       /*    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'access-token':  'Vtzgd92QfYCYPDDhfz-G7g',
         'token-type':  'Bearer',
         'client':  'XR-njdlknlL7gfWw2BDlkw',
         'expiry': '1803537637',
         'uid': '123@mailinator.com',
       },*/
       body: JSON.stringify({
         instructor:{
           first_name: this.state.teachername,
           last_name: '',
           address: '',
           city: this.state.city,
           state: this.state.state,
           zipcode: this.state.zip,
           phone: this.state.phone,
           email: this.state.email,
           bio: this.state.bio,
           image_data :this.state.file,
           image_content_type : 'image/jpg',
           fb_link: this.state.fblink,
           twitter_link: this.state.twitterlink,
           certification_lists:this.state.certificationArray,
         }


   })
        }).then((response) => response.json())
            .then((responseData) => {
              this.setState({visible: false});
              var error= responseData.errors;
              if(error == null){

                    this.showSuccessResponse(responseData.message);

              } else {
                //Failure Result
                this.showErrorResponse(responseData.errors.full_messages);
              }

            })
            .done();
      },

      getValueFromStorage(){

         AsyncStorage.getItem('MyToken', (err, result) =>{
                var temp = JSON.parse(result);
                this.state.ACCESS_TOKEN=temp[0]
                this.state.CLIENT=temp[1],
                this.state.TOKEN_TYPE=temp[2],
                this.state.UID=temp[3],
                this.state.EXPIRY=temp[4]
                });

     },



  });

var styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'stretch',
      backgroundColor: 'rgb(228,238,239)',

  },
  containerSection1 : {//header
    flexDirection:'row',
    flex:10,//in percentage
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

  containerSection2 : {//photo
    flex:15,//in percentage
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgb(228,238,239)',
  },
  containerSection2_1 : {//Scrolview
    flex:75, //in percentage
    alignItems:'stretch',
    justifyContent:'space-between',

  },
  containerSection3 : {//teacherName
    flexDirection:'row',
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
      containerSection3_1 : {//*
        flex:2,
        alignItems:'center',
        justifyContent:'center',
      },
      containerSection3_2 : {// teacherName
        flex:19,
        alignItems:'stretch',
        justifyContent:'center',
      },
      containerSection3_3 : {// profile icon
        flex:4,
        alignItems:'center',
        justifyContent:'center',
      },

  containerSection4 : {//city,state,zip
    flexDirection:'row',
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
    containerSection4_1 : {//*
      flex:2,
      alignItems:'center',
      justifyContent:'center',
    },
    containerSection4_2 : {// city
      flex:10,
      alignItems:'stretch',
      justifyContent:'center',
    },
    containerSection4_3 : {// state
      flex:6,
      alignItems:'stretch',
      justifyContent:'center',
      borderWidth:0.5,
      borderColor:'rgb(228,238,239)',
    },
    containerSection4_4 : {// zip
      flex:7,
      alignItems:'stretch',
      justifyContent:'center',
    },

  containerSection5 : {//phone
    flexDirection:'row',
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
    containerSection5_1 : {//*
      flex:2,
      alignItems:'center',
      justifyContent:'center',
    },
    containerSection5_2 : {// teacherName
      flex:23,
      alignItems:'stretch',
      justifyContent:'center',
    },

  containerSection6 : {//email 6
    flexDirection:'row',
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
  containerSection7 : {//bio
    flexDirection:'row',
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    marginTop:10,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
  containerSection8 : {//cert
    flex:2,
    alignItems:'stretch',
    justifyContent:'flex-start',
    borderWidth:1,
    marginTop:10,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },
  containerSection8_1 : {//cert
    flexDirection:'row',
    flex:2,
    alignItems:'stretch',
    justifyContent:'center',


  },
  containerSection8_1_1 : {// certification with qusitinmark
    flex:23,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:10,
  },
  containerSection8_2 : {//Add certficati
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'center',

  },
  containerSection8_3 : {//certfication list
    flexDirection:'row',
    flex:23,
    alignItems:'flex-start',
    justifyContent:'center',

  },

  containerSection9 : {//social button
    flexDirection:'row',
    flex:2,
    alignItems:'stretch',
    justifyContent:'center',
    borderWidth:1,
    marginTop:10,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
    height: EDIT_BG_HEIGHT/2,
  },
  containerSection9_1 : {//Social text

    flex:10,
    alignItems:'stretch',
    justifyContent:'center',

  },
  containerSection9_2 : {//Social icon
    flex:2,
    alignItems:'stretch',
    justifyContent:'center',

  },
  containerSection9_3 : {//Empty text

    flex:1,
    alignItems:'stretch',
    justifyContent:'center',

  },

  containerSection10 : {//create button
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    padding:10,
    marginTop:10,
    borderColor:'rgb(228,238,239)',
    backgroundColor:'rgb(255,255,255)',
  },

  TextInputStyle : {//Text input style
  height: EDIT_BG_HEIGHT/2,
  marginLeft:0,
  marginRight:2,
  marginTop:5,
  fontFamily: 'HelveticaNeue-Light',
  fontSize:18,
  fontWeight:'bold',
  color:'rgb(20,20,20)'
  },

});

module.exports = AddInstructorStep1;
