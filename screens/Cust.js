import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity , Image, StatusBar, RefreshControl} from "react-native";
import AddCustModal from "./AddCustModal";
import EditCustModal from "./EditCustModal";
import TampilCustModal from "./TampilCustModal";
// import DeleteCustModal from "./deleteCustModal";
import InputSpinner from "react-native-input-spinner";
// import { useTheme } from '@react-navigation/native';
import FlatListDemo from "./FlatListDemo";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

//https://dummy.restapiexample.com/api/v1/Custs
class Cust extends Component {
  state = {
    Cust: [],
    isAddCustModalOpen: false,
    isTampilCustModalOpen: false,
    isEditCustModalOpen: false,
    isFlatListDemoOpen: false,
    isDeleteCustModalOpen: false,
    loading: false,
    errorMessage: "",
    selectedCust: {},
    counter : 0,
    name: "",
    vari:"",
    dropdown: null,
    data:[],
    isRefresh: false
  }

  constructor(props){
    super(props)
    this.navigationListener = this.props.navigation.addListener('focus', () => {
      this.setState({
        errorMessage: "",
        loading: true,
        data: []
      }, () => this.getData())
    })
  }

  componentWillUnmount(){
    if (this.navigationListener){
      this.navigationListener()
    }
  }

  incrementCount () {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  decrementCount () {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  textInputChange = (val) => {
    this.setState({ vari: val   });
    //alert(this.state.vari);
    this.getDatax();
  }

  getDatax = () => {
    this.setState({ errorMessage: "", loading: true });
    // alert(this.state.vari);
    //192.168.43.249
    //192.168.100.203
    //10.246.135.103
    fetch('https://yukimuraattachment.com/apisales/apipelanggan?vari='+this.state.vari, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res],
          Cust: res,
          loading: false, errorMessage: ""
        })}
      )
      .catch(() => this.setState({
        loading: false,
        errorMessage: "Network Error. Please try again xx."
      }))
  }

    //192.168.43.249
    //192.168.100.203
  getData = () => {
    // this.setState({ errorMessage: "", loading: true })
    fetch('https://yukimuraattachment.com/apisales/apipelanggan', {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res],
          Cust: res,
          loading: false, errorMessage: ""
      })}
      )
      .catch(() => this.setState({
        loading: false,
        errorMessage: "Network Error. Please try again xx."
      }))
  }

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false
    });
  }

  toggleAddCustModal = () => {
    this.setState({ isAddCustModalOpen: !this.state.isAddCustModalOpen });
	  //this.getData();
  }

  toggleEditCustModal = () => {
    this.setState({ isEditCustModalOpen: !this.state.isEditCustModalOpen });
  }

  toggleTampilCustModal = () => {
    this.setState({ isTampilCustModalOpen: !this.state.isTampilCustModalOpen });
  } 

  toggleFlatListDemo= () => {
    this.setState({ isFlatListDemoOpen: !this.state.isFlatListDemoOpen });
  }

  toggleDeleteCustModal = () => {
    this.setState({ isDeleteCustModalOpen: !this.state.isDeleteCustModalOpen });
  }

  addCust = (data) => {
    // this.state.Cust array is seprated into object by rest operator
    this.setState({ Cust: [data, ...this.state.Cust] })
  }

  updateCust = (data) => {
    // updating Cust data with updated data if Cust id is matched with updated data id
    this.setState({ Cust: this.state.Cust.map(emp => emp.id == data.id_user_trans ? data : emp) });
  }

  tampilCust = (data) => {
    // updating Cust data with updated data if Cust id is matched with updated data id
    this.setState({ Cust: this.state.Cust.map(emp => emp.id == data.id_user_trans ? data : emp) });
  } 

  deleteCust = CustId => {
    // delete Cust lsit with deleted data if Cust id is matched with updated data id
    this.setState({ Cust: this.state.Cust.filter(emp => emp.id !== CustId) })
  }

