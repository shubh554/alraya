import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity,TouchableHighlight, KeyboardAvoidingView, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, Container, Item, Input, Label, Picker, Textarea, Right, Title, Form } from 'native-base';
import { TextInput } from 'react-native-paper';
//import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { AsyncStorage } from 'react-native';  
import Expo from 'expo'; 


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgViVTOvFYM_tsL-I8eSNUZB508ySBIYk",
  authDomain: "alrayastore-8d98b.firebaseapp.com",
  databaseURL: "https://alrayastore-8d98b.firebaseio.com",
  projectId: "alrayastore-8d98b",
  storageBucket: "alrayastore-8d98b.appspot.com",
  messagingSenderId: "225562632199",
  appId: "1:225562632199:web:e63932dc9b8077a2b8caa2",
  measurementId: "G-QYTJCETYRV"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//import AsyncStorage from '@react-native-community/async-storage';
const COLORS = {
  WHITE: '#FFF',
  BLACK: '#000',
  BLUE: '#69B1D6',
  ORANGE: '#FE8E4E',
  RED: '#FD696E',
  GREY: '#AFAFAF',
  DARK_GREY: '#90919E',
  GOOGLE: '#DC4E41',
  FACEBOOK: '#3A5896',
};

const SIZES = {
  BASE: 6,
  FONT: 12,
  TITLE: 24,
  SUBTITLE: 15,
  LABEL: 12,
  PADDING: 12,
};
const styles = StyleSheet.create({
  wrapper: {},

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  headline: {
    textAlign: 'center', // <-- the magic

    marginTop: 0,
    // width: 400,
    justifyContent: 'center',
    alignItems: 'center',



  },
  button: {
    alignItems: 'center',
    borderRadius: SIZES.BASE,
    justifyContent: 'center',
    padding: SIZES.PADDING / 0.83,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING *2,
    paddingVertical: SIZES.PADDING * 2,
    backgroundColor:'#fff'
  },
  divider: {
    alignItems: 'center',
    backgroundColor: COLORS.GREY,
    height: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginVertical: SIZES.PADDING * 2,
    width: '50%',
  },
  dividerLabel: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.GREY,
    fontSize: SIZES.SUBTITLE,
    paddingHorizontal: SIZES.BASE,
    position: 'absolute',
  },
 
  input: {
    borderColor: COLORS.GREY,
    borderRadius: SIZES.BASE,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: SIZES.FONT,
    padding: SIZES.PADDING * 1.5,
  },
  inputContainer: {
    marginBottom: SIZES.PADDING,
  },
  label: {
    color: COLORS.DARK_GREY,
    fontSize: SIZES.FONT,
    marginBottom: SIZES.BASE,
  },
  signin: {
    paddingVertical: SIZES.PADDING * 1.33,
  },
  
  subtitle: {
    color: COLORS.GREY,
    fontSize: SIZES.SUBTITLE,
  },
  title: {
    fontSize: SIZES.TITLE,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: SIZES.BASE,
  },
  formControl:{
    paddingLeft:20,
    fontSize:14
    
  }

})

export default class Login extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      email:'',
      password:''
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user != null)
      {
        console.log(user);
      }
    })
  }
   onSignIn=(googleUser)=> {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(user){console.log(user)}).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  }

  isUserEqual=(googleUser, firebaseUser)=> {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  signInWithGoogleAsync= async()=> {
  
    try {
      const result = await Google.logInAsync({
        behaviour:'web',
        androidClientId: '225562632199-ejucvfhk2mr790uje89eo4hf01h45ga2.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
       
      if (result.type === 'success') {
        alert(JSON.stringify("Welcome "+result.user.name));
        let userDetails = {name:result.user.name,email:result.user.email}
        await AsyncStorage.setItem('userDetails',JSON.stringify(userDetails));
        this.props.navigation.navigate({
          routeName:'Home',
          params: { id: 'i' }
          
        })
       
      } else {
        alert('Login Failed');
      }
    } catch (e) {
      alert('Login Failed');
    }
  }

 loginUser=async()=>{
    try{
     firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
     .then(function(user){
      alert(JSON.stringify("Logged In !!"));
      let userDetails = {name:'email',email:user.user.email}
       AsyncStorage.setItem('userDetails',JSON.stringify(userDetails));
      this.nav();
      
     })
    }
    catch(error)
    {
      alert('Credentials are Wrong');
    }
 };

 nav(){
   this.props.navigation.navigate('home');
 }
  
 async loginUserFacebook(){
   //ENTER YOUR APP ID 
   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('232531548157881', { permissions: ['public_profile'] });

   if (type == 'success') {

     const credential = firebase.auth.FacebookAuthProvider.credential(token)

     firebase.auth().signInWithCredential(credential).catch((error) => {
       alert(error);
     })
   }
 }
 
 
 
 render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ alignSelf: 'center', marginTop: 50 }} >
            <Image
              source={require('../../assets/images/logo.png')}
              resizeMode="center"
              style={{ maxHeight: 300, maxWidth: 400 }}
            />
          </View>
          <View style={{ marginBottom: 18, alignItems: 'center',marginBottom:20 }}>
            <Title style={{color:'#333',fontWeight:'bold',fontSize:25}}>SIGN IN</Title>
            <Text style={styles.subtitle}>Please sign in to get full access</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{}}>

              <Form>
                <Item rounded style={{marginBottom:15}}>
                  <Input style={styles.formControl} placeholder='Email Address' placeholderTextColor="#AFAFAF"
                   onChangeText={(email)=>this.setState({email})}
               
                  />
                </Item>
                <Item rounded style={{marginBottom:15}}>
                  <Input style={styles.formControl} placeholder='Password' placeholderTextColor="#AFAFAF"
                   onChangeText={(password)=>this.setState({password})}
                   secureTextEntry={true}
                  />
                </Item>
              </Form>

              <Button rounded block 
                mode=""
                uppercase={false}
                // onPress={()=>Actions.jump('profile')}
                //onPress={() => this.login()}
                style={{marginTop:5,backgroundColor:'green'}}
                onPress={this.loginUser}
              >
                <Text style={{ color: '#fdfdfd' }}>SIGN IN</Text>
              </Button>

              <Button rounded block 
                mode=""
                uppercase={false}
                // onPress={()=>Actions.jump('profile')}
                //onPress={() => this.login()}
                style={{marginTop:5,backgroundColor:'#db3236'}}
                onPress={this.signInWithGoogleAsync}
              >
                <Text style={{ color: '#fdfdfd' }}>LOGIN/SIGNIN WITH GOOGLE</Text>
              </Button>


              {/* {this.renderInputs()} */}
              <View style={{ alignItems: 'center' }}>
                <View style={styles.divider}>
                  <Text style={styles.dividerLabel}>or</Text>
                </View>
              </View>
              {/* {this.renderSocials()} */}
            </View>
            <View style={{ flex: 0.25, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.GREY,
                  marginBottom: SIZES.BASE,
                }}>
                Don't have an account?
            </Text>
              {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('Signup')}>
                <Title style={{color:'green',opacity:0.7,fontSize:16,fontWeight:'700'}}>Create Account</Title>
              </TouchableOpacity> */}
               <TouchableHighlight  onPress={() => this.props.navigation.navigate('Signup')}
                activeOpacity={0.6}
                underlayColor="#fff"
                testOnly_pressed={'no'}
               >
               <Title style={{ color: 'green', opacity: 0.7, fontSize: 16, fontWeight: '700' }}>Create Account</Title>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}