import React, { Component } from 'react'
import { View, ScrollView, Image, Dimensions, StyleSheet,StatusBar } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import { AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import * as firebase from 'firebase';
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


class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
           cart:'',
           cartEmpty:true,
           cartTotal:0
          };
      
        
      }

    async componentDidMount()
      {
       let cart = await AsyncStorage.getItem('cart');
       let cartArray='' 
       let cartItems=''  
       //alert(cart.length)   
       if(cart.length > 1)
       {
        
        cartArray = cart.split(',')
        
       
       this.setState({cartEmpty:false,cart:cartArray})

      
      }
    }

       getCartItems()
      {
      
        let cartitems = '';
        let carttotal = 0;
        
       for(let i = 1;i<this.state.cart.length;i++)
       {
        firebase.database().ref('cart/' + this.state.cart[i]).on('value', (snapshot) => {
            let name = snapshot.val().name;
            carttotal += snapshot.val().price; 
            cartitems=[...cartitems,<Card style={styles.card}>
                <CardItem style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <Image resizeMode={'contain'} 
                       source={{
                        uri:
                         snapshot.val().image
                      }}
                        style={{ width: width / 3.65, height: width / 3.65, borderRadius: 0 }}
                    />
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1.9 }}>
                     
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>{snapshot.val().name}</Text>
                     
         
                        <Text style={styles.price}>SAR {snapshot.val().price}</Text>
                    </View>
                    <Right>
                        <Button bordered success small>
                            <Text style={{fontSize:12}}>Add</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>]
        
          });  
       
       }  
       

       return  cartitems;
    
        
        
      
        
       
        
      }

      
    render() {
       if(!this.state.cartEmpty){
        return (
            <>
 
         <Container>
                    <Header style={{ backgroundColor: '#fff' }}>
                    <StatusBar backgroundColor="green" barStyle="light-content" />
                        <Left>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome5 name="arrow-left" size={18} color={'#000'} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'AvenirNextLTPro-Bold', color: "green", marginLeft: 15 }}>Cart</Text>
                            </View>
                        </Left>
                       
                        <Right >
                            <Text style={{ fontSize: 10, marginRight: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                <FontAwesome5 name="search" size={18} />
                            </Text>

                            <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                <FontAwesome5 name="shopping-cart" size={18} />
                            </Text>
                        </Right>
                    </Header>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                        <Content>
                           
                           
                       
                        
                       {this.getCartItems()}
                     
                        </Content>
                    </ScrollView>
                    <Footer>
                        <FooterTab style={{ backgroundColor: '#8bc34a' }}>
                            <View style={{flex:0.5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:12,fontWeight:'700',color:'#fdfdfd'}}>Rs 989</Text>
                                <Text style={{fontSize:10,fontWeight:'700',color:'yellow'}}>Total Save 209</Text>
                            </View>
                            <Button style={{backgroundColor:'green'}} onPress={() => this.props.navigation.navigate('Delivery')}>
                                <Text style={{color:"#fff",fontWeight:'700',fontSize:12}}>Checkout</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>

 </> )}
        else{
            return(
                <>
 
                <Container>
                           <Header style={{ backgroundColor: '#fff' }}>
                           <StatusBar backgroundColor="green" barStyle="light-content" />
                               <Left>
                                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, }}>
                                       <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                           <FontAwesome5 name="arrow-left" size={18} color={'#000'} />
                                       </TouchableOpacity>
                                       <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'AvenirNextLTPro-Bold', color: "green", marginLeft: 15 }}>Cart</Text>
                                   </View>
                               </Left>
                              
                               <Right >
                                   <Text style={{ fontSize: 10, marginRight: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                       <FontAwesome5 name="search" size={18} />
                                   </Text>
       
                                   <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                       <FontAwesome5 name="shopping-cart" size={18} />
                                   </Text>
                               </Right>
                           </Header>
                           <ScrollView
                               scrollEventThrottle={16}
                           >
                               <Content>
                                  
                                  
                              
                               
                              <Text>Your Cart Is Empty</Text>
                            
                               </Content>
                           </ScrollView>
                           <Footer>
                               <FooterTab style={{ backgroundColor: '#8bc34a' }}>
                                   <View style={{flex:0.5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                       <Text style={{fontSize:12,fontWeight:'700',color:'#fdfdfd'}}>SAR 989</Text>
                                   
                                   </View>
                                   <Button style={{backgroundColor:'green'}} onPress={() => this.props.navigation.navigate('Delivery')}>
                                       <Text style={{color:"#fff",fontWeight:'700',fontSize:12}}>Checkout</Text>
                                   </Button>
                               </FooterTab>
                           </Footer>
                       </Container>
       
        </>
            )
        }
    }
}

const styles = StyleSheet.create({
    card: {
        width: width / 1.01,
        marginBottom:0


    },


    title: {
        fontSize: 15,
        fontFamily: 'AvenirNextLTPro-Bold',
        color: '#666', fontWeight: '600'
    },
    price: {
        fontSize: 18,
        fontFamily: 'AvenirNextLTPro-Bold',
        color: '#222',
        fontWeight: '700',
        marginTop: 5
    },
    weight: {
        fontSize: 14,
        fontFamily: 'AvenirNextLTPro-Bold',
        color: '#666',
        fontWeight: '400'
    },
    pricingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    itemDetails: {
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    cartSection: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        flexWrap: 'wrap',
    },
    item: {
        borderColor: '#dfdfdf', borderWidth: 1, marginBottom: 8
    }

});

export default Cart;