import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity,TouchableHighlight, KeyboardAvoidingView, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, Container, Item, Input, Label, Picker, Textarea, Right, Title, Form } from 'native-base';
import { TextInput } from 'react-native-paper';
//import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
//import AsyncStorage from '@react-native-community/async-storage';

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
    paddingHorizontal: SIZES.PADDING * 2,
    paddingVertical: SIZES.PADDING * 2,
    backgroundColor: '#fff'
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
  formControl: {
    paddingLeft: 20,
    fontSize: 14

  }

})

export default class SignUP extends Component {

constructor(props)
{
  super(props);
  this.state={
    email:'',
    password:''
  }
}

signupuser=()=>
{
  alert(this.state.email+' '+this.state.password) 
  if(this.state.email && this.state.password)
    {
      try{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
        alert('Your Account Has Been Created Successfully');
        this.props.navigation.navigate('Login');
        return;
      }
      catch(error){
        alert(error);
      }
     
    }
    alert('Email or Password is empty');
}

loginuser=(email,password)=>
{
    
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
          <View style={{ marginBottom: 18, alignItems: 'center', marginBottom: 20 }}>
            <Title style={{ color: '#333', fontWeight: 'bold', fontSize: 25 }}>Register</Title>
            <Text style={styles.subtitle}>Please sign up to get full access</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{}}>

              <Form>
                <Item rounded style={{ marginBottom: 15 }}>
                  <Input style={styles.formControl} placeholder='First Name' placeholderTextColor="#AFAFAF" />
                </Item>
                <Item rounded style={{ marginBottom: 15 }}>
                  <Input style={styles.formControl} placeholder='Last Name' placeholderTextColor="#AFAFAF" />
                </Item>
                <Item rounded style={{ marginBottom: 15 }}>
                  <Input style={styles.formControl} placeholder='Email Address' placeholderTextColor="#AFAFAF" 
                  
                  onChangeText={(email)=>this.setState({email})}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 15 }}>
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
                style={{ marginTop: 5, backgroundColor: 'green' }}
                onPress={()=>{this.signupuser()}}
              >
                <Text style={{ color: '#fdfdfd' }}>SIGN UP</Text>
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
                Already have an account?
            </Text>
              {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Title style={{ color: 'green', opacity: 0.7, fontSize: 16, fontWeight: '700' }}>Login</Title>
              </TouchableOpacity> */}
              <TouchableHighlight  onPress={() => this.props.navigation.navigate('Login')}
                activeOpacity={0.6}
                underlayColor="#fff"
                testOnly_pressed={'no'}
               >
               <Title style={{ color: 'green', opacity: 0.7, fontSize: 16, fontWeight: '700' }}>Login</Title>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}