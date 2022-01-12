import React, { Component } from "react";
import { StyleSheet,View, Text, FlatList,Image,  Button, TouchableOpacity} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import EditTagihanModal from "./EditTagihanModal";
 
class FlatListDemo extends Component {
 
  constructor(props) {
    super(props); 
  
    this.state = { 
      loading: false,   
      data: [],
      temp: [],
      error: null,
      search: null,
      isEditTagihanModalOpen: false,
      selectedTagihan: {},
    };
  }
  
  componentDidMount() {
    this.getData();
  }



   onSubmitx = () =>{
    //   navigation.navigate('FlatDua',{tes: 'ziyan'});
      this.props.navigation.navigate('FlatDua');
         
  }

  toggleEditTagihanModal = () => {
    this.setState({ isEditTagihanModalOpen: !this.state.isEditTagihanModalOpen });
  }
 
  renderContactsItem = ({ item, index }) => {
    const { navigate } = this.props.navigation;
    return(
      <View style={ [styles.itemContainer, { backgroundColor: index % 2 === 1 ? "#fafafa" : "" }] }>


<TouchableOpacity onPress={() => navigate('Struk', { id_trans: `${item.id_transaksi}`,total_harga: `${item.total_harga}` })}  >
           
  

        <View style={ styles.textContainer }>
          <Text style={ styles.textName }> { item.kode_trans } </Text>
          <Text style={ styles.textName }> { item.tgl_trans } </Text>
          <Text style={ styles.textCompany }> { item.total_harga } </Text>
        </View>
        
</TouchableOpacity>
      </View>
    );
  }






  getData = () => {
    this.setState({ errorMessage: "", loading: true })
    fetch('https://yukimuraattachment.com/apisales/apistrukheader', {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => this.setState({        
            data: [...this.state.data, ...res],
            temp: [...this.state.temp, ...res],
            error: res.error || null,
            loading: false
        
      }))
      .catch(() => this.setState({
        loading: false,
        errorMessage: "Network Error. Please try again xx."
      }));
      
  }


 
  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false
    });
  }
 
  renderHeader = () => {
      return <SearchBar placeholder="Search Herez..."
          lightTheme round editable={true}
          value={this.state.search}
          onChangeText={this.updateSearch} />; 
  }; 
 
  updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {
                this.setState({
                    data: [...this.state.temp]
                });
                return;
            }
             
            this.state.data = this.state.temp.filter(function(item){
                return item.kode_trans.includes(search);
              }).map(function({kode_trans, tgl_trans, total_harga}){
                return {kode_trans, tgl_trans, total_harga};
            });
        });
  };
 
  render() {
    const { data,isEditTagihanModalOpen, temp,error,loading , selectedTagihan} = this.state;
    return (
      this.state.error != null ?
        <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getData();
            }
          } title="Reload" />
        </View> : 
        <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem = { this.renderContactsItem }
      />
    );
  }
}


const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee"
    },
    itemAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal: 10,
    },
    textContainer: {
      justifyContent: "space-around"
    },
    textName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    textCompany: {
      fontSize: 13
    },
    searchContainer: {
      padding: 10
    },
    searchInput: {
      fontSize: 16,
      backgroundColor: "#fafafa",
      flex: 1,
      padding: 10
    }
  });
   
export default FlatListDemo;