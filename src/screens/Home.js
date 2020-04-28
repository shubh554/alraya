import React, { Component } from 'react'
import { Text, View, TouchableOpacity,TouchableHighlight, Image, TextInput, StyleSheet, Dimensions, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button,Thumbnail } from 'native-base';
import SliderEntry from '../components/SliderEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import { scrollInterpolators, animatedStyles } from '../utils/animations';
import { red } from 'ansi-colors';
import { count } from 'rxjs/operator/count';
import * as firebase from 'firebase';
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
const { width, height } = Dimensions.get('window')
import { AsyncStorage } from 'react-native'; 
import {BackHandler} from "react-native";
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

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      categories:'',
      banners:'',
      fProducts:'',
      loginButton: <Button bordered success
      mode=""
      uppercase={false}
      onPress={() => this.props.navigation.navigate('Login')}
      //onPress={() => this.login()}
      style={{ marginHorizontal: 10, paddingHorizontal: 45, marginTop: 15,borderRadius:50 }}
    >
      <Text style={{ color: '#222' }}>Login/Register</Text>
    </Button>
    };
    this.mainCrousal = this.mainCrousal.bind(this);
    
    this.checkLogin()
  }

 

  componentDidMount(){
   
    this.checkLogin()
    fetch('http://skyviewads.com/projects/PosCi/api/v1/category?level=2', {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
      
      this.setState({categories:json1});
      
    });

    fetch('http://skyviewads.com/projects/PosCi/api/v1/banner', {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
      
     //alert(JSON.stringify(json1))
     this.setState({banners:json1});
    });

    fetch('http://skyviewads.com/projects/PosCi/api/v1/products?featured=1', {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
      
     //alert(JSON.stringify(json1))
     this.setState({fProducts:json1.data});
    });


  }

 async logout()
 {
  try {
    await AsyncStorage.removeItem('userDetails');
    this.setState({loginButton:<Button bordered success
      mode=""
      uppercase={false}
      onPress={() => this.props.navigation.navigate('Login')}
      //onPress={() => this.login()}
      style={{ marginHorizontal: 10, paddingHorizontal: 45, marginTop: 15,borderRadius:50 }}
    >
      <Text style={{ color: '#222' }}>Login/Register</Text>
    </Button>});
    
}
catch(exception) {
    alert('Operation Failed');
}
 }
   addTOCart()
   {
    // alert('hi');
   }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

