import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class AddCustModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            telp: "",
            loading: false,
            errorMessage: ''
        };
		
		
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }



    addCust = () => {
        // destructure state
		//http://dummy.restapiexample.com/api/v1/create
        const { username,telp, email } = this.state;
		
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
            fetch("https://yukimuraattachment.com/apisales/apiinputanCust", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    telp: telp
                })
            })
                .then(res => res.json())
				.then(res => {
					this.props.closeModal();
					this.props.addCust({
                        username: username,
                        telp: telp,
                        email: email,
                        id: res.id_user_trans
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
		const username = this.state.username;
		const telp = this.state.telp;
		const email = this.state.email;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Cust</Text>

                    <TextInput
                        style={styles.textBox}
						value={username}
                        onChangeText={(text) => { this.setState({ username: text }) }}
                        placeholderTextColor={"#C7C7CD"}
                        placeholder="Full Name" />

                    <TextInput
                        style={styles.textBox}
                        value={email}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        placeholderTextColor={"#C7C7CD"}
                        placeholder="email" />
                    <TextInput
                        style={styles.textBox}
                        value={telp}
                        onChangeText={(text) => { this.setState({ telp: text }) }}
                        placeholderTextColor={"#C7C7CD"}
                        placeholder="telp" />

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.addCust}
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



export default AddCustModal;

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
        padding: 10,
        color: 'black'
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