_renderItem = ()  => {
    return (
      this.state.data.map((item, index) => 
    <View style={styles.item}>
        <Text style={styles.textItem}>{item.username}</Text>
    </View>
      )
    );
};


  render() {
    const { loading, errorMessage, Cust, isAddCustModalOpen,
      isEditCustModalOpen,isTampilCustModalOpen, isFlatListDemoOpen, isDeleteCustModalOpen, selectedCust } = this.state;

    //192.168.43.249
    //192.168.100.203
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.isRefresh}
          onRefresh={() => {
            this.setState({
              data: [],
              loading: true,
              isRefresh: true})
          }, () => {
            this.getData()
            setTimeout(() => {
              this.setState({isRefresh: false})
            }, 2000)
          }}
        />
      }>

        <View style={styles.container}>
        <StatusBar />
          <TouchableOpacity
            onPress={this.toggleAddCustModal}
            style={styles.button}>
            <Text style={styles.buttonText}>Tambah Customer</Text>
          </TouchableOpacity>

    
          {this.state.data && this.state.data.length > 0 ? <Dropdown
                    style={styles.dropdown}
                    data={this.state.data}
                    search
                    searchPlaceholder="Search"
                    labelField="username"
                    valueField="id_user_trans"
                    placeholder="Select item"
                    value={this.state.dropdown}
                    onChange={item => {this.setState({dropdown:item.id_user_trans});
                    console.log('selected', item);
                    }}
                    items={this.state.data.map(item=> ({label:item.username,value:item.id_user_trans}))}
                    renderItem={this._renderItem}
                />  : null} 

     
        <TextInput 
                    placeholder="select name"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onChangeText={(val) => this.textInputChange(val)}
                />


          <Text style={styles.title}>Customer Lists:</Text>
          {Cust.map((data, index) => <View
            style={styles.CustListContainer}
            key={data.id_user_trans}>
         

            <View style={{flexDirection:'row', width:"85%"}}>   
            <Image
              source={{
                uri:data.gambar,
              }}
              style={{
                width: 80,
                height: 80,
                //Below lines will help to set the border radius
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 15,
                overflow: 'hidden',
              }}
            />

            <View style={{flexDirection:'column', width:"55%",paddingHorizontal: 12,}}>   
        
            <Text style={styles.name}>{data.username}</Text>
            <Text style={styles.listItem}>Email: {data.email}</Text>
            <Text style={styles.listItem}>Telp: {data.telp}</Text>
           
            </View>

            
      
            
            <View style={{flexDirection:'column', width:"35%",}}>   
              <TouchableOpacity
                onPress={() => {
                  // alert(data);
                  this.toggleEditCustModal();
                  this.setState({ selectedCust: data })
                }}
                style={{ ...styles.button, marginVertical: 0 , backgroundColor: "tomato"}}>
                <Text style={styles.buttonText}>EDIT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // alert(data);
                  this.toggleTampilCustModal();
                  this.setState({ selectedCust: data })
                }}
                style={{ ...styles.button, marginVertical: 0 , marginTop:5, backgroundColor: "blue"}}>
                <Text style={styles.buttonText}>Tampil</Text>
              </TouchableOpacity>


            </View>

            </View>
          </View>)}

          {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
              style={styles.message}>{errorMessage}</Text> : null}

          {/* AddCustModal modal is open when add Cust button is clicked */}
          {isAddCustModalOpen ? <AddCustModal
            isOpen={isAddCustModalOpen}
            closeModal={this.toggleAddCustModal}
            addCust={this.addCust}
          /> : null}

          {/* AddCustModal modal is open when add Cust button is clicked */}
          {isFlatListDemoOpen ? <FlatListDemo
            isOpen={isFlatListDemoOpen}
            closeModal={this.toggleFlatListDemo}
          /> : null}

          {/* EditCustModal modal is open when edit button is clicked in particular Cust list*/}
          {isEditCustModalOpen ? <EditCustModal
            isOpen={isEditCustModalOpen}
            closeModal={this.toggleEditCustModal}
            selectedCust={selectedCust}
            updateCust={this.updateCust}
          /> : null}

{isTampilCustModalOpen ? <TampilCustModal
            isOpen={isTampilCustModalOpen}
            closeModal={this.toggleTampilCustModal}
            selectedCust={selectedCust}
            tampilCust={this.tampilCust}
          /> : null}

          {/* DeleteCustModal modal is open when delete button is clicked in particular Cust list*/}
          {isDeleteCustModalOpen ? <DeleteCustModal
            isOpen={isDeleteCustModalOpen}
            closeModal={this.toggleDeleteCustModal}
            selectedCust={selectedCust}
            updateCust={this.deleteCust}
          /> : null}
        </View>

      </ScrollView>
    );
  }
}

export default Cust;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  CustListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "tomato",
    fontSize: 17
  },
  spinner: {
		flex: 1,
		marginRight: 10,
		minWidth: 150,
	}
})