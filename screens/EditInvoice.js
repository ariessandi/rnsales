import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
//import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';
//import Card from "react-native-card-component";
import InputSpinner from "react-native-input-spinner";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import DropDownPicker from 'react-native-dropdown-picker';

class EditInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_transaksi:"",
            id_user_trans:"",
            harga: "",
            price: "",
            loading: false,
            errorMessage: '',
            isOpen:true,
            dropdown: null,
            selected:[],
            selectedLanguage:"",
            emplo:'',
            employeex:[],
        };

      
    }

    

    textInputChange = (val) => {
        this.setState({ vari: val   });
        //alert(this.state.vari);
        this.getUsers();
      }



    componentDidMount() {
        // state value is updated by selected employee data
        const { id_transaksi,id_user_trans, price,harga } = this.props.selectedEmployee;
        this.setState({
            id_transaksi:id_transaksi,
            id_user_trans: id_user_trans,
            price: price,
            harga: harga,
        });
        this.getUsers();
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }






    addEmployee = () => {
        // destructure state
		//http://dummy.restapiexample.com/api/v1/create
        const { id_transaksi, id_user_trans,price,harga } = this.state;		
        // const [value, setValue] = useState({
        // name: '',
        // age: '',
        // salary:''
        // })			
        this.setState({ errorMessage: "", loading: true });

        // if (name && age && salary) {
            //192.168.43.249
            //10.246.135.103
            //192.168.100.203
            fetch("https://yukimuraattachment.com/apisales/apiinputanData", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_user_trans: this.state.id_user_trans,
                    harga: this.state.harga,
                    price: this.state.price
                })
            })
                .then(res => res.json())
				.then(res => {
					this.props.closeModal();
					this.props.addEmployee({
                        id_user_trans: res.id_user_trans,
                        price: res.price,
                        harga: res.harga,
                        id: res.id_transaksi
                    });
				  })                
				.catch(error => {
					this.setState({ errorMessage: "tes :"+error, loading: false })
				  });
                // .catch(() => {
                // this.setState({ errorMessage: "Network Error. Please try again ZZ.", loading: false })
                // })
                // } else {
                // this.setState({ errorMessage: "Fields are empty.", loading: false })
                // }
    }



    getUsers = () => {
        this.setState({ errorMessage: "", loading: true });
        // alert(this.state.vari);
        //192.168.43.249
        //192.168.100.203
        //10.246.135.103
        fetch('https://yukimuraattachment.com/apisales/apitampeg', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => this.setState({
            employeex: [...this.state.employeex, ...res],
            loading: false, errorMessage: ""
          }
          ))
          .catch(() => this.setState({
            loading: false,
            errorMessage: "Network Error. Please try again xx."
          }))

        //alert(this.state.employeex);
      }


      setResult = (res) => {
        this.setState({
            employeex: [...this.state.data, ...res],
          error: res.error || null,
          loading: false
        });
      }




      _renderItem = ()  => {
        return (
          this.state.employeex.map((item, index) => 
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
          )
        );
    };


    updateEmployee = () => {
        // destructure state
        const { id_user_trans, harga, price } = this.state;
        this.setState({ errorMessage: "", loading: true });
//alert(name);
        if (id_user_trans && price) {
            // selected employee is updated with employee id
            //fetch(`http://dummy.restapiexample.com/api/v1/update/${this.props.selectedEmployee.id}`, {
    //192.168.43.249
    //192.168.100.203 
            fetch(`https://yukimuraattachment.com/apisales/apieditanData?id=${this.props.selectedEmployee.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_user_trans: this.state.id_user_trans,
                    harga: this.state.harga,                   
                    price: this.state.price
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.closeModal();
                    this.props.updateEmployee({
                        id_user_trans: res.id_user_trans,                       
                        price: res.price,
                        id: this.props.selectedEmployee.id
                    });
                })
                .catch(() => {
                    this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
                })
        } else {
            this.setState({ errorMessage: "Fields are empty.", loading: false })
        }
        
    }

    render() {
        const { isOpen, closeModal } = this.props;
        const { id_user_trans, price, harga, loading, errorMessage } = this.state;


        const _renderItemxx = item => {
            return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
            );
        };

   
  










            

        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Update Employee</Text>

                    <TextInput
                        value={id_user_trans}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "id_user_trans")}
                        placeholder="Full Name" />
    

                    <TextInput
                        defaultValue={price}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(val) => this.textInputChange(val)}
                        placeholder="price" />
                   



                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>

                    <TouchableOpacity
                            onPress={this.addEmployee}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.updateEmployee}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.itemx}>
                        <TextInput
                            value={name}
                            style={styles.textBox}
                            onChangeText={(text) => this.handleChange(text, "name")}
                            placeholder="Full Name" />
                        </View>
                        <View style={styles.itemx}>
                            <Text>Right</Text>
                            <ToggleSwitch
                            isOn={ this.state.isOn }
                            onColor="green"
                            offColor="red"
                            label="Example label"
                            labelStyle={{ color: "black", fontWeight: "500" }}
                            size="small"
                            onToggle={isOn => this.setState({isOn})}
                            />
                            
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.itemx}>
                        <TextInput
                            value={name}
                            style={styles.textBox}
                            onChangeText={(text) => this.handleChange(text, "name")}
                            placeholder="Full Name" />
                        </View>
                        <View style={styles.itemx}>                            
                            <Switch
                            style={{marginRight:100}}
                            value={ this.state.isOpen }
                            onValueChange={isOpen=> this.setState({isOpen})}
                            />
                        </View>
                    </View>
                   

                <Dropdown
                    style={styles.dropdown}
                    data={this.state.employeex}
                    search
                    searchPlaceholder="Search"
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    value={this.state.dropdown}
                    onChange={item => {this.setState({dropdown:item.value});
                    console.log('selected', item);
                    }}
                    items={this.state.employeex.map(item=> ({label:item.label,value:item.value}))}
                    renderItem={item => _renderItemxx(item)}
                />   



<Picker
  selectedValue={this.state.selectedLanguage}
  onValueChange={(itemValue, itemIndex) => {this.setState({selectedLanguage:itemValue})
  }} >
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>


<Card>
    <CardImage 
      source={{uri: 'http://bit.ly/2GfzooV'}} 
      title="Top 10 South African beaches"
    />
    <CardTitle
      subtitle="Number 6"
    />
    <CardContent text="Clifton, Western Cape" />
    <CardAction 
      separator={true} 
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Share"
        color="#FEB557"
      />
      <CardButton
        onPress={() => {}}
        title="Explore"
        color="#FEB557"
      />
    </CardAction>
  </Card>



                </View>
                </ScrollView>
            </Modal>
        );
    }
}



export default EditInvoice;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
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
    message: {
        color: "tomato",
        fontSize: 17
    },
    containerx: {
        height:250,
        padding:20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      itemx: {
        marginBottom: 2,
        marginVertical: 0, 
        marginLeft: 10,
        width: '50%' // is 50% of container width
      },
      dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    dropdown2: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 20,
        padding: 8,
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },


})