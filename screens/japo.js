import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity , Image, StatusBar} from "react-native";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
// import DeleteEmployeeModal from "./deleteEmployeeModal";
import InputSpinner from "react-native-input-spinner";
// import { useTheme } from '@react-navigation/native';
import FlatListDemo from "./FlatListDemo";

//https://dummy.restapiexample.com/api/v1/employees
class Japo extends Component {
  state = {
    employee: [],
    isAddEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    isFlatListDemoOpen: false,
    isDeleteEmployeeModalOpen: false,
    loading: false,
    errorMessage: "",
    selectedEmployee: {},
    counter : 0,
    name: "",
    vari:"",
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

  componentDidMount() {
    this.getData();
  }



  getDatax = () => {
    this.setState({ errorMessage: "", loading: true });
    // alert(this.state.vari);
    //192.168.43.249
    //192.168.100.203
    //10.246.135.103
    fetch('http://10.246.135.103/api_pegawai/tampilz?vari='+this.state.vari, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => this.setState({
        employee: res,
        loading: false, errorMessage: ""
      }))
      .catch(() => this.setState({
        loading: false,
        errorMessage: "Network Error. Please try again xx."
      }))
  }

    //192.168.43.249
    //192.168.100.203
  getData = () => {
    this.setState({ errorMessage: "", loading: true })
    fetch('http://10.246.135.103/api_pegawai/tampil', {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => this.setState({
        employee: res,
        loading: false, errorMessage: ""
      }))
      .catch(() => this.setState({
        loading: false,
        errorMessage: "Network Error. Please try again xx."
      }))
  }

  toggleAddEmployeeModal = () => {
    this.setState({ isAddEmployeeModalOpen: !this.state.isAddEmployeeModalOpen });
	this.getData();
  }

  toggleEditEmployeeModal = () => {
    this.setState({ isEditEmployeeModalOpen: !this.state.isEditEmployeeModalOpen });
  }

  toggleFlatListDemo= () => {
    this.setState({ isFlatListDemoOpen: !this.state.isFlatListDemoOpen });
  }

  toggleDeleteEmployeeModal = () => {
    this.setState({ isDeleteEmployeeModalOpen: !this.state.isDeleteEmployeeModalOpen });
  }

  addEmployee = (data) => {
    // this.state.employee array is seprated into object by rest operator
    this.setState({ employee: [data, ...this.state.employee] })
  }

  updateEmployee = (data) => {
    // updating employee data with updated data if employee id is matched with updated data id
    this.setState({ employee: this.state.employee.map(emp => emp.id == data.id_produk ? data : emp) });
  }

  deleteEmployee = employeeId => {
    // delete employee lsit with deleted data if employee id is matched with updated data id
    this.setState({ employee: this.state.employee.filter(emp => emp.id !== employeeId) })
  }

  render() {
    const { loading, errorMessage, employee, isAddEmployeeModalOpen,
      isEditEmployeeModalOpen, isFlatListDemoOpen, isDeleteEmployeeModalOpen, selectedEmployee } = this.state;
	 

      //192.168.43.249
    //192.168.100.203
    return (
      <ScrollView>

        <View style={styles.container}>
        <StatusBar />
          <TouchableOpacity
            onPress={this.toggleAddEmployeeModal}
            style={styles.button}>
            <Text style={styles.buttonText}>Tambah Produk</Text>
          </TouchableOpacity>

    
     

     
        <TextInput 
                    placeholder="product name"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onChangeText={(val) => this.textInputChange(val)}
                />


          <Text style={styles.title}>Product Lists:</Text>
          {employee.map((data, index) => <View
            style={styles.employeeListContainer}
            key={data.id_produk}>
         

            <View style={{flexDirection:'row', width:"85%"}}>   
            <Image
              source={{
                uri:
                  'http://yukimuraattachment.com/img/api/gambarxz.png',
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
            <Text style={styles.name}>{data.id_produk}</Text>
            <Text style={styles.name}>{data.nama_produk}</Text>
            <Text style={styles.listItem}>Qty: {data.qty}</Text>
            <Text style={styles.listItem}>Harga: {data.price}</Text>
           
            </View>

            
      
            

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  alert(data);
                  this.toggleEditEmployeeModal();
                  this.setState({ selectedEmployee: data })
                }}
                style={{ ...styles.button, marginVertical: 0 , backgroundColor: "tomato"}}>
                <Text style={styles.buttonText}>ADD</Text>
              </TouchableOpacity>


            </View>

            </View>
          </View>)}

          {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
              style={styles.message}>{errorMessage}</Text> : null}

          {/* AddEmployeeModal modal is open when add employee button is clicked */}
          {isAddEmployeeModalOpen ? <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            closeModal={this.toggleAddEmployeeModal}
            addEmployee={this.addEmployee}
          /> : null}

          {/* AddEmployeeModal modal is open when add employee button is clicked */}
          {isFlatListDemoOpen ? <FlatListDemo
            isOpen={isFlatListDemoOpen}
            closeModal={this.toggleFlatListDemo}
          /> : null}

          {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
          {isEditEmployeeModalOpen ? <EditEmployeeModal
            isOpen={isEditEmployeeModalOpen}
            closeModal={this.toggleEditEmployeeModal}
            selectedEmployee={selectedEmployee}
            updateEmployee={this.updateEmployee}
          /> : null}

          {/* DeleteEmployeeModal modal is open when delete button is clicked in particular employee list*/}
          {isDeleteEmployeeModalOpen ? <DeleteEmployeeModal
            isOpen={isDeleteEmployeeModalOpen}
            closeModal={this.toggleDeleteEmployeeModal}
            selectedEmployee={selectedEmployee}
            updateEmployee={this.deleteEmployee}
          /> : null}
        </View>

      </ScrollView>
    );
  }
}

export default Japo;

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
  employeeListContainer: {
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