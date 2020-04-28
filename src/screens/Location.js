import React, { Component } from 'react'
import { View, Text,Dimensions, SafeAreaView,StatusBar, TouchableOpacity,TouchableHighlight, KeyboardAvoidingView, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, Container, Item, Input, Label,Icon, Picker, Textarea, Right, Title, Form,Left,Header,Body,Content } from 'native-base';
import { TextInput } from 'react-native-paper';
//import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window')
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

  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

})

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRegion: "Choose A State",
      selectedStore:"Choose A Store",
      regions:''
    };
    this.checkLogin();
   
  }

  async initializeCart()
  {
    await AsyncStorage.setItem('cart', '1');
  }
  onValueChange(value: string) {
    this.setState({
      selected: 'Choose A State'
    });
  }

  componentDidMount(){
    this.initializeCart();
    fetch('http://skyviewads.com/projects/PosCi/api/v1/regions', {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
      
        
     //alert(JSON.stringify(json1))
      this.setState({regions:json1.data});
      
    });

    fetch('http://skyviewads.com/projects/PosCi/api/v1/warehouses', {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
      
     //alert(JSON.stringify(json1))
     this.setState({stores:json1.data});
    });
}

    getRegions()
    {
      if(this.state.regions)
      {
        let regions = ''
        this.state.regions.map((item,key)=>{
          regions = [...regions,  <Picker.Item label={item.name} value={item.id} key={key} />]
        })
        return regions;
      }
    
    }

    getStores()
    {
      if(this.state.stores)
      {
        let stores = ''
        this.state.stores.map((item,key)=>{
          stores = [...stores,  <Picker.Item label={item.name} value={item.id} key={key} />]
        })
        return stores;
      }
    }
   async setLocation()
    {
      if(this.state.selectedRegion=='0' || this.state.selectedStore=='0')
      {
        alert('Please Choose A Valid Region and Store')
      }
      else{
        let userLocation = {'region':this.state.selectedRegion,'store':this.state.selectedStore}
        
        try {
          await AsyncStorage.setItem('userStore', JSON.stringify(userLocation));
          
          this.props.navigation.navigate({
            routeName:'Home',
            
          })
        } catch (error) {
          alert('there was an error please try again');
        }
      }
    }

    async checkLogin()
{
  
  await AsyncStorage.getItem('userStore').then((token) => {
   // alert('logged in!!');
   if(token){
   this.props.navigation.navigate({
    routeName:'Home',
    
  })
}
   
    });

}

  render() {
    return (
      <View style={{flex:1}}>
          <Container>
          <Header style={{ backgroundColor: '#fff' }}>
                        <StatusBar backgroundColor="green" barStyle="light-content" />
                        <Left>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome5 name="arrow-left" size={18} color={'#333'} />
                                </TouchableOpacity>

                            </View>
                        </Left>
                        <Body>
                            <Title style={{ fontWeight: '700',fontSize:18,marginLeft:-30,color:'#333' }}>Choose Location</Title>
                        </Body>
                        <Right >
                            {/* <Text style={{ fontSize: 10, marginRight: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                <FontAwesome5 name="search" size={20} />
                            </Text>

                            <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                                <FontAwesome5 name="shopping-cart" size={20} />
                            </Text> */}
                        </Right>
                    </Header>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selectedRegion}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedRegion:itemValue})}
              
            >
              <Picker.Item label="Select A Region" value="0" />
              {this.getRegions()}
            </Picker>

         

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selectedStore}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedStore:itemValue})}
            >
              <Picker.Item label="Select A Store" value="0" />
              {this.getStores()}
            </Picker>
          </Form>
        </Content>
      </Container>
     
      <View style={{flex:0.1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
        <Button large success style={{width:width}} onPress={()=>{this.setLocation()}}>
          <Text style={{fontSize:15,fontWeight:'700',textAlign:'center',alignSelf:'stretch',flexGrow:1,lineHeight:45,color:'#fdfdfd'}}>Continue</Text>
        </Button>
      </View>
     </View>
    )
  }
}