async checkLogin()
{
  
  await AsyncStorage.getItem('userDetails').then((token) => {
    if(token)
    {
    this.setState({
      loginButton:  <Button bordered success
      mode=""
      uppercase={false}
      onPress={() => this.logout()}
      //onPress={() => this.login()}
      style={{ marginHorizontal: 10, paddingHorizontal: 45, marginTop: 15,borderRadius:50 }}
    >
      <Text style={{ color: '#222' }}>Logout</Text>
    </Button>
    });
  }
  
  });
}
getCategories()
{
  if(this.state.categories){
  
   let categories = <View><View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>

    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Grocery',
      params:{
        id:this.state.categories[0].id,
        name:this.state.categories[0].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[0].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[0].name}</Text>

       </View>
     </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Shop',
      params:{
        id:this.state.categories[1].id,
        name:this.state.categories[1].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[1].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[1].name}</Text>

       </View>
     </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Shop',
      params:{
        id:this.state.categories[2].id,
        name:this.state.categories[2].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[2].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[2].name}</Text>

       </View>
     </View>
    </TouchableOpacity>
    
   </View>
    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>

    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Shop',
      params:{
        id:this.state.categories[3].id,
        name:this.state.categories[3].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[3].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[3].name}</Text>

       </View>
     </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Shop',
      params:{
        id:this.state.categories[4].id,
        name:this.state.categories[4].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[4].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[4].name}</Text>

       </View>
     </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.props.navigation.navigate({
      routeName:'Shop',
      params:{
        id:this.state.categories[5].id,
        name:this.state.categories[5].name
      }
    })}>
    <View>
       <Image  
         source={{
          uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+this.state.categories[5].image,
        }}
         style={{ width: width / 3.35, height: width / 3.35, }}
       />
       <View style={{ backgroundColor: 'rgba(0,128,0,0.5)',borderRadius:10, height: width / 3.35, paddingVertical: 8, position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff',fontWeight:'700' }}>{this.state.categories[5].name}</Text>

       </View>
     </View>
    </TouchableOpacity>
    
   </View>
   </View>
   ;
  
    
  
  
  return(  <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 17, fontFamily: 'AvenirNextLTPro-Bold', fontWeight: '700' }}>Shop By Categories</Text>
    {categories}
 </View>);}
  else{
    return(
      <View>
          <Image
          style={{height:300,width:'100%'}}
          source={require('../styles/32.gif')}
        />
      </View>
    );
  }
}

   featuredProducts()
  {
     if(this.state.fProducts){
       let fProducts = '';
      this.state.fProducts.map((item)=>{
        fProducts=[...fProducts,<View style={{ borderRadius:10,marginRight: 10, width: width / 2.2, height: width / 1.40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderColor: '#f4f4f4', borderWidth: 1 }}>
        <TouchableOpacity
         onPress={() => this.props.navigation.navigate({
          routeName:'Checkout',
          params:{
            id:item.code,
            name:item.name
          }
        })}>
        <Image  source={{
          uri: item.image_url
        }}
          style={{ width: width / 3.9, height: width / 3.40, borderRadius: 0 }}
        />
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
        <View style={{flexDirection:'row',alignItems:"center"}}>
        <Text style={{ fontFamily: 'AvenirNextLTPro-Regular', fontSize: 16, fontWeight: '700' }}>{item.price}</Text>
        
        </View>
          
          <Text style={{ fontSize: 13, fontFamily: 'AvenirNextLTPro-Bold', fontWeight: '700', color: '#666' }}>{item.name}</Text>
          <Text style={{ fontFamily: 'AvenirNextLTPro-Regular', color: '#666',fontSize:12 }}>4 Kg</Text>
          
        </View>
   
   
      
        <TouchableOpacity
   style={{ borderWidth:0,backgroundColor: 'green', paddingVertical: 10, position: 'absolute', left: 10, right: 10, bottom: 10, justifyContent: 'center', alignItems: 'center',borderRadius:5 }}
   onPress={()=>{this.addTOCart()}}
   >
        <View >
           <Text style={{ fontSize: 12, fontFamily: 'AvenirNextLTPro-Bold', color: '#fff', fontWeight: '700' }}><FontAwesome5 name="plus" size={10}></FontAwesome5>  Add to cart </Text>
   
        </View>
   </TouchableOpacity>
      
      
      
      </View>]
      });
      return fProducts;
     }
   else{
     return <View>
       <Text>Loading...</Text>
     </View>
   }
  }


  mainCrousal(number, title) {
    const { slider1ActiveSlide } = this.state;
    
    
   
   if(this.state.banners){
     
    return (
      <View style={styles.exampleContainer}>
        {/* <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text> */}
        <Carousel
          ref={c => this._slider1Ref = c}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={10}
          autoplay={true}
          autoplayDelay={1000}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 0, 0, 0.82)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );}
    
  }


  render() {
    const banner = this.mainCrousal(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
    this.checkLogin();
    return (
      <>
        <View style={{ backgroundColor: '#f3f6f9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10,paddingHorizontal:20, borderBottomWidth: 2, borderBottomColor: '#EAECEF' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>

          
            <Image resizeMode='contain' source={require('../../assets/images/logo.png')}
              style={{ width: 100, height: 45 }}
            />
             <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeAddress')} style={{position:'relative',marginRight:20}}>
            {/* <FontAwesome5 name="map" size={20} /> */}
            <Text style={{fontWeight:'700',}}>Your Address  <FontAwesome5 name="pencil-alt" size={12} color={'green'}/></Text>
            <Text style={{ fontSize: 11,fontFamily: 'AvenirNextLTPro-Bold', color: "#afafaf",}}>
               1004,Parsvnath Planet,Gomti Nagar
              </Text>
             
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "flex-end", flexDirection: 'row' }}>
         
            <Text style={{ fontSize: 10, marginRight: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
              <FontAwesome5 name="search" size={20} />
            </Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={{position:'relative'}}>
            <FontAwesome5 name="shopping-cart" size={20} />
            <View style={{backgroundColor:'green',padding:5,justifyContent:'center',alignItems:'center',position:'absolute',top:-12,right:-7,borderRadius:100,borderColor:'#fff',borderWidth:1,width:20,height:20}}>
            <Text style={{ fontSize: 10,fontFamily: 'AvenirNextLTPro-Bold', color: "#fff",}}>
               3
              </Text>
            </View>
             
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <StatusBar backgroundColor="green" barStyle="light-content" />
          <View style={{ flex: 1, padding: 0, }}>
            <View style={{ padding: 16, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>
                Welcome to
              </Text>
              <Text style={{ fontSize: 30, color: 'green', fontWeight: "bold" }}>
                Alraya Grocery
              </Text>
            </View>
            <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center', width: width / 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: 'stretch', textAlign: 'center' }}>
                Save Money , Live Better
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Button uppercase={false}
                  onPress={() => this.props.navigation.navigate('Shop')}
                  //onPress={() => this.login()}
                  style={{ marginHorizontal: 0, marginTop: 15, paddingHorizontal: 30, backgroundColor: 'green',borderRadius:50 }}
                >
                  <Text style={{ color: '#fdfdfd', fontSize: 14, }}>Start Shopping</Text>
                </Button>
                {this.state.loginButton}
              </View>
            </View>
            <View>
              {banner}
            </View>

            {/* <View style={{ justifyContent: 'center', paddingLeft: 40, paddingRight: 40, paddingBottom: 10, marginTop: 50 }}>
             
              <View style={styles.SectionStyle}>
               
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Cerca qui"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#BEC2CE"
                />
              </View>
            </View> */}
            <View style={{ flex: 4, backgroundColor: '#fff' }}>
            {this.getCategories()}

            <TouchableOpacity style={{padding:22,marginTop:-25}}
            onPress={()=>{this.props.navigation.navigate('Categories')}}
            >
             
               <Text style={{color:'green'}}>See All</Text>
           </TouchableOpacity>

              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: 'AvenirNextLTPro-Bold', marginBottom: 20, fontWeight: '700' }}>Featured Products</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                
                 
                {this.featuredProducts()}
               

                  

                  
                 
                </ScrollView>
              </View>
              


             



            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

