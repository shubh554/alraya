import React, { Component } from 'react'
import { View, Modal, Alert, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, Header, Left, Body, Right, Icon, Segment, Content, Item, Input, Text, Button, ListItem, Radio } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';




const { width, height } = Dimensions.get('window')

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {

            modalVisible: false,
            filter:'',
            products:'',
            activeFilter:'no'

        };
        this.props.navigation.getParam('id')

    }

    componentDidMount(){
        
        fetch('http://skyviewads.com/projects/PosCi/api/v1/category?level=4&id='+this.props.navigation.getParam('id'), {
            method: 'GET',
            headers: {
             'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
            }
         
          }).then((response) => response.json())
          .then((json1) => {
          // alert(JSON.stringify(json1));
           this.setState({filter:json1});
          });
        // alert(this.props.navigation.getParam('id'))
          fetch('http://skyviewads.com/projects/PosCi/api/v1/products?category_code='+this.props.navigation.getParam('code')+'&include=category,brand', {
            method: 'GET',
            headers: {
             'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
            }
         
          }).then((response) => response.json())
          .then((json1) => {
         //  alert(JSON.stringify(json1));
          this.setState({products:json1.data});
          });
      }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    getFilters()
    {
       if(this.state.filter){
        let filters = ''
       this.state.filter.map((item,key)=>{
          
        
       
        
        filters = [...filters,<ListItem 
        onPress={()=>{this.applyFilter(item.code,item.name)}}
        key={key}>
            <Left>
                <Text>{item.name}</Text>
            </Left>
            <Right>
                <Radio color={"#f0ad4e"}
                    selectedColor={"#5cb85c"} selected={item.code==this.state.activeFilter} />
            </Right>
        </ListItem>]
        
        
       });

       return filters;
   
    

}
    }
  

applyFilter(code,name){
    alert('Applied Filter '+name+' '+code)
    fetch('http://skyviewads.com/projects/PosCi/api/v1/products?category_id='+code+'&include=category,brand', {
        method: 'GET',
        headers: {
         'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
        }
     
      }).then((response) => response.json())
      .then((json1) => {
      //alert(JSON.stringify(json1));
      this.setState({products:json1.data});
      this.setState({activeFilter:code})
      });
  }





    getProducts()
    {
       
        if(this.state.products)
        {
            let products = '';
            this.state.products.map((item)=>{
                products = [...products, 
                <View style={styles.item}>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate({
          routeName:'Checkout',
          params:{
              id:item.code
          }
         
        })}>
                    <Image   source={{
          uri: item.image_url,
        
        }}
                        style={{ height: width / 2.3, width: '100%', borderRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    </TouchableOpacity>
                    <View style={styles.itemDetails}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.weight}>{item.weight>0?item.weight:''}</Text>
                    </View>
                    <View style={styles.pricingSection}>
                        <Text style={styles.price}>SAR {item.price}</Text>
                        <Button bordered small success
                          onPress={()=>{alert('clicked')}}
                        > 
                            <Text style={{ fontSize: 10 }}>Add to Cart</Text>
                        </Button>
                    </View>
                </View>
            ]
            })
            return products;}
            else{
                return(
                    <View>
                         <Image
          style={{height:300,width:'100%'}}
          source={require('../styles/32.gif')}
        />
                    </View>
                )
            }
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>

                <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 2, borderBottomColor: '#EAECEF' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome5 name="arrow-left" size={18} color={'#000'} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'AvenirNextLTPro-Bold', color: "green", marginLeft: 15 }}>Spices & Salt</Text>
                    </View>
                    <View style={{ justifyContent: "flex-end", flexDirection: 'row' }}>
                        <Text style={{ fontSize: 10, marginRight: 20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                            <FontAwesome5 name="search" size={18} />
                        </Text>

                        <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
                            <FontAwesome5 name="shopping-cart" size={18} />
                        </Text>
                    </View>

                </View>
                <View style={{ backgroundColor: '#f3f6f9', paddingVertical: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                  
                    <Button onPress={() => {
                        this.setModalVisible(true);
                    }} small transparent light>
                        <FontAwesome5 name={"filter"} color={'green'} size={14} /><Text style={{ fontSize: 13,color:'green' }}>Filter</Text>
                    </Button>
                </View>

                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{ padding: 5 }}>
                        <View style={styles.itemSection}>
                           {this.getProducts()}
                       </View>
                       </View>
                </ScrollView>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <Container style={{flex:1}}>

                            <Item style={{ backgroundColor: '#fff', paddingVertical: 17, paddingHorizontal: 10, width: width }}>
                                <Button transparent small hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}

                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}
                                >
                                    <FontAwesome5 name="arrow-left" size={20} style={{ paddingHorizontal: 10 }} />
                                </Button>
                                <Text style={{ fontWeight: '700', marginHorizontal: 10 }}>Filter</Text>



                            </Item>


                            <ScrollView style={{ backgroundColor: '#f3f6f9' }}>
                                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 13, fontWeight: '700', color: 'green' }}>Sort by</Text>
                                </View>
                               {this.getFilters()}
                             
                              </ScrollView>
                        </Container>
                        <Button large success style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fdfdfd',fontSize:14,fontWeight:'700'}}>Done</Text>
                        </Button>
                    </Modal>


                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15, fontFamily: 'AvenirNextLTPro-Bold', color: '#666', fontWeight: '600'
    },
    price: {
        fontSize: 18, fontFamily: 'AvenirNextLTPro-Bold', color: '#222', fontWeight: '700'
    },
    weight: {
        fontSize: 14, fontFamily: 'AvenirNextLTPro-Bold', color: '#666', fontWeight: '400'
    },
    pricingSection: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 10
    },
    itemDetails: {
        alignItems: 'flex-start', flexWrap: 'nowrap', padding: 10, backgroundColor: 'white', borderBottomLeftRadius: 0, borderBottomRightRadius: 0
    },
    itemSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        flexWrap: 'wrap',
    },
    item: {
        borderColor: '#dfdfdf', borderWidth: 1, marginBottom: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        height: height,
        width: width,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});

export default Items;