import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    Image,
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

class TampilCustModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_user_trans:"",
            username: "",
            email: "",
            telp: "",
            loading: false,
            errorMessage: '',
            isOpen:true,
            dropdown: null,
            selected:[],
            selectedLanguage:"",
            emplo:'',
            Custx:[],
        };

        /*
        this.state = {
            open: false,
            value: null,
            items: [{label: 'Apple', value: 'apple'},
            {label: 'Banana', value: 'banana'}]
          };
      
          this.setValue = this.setValue.bind(this);


          setOpen(open) {
            this.setState({
              open
            });
          }
        
          setValue(callback) {
            this.setState(state => ({
              value: callback(state.value)
            }));
          }
        
          setItems(callback) {
            this.setState(state => ({
              items: callback(state.items)
            }));
            */
            // const { Custx:[] } = this.state;
    }

    

    textInputChange = (val) => {
        this.setState({ vari: val   });
        //alert(this.state.vari);
        this.getUsers();
      }



    componentDidMount() {
        // state value is updated by selected Cust data
        const { id_user_trans,username, telp, email } = this.props.selectedCust;
        this.setState({
            id_user_trans:id_user_trans,
            username: username,
            telp: telp,
            email: email
        });
        this.getUsers();
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }







    addCust = () => {
        // destructure state
		//http://dummy.restapiexample.com/api/v1/create
        const { id_user_trans,username, telp, email } = this.state;
		
  // const [value, setValue] = useState({
    // username: '',
    // age: '',
	// salary:''
  // })		
		
		
        this.setState({ errorMessage: "", loading: true });

        // if (username && age && salary) {
            //192.168.43.249
            //10.246.135.103
            fetch("https://yukimuraattachment.com/apisales/apiinputanData", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_user_trans: this.state.id_user_trans,
                    username: this.state.username,
                    harga: this.state.email,
                    telp: this.state.telp
                })
            })
                .then(res => res.json())
				.then(res => {
					this.props.closeModal();
					this.props.addCust({
                        id_user_trans: res.id_user_trans,
                        username: res.username,
                        telp: res.telp,
                        harga: res.email,
                        id: this.props.selectedCust.id
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
        fetch('https://yukimuraattachment.com/apisales/apipelangganku', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => this.setState({
            Custx: [...this.state.Custx, ...res],
            loading: false, errorMessage: ""
          }
          ))
          .catch(() => this.setState({
            loading: false,
            errorMessage: "Network Error. Please try again xx."
          }))

        //alert(this.state.Custx);
      }


      setResult = (res) => {
        this.setState({
            Custx: [...this.state.data, ...res],
          error: res.error || null,
          loading: false
        });
      }




      _renderItem = ()  => {
        return (
          this.state.Custx.map((item, index) => 
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
          )
        );
    };


    updateCust = () => {
        // destructure state
        const { username, telp, email } = this.state;
        this.setState({ errorMesstelp: "", loading: true });
//alert(username);
        if (username && telp && email) {
            // selected Cust is updated with Cust id
            //fetch(`http://dummy.restapiexample.com/api/v1/update/${this.props.selectedCust.id}`, {
    //192.168.43.249
    //192.168.100.203 
            fetch(`https://yukimuraattachment.com/apisales/apieditanData?id=${this.props.selectedCust.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_user_trans: this.state.id_user_trans,
                    username: this.state.username,
                    email: this.state.email,
                    telp: this.state.telp
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.closeModal();
                    this.props.updateCust({
                        id_user_trans: res.id_user_trans,
                        username: res.username,
                        telp: res.telp,
                        email: res.email,
                        id: this.props.selectedCust.id
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
        const { id_user_trans, username, telp, email, loading, errorMessage } = this.state;


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
                    <Text style={styles.title}>Customer</Text>


                    
<Image
          source={{
            uri:
            'https://yukimuraattachment.com/img/cust.png',
           }}
          style={{
            width: 50,
            height: 50,
            margin :'auto',
            //Below lines will help to set the border radius
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 15,
            alignItems:'center',
            overflow: 'hidden',
          }}
        />

                    <Text
                        style={styles.title}>Nama : {username}</Text>
                    <Text
                        style={styles.title}>Email : {email}</Text>    
                    <Text
                        style={styles.title}>Telp : {telp}</Text>    

                   

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>

                

             

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                   
                   








                </View>
                </ScrollView>
            </Modal>
        );
    }
}



export default TampilCustModal;

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