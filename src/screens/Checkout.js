import React, { Component } from 'react'
import { View, Image, TextInput, StyleSheet, Dimensions, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import CheckoutEntry from '../components/CheckoutEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import { scrollInterpolators, animatedStyles } from '../utils/animations';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
const { width, height } = Dimensions.get('window')
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
export default class Checkout extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  componentDidMount(){
  
    fetch('http://skyviewads.com/projects/PosCi/api/v1/products?code='+this.props.navigation.getParam('id'),{
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
   // alert(JSON.stringify(json1));
      this.setState({items:json1});
    });
  }

  _renderItem({ item, index }) {
    return <CheckoutEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <CheckoutEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <CheckoutEntry data={item} even={false} />;
  }



  main(number, title) {
    const { slider1ActiveSlide } = this.state;
  if(this.state.items){
    return (
      <View style={styles.exampleContainer}>
        {/* <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text> */}
        <Carousel
          ref={c => this._slider1Ref = c}
          data={ENTRIES2}
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
          loopClonesPerSide={3}
          autoplay={false}
          autoplayDelay={1000}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES2.length}
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
    else
    {
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

  addToCart(name,price,code){
    //alert(name+' '+price+' '+code);
    
    let key = firebase.database().ref(`/cart`).push().key;
    firebase.database().ref(`/cart`).child(key).set({name:name,price:price,code:code});
  }
  render() {
    const checkout = this.main(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');

   if(this.state.items){
   //alert(JSON.stringify(this.state.items))
    return (
      <>
       <StatusBar backgroundColor="green" barStyle="light-content" />
        <Container>
          <Header style={{backgroundColor:'#fff'}}>
            <Left>
              <Button transparent   onPress={() => this.props.navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={18} color={'#333'} />
              </Button>
            </Left>
            <Body>
              <Title style={{fontWeight:'700',color:'#333',marginLeft:-20}}>Checkout</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              <StatusBar backgroundColor="green" barStyle="light-content" />
              <View style={{ flex: 1 }}>
                <View>
                  {checkout}
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
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, fontFamily: 'AvenirNextLTPro-Bold',fontWeight:'700' }}>
{this.state.items.name}</Text>
                   
                    <Text style={{fontSize:12,color:'#666'}}>{this.state.weight?this.state.weight:''}</Text>
                
                    <View style={{ justifyContent: 'flex-start' }}>
                      <Text style={{ fontFamily: 'AvenirNextLTPro-Bold', color: 'green', marginTop: 10, fontSize: 20,fontWeight:'700' }}>SAR {this.state.items.price} </Text>

                    </View>

                   
                   

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontSize: 20, fontFamily: 'AvenirNextLTPro-Bold',fontWeight:'700' }}>Product Description</Text>
                      <Text style={{fontSize:13,color:"#666"}}>{this.state.items.product_details}</Text>
                      <Text style={{fontSize:13,color:"#666"}}>For Manufacturer, FSSAI, Nutritional & Shelf Life details, please refer to the individual products.</Text>

                    </View>


                  </View>
                  {/* <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', bottom: 0, left: 0, right: 0, minHeight: 60 }}>
                    <Text style={{ color: 'white' }}>Checkout</Text>
                  </View> */}


                </View>
              </View>
            </ScrollView>
          </Content>
          <Footer>
            <FooterTab style={{backgroundColor: 'green'}}>
              <Button success onPress={() => this.props.navigation.navigate('Fevorite')}>
                <Text style={{fontSize:12,color:"#fff",fontWeight:'700'}}>Add to Fevorite</Text>
              </Button>
              <Button onPress={() => this.addToCart(this.state.items.name,this.state.items.price,this.state.items.code)}>
                <Text style={{fontSize:12,color:"#fff",fontWeight:'700'}}>Add to cart</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 2, borderBottomColor: '#EAECEF' }}>
          <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>Menu</Text>
          <Text style={{ fontSize: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>Print Vihar</Text>
          <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>Notification</Text>
        </View> */}

      </>
    )}
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
}

