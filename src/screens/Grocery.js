import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Dimensions } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

class Grocery extends Component {
 
  constructor(props) {
    super(props);
    
  
    this.state = {
    categories:''
    };
  
  }
  
  componentDidMount(){
  
    fetch('http://skyviewads.com/projects/PosCi/api/v1/category?level=3&id='+this.props.navigation.getParam('id'), {
      method: 'GET',
      headers: {
       'api-key': '84co8gwgooso4ss4sws80804w4o44w0kc8s800w0'
      }
   
    }).then((response) => response.json())
    .then((json1) => {
     // alert(JSON.stringify(json1));
      this.setState({categories:json1});
    });
  }


  getCategory()
  {
   if(this.state.categories){
    let categories='';
    this.state.categories.map((item)=>{
        categories =[...categories,  <TouchableOpacity onPress={() => this.props.navigation.navigate({
          routeName:'Items',
          params:{
            id:item.id,
            code:item.code,
            name:item.name
          }
        })}>
        <View style={{borderColor:'#dfdfdf',borderWidth:1,marginBottom:8}}>
       
              <Image
               source={{
                uri: 'http://skyviewads.com/projects/PosCi/assets/uploads/'+item.image,
              }}
             style={{ height:width/2.3,width:width/2.1, borderRadius:0,borderBottomLeftRadius:0,borderBottomRightRadius:0}}
             />
             <View style={{alignItems:'center',width:width/2.1,flexWrap:'nowrap',padding:10,backgroundColor:'white'}}>
               <Text style={{fontSize:15,fontFamily:'AvenirNextLTPro-Bold',color:'#666',fontWeight:'700'}}>{item.name}</Text>
               
             </View>
           </View>
        </TouchableOpacity>]
    })
    return(
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:20,flexWrap:'wrap',flex:1}}>
        {categories}
        </View>
        
        
        
    );}

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
 

  render() {
    return (
        <>
          
            <View style={{ backgroundColor:'#fff',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, }}>
            <View style={{flexDirection:'row', alignItems:'center',padding:10,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                   <FontAwesome5 name="arrow-left" size={18} color={'#000'} />
                   </TouchableOpacity>
                <Text style={{marginLeft:20,fontSize:18,fontWeight:"bold",fontFamily:'AvenirNextLTPro-Bold',color:"green"}}>{this.props.navigation.getParam('name')}</Text>
            </View>
         {/* <View style={{justifyContent:"flex-end",flexDirection:'row'}}>
         <Text style={{ fontSize: 10,marginRight:20, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
          <FontAwesome5 name="search" size={20}  /> 
          </Text>
        
          <Text style={{ fontSize: 10, fontFamily: 'AvenirNextLTPro-Bold', color: "#000" }}>
          <FontAwesome5 name="shopping-cart" size={20}  /> 
          </Text>
         </View> */}
        </View>
            <ScrollView
            scrollEventThrottle={16}
            >
            <View style={{padding:5,margin:0}}>
            {this.getCategory()}
               
               
               
            </View>
            </ScrollView>
        </>
    )
  }
}

export default Grocery;