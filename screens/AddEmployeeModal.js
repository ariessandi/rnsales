import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class AddEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_produk: "",
            harga: "",
            qty: "",
            loading: false,
            errorMessage: ''
        };
		
		
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }



    addEmployee = () => {
        // destructure state
		//http://dummy.restapiexample.com/api/v1/create
        const { id_produk,qty, harga } = this.state;		
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
                    id_produk: this.state.id_produk,
                    harga: this.state.harga,
                    qty: this.state.qty
                })
            })
                .then(res => res.json())
				.then(res => {
					this.props.closeModal();
					this.props.addEmployee({
                        id_produk: res.id_produk,
                        qty: res.qty,
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

    render() {
        const { isOpen, closeModal } = this.props;
        const { loading, errorMessage } = this.state;
		const id_produk = this.state.id_produk;
		const qty = this.state.qty;
		const harga = this.state.harga;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Employee</Text>

                    <TextInput
                        style={styles.textBox}
						value={id_produk}
                        onChangeText={(text) => { this.setState({ id_produk: text }) }}
                        placeholder="Full Name" />

                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        value={harga}
                        onChangeText={(text) => { this.setState({ harga: text }) }}
                        placeholder="harga" />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        value={qty}
                        onChangeText={(text) => { this.setState({ qty: text }) }}
                        placeholder="Qty" />

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.addEmployee}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}



export default AddEmployeeModal;

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
    }
})