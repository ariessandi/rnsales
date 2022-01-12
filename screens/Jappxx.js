import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity , Image, StatusBar} from "react-native";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
// import DeleteEmployeeModal from "./deleteEmployeeModal";
import InputSpinner from "react-native-input-spinner";
// import { useTheme } from '@react-navigation/native';
import FlatListDemo from "./FlatListDemo";

//https://dummy.restapiexample.com/api/v1/employees
class Jappxx extends Component {
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
    this.setState({ errorMessage: "", loading: true })
    fetch('https://yukimuraattachment.com/apisales/apitampilz?vari='+this.state.vari, {
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


  getData = () => {
    this.setState({ errorMessage: "", loading: true })
    fetch('https://yukimuraattachment.com/apisales/apitampil', {
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
    this.setState({ employee: this.state.employee.map(emp => emp.id == data.id ? data : emp) });
  }

  deleteEmployee = employeeId => {
    // delete employee lsit with deleted data if employee id is matched with updated data id
    this.setState({ employee: this.state.employee.filter(emp => emp.id !== employeeId) })
  }

  render() {
    const { loading, errorMessage, employee, isAddEmployeeModalOpen,
      isEditEmployeeModalOpen, isFlatListDemoOpen, isDeleteEmployeeModalOpen, selectedEmployee } = this.state;
	 
    return (
      <ScrollView>

        <View style={styles.container}>
        <StatusBar />
          <TouchableOpacity
            onPress={this.toggleAddEmployeeModal}
            style={styles.button}>
            <Text style={styles.buttonText}>Tambah Produk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.toggleFlatListDemo}
            style={styles.button}>
            <Text style={styles.buttonText}>Flat Produk</Text>
          </TouchableOpacity>

         
        <Text>Count: {this.state.counter} {this.state.name}</Text>
        <TouchableOpacity onPress={this.decrementCount.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>Kurang</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.incrementCount.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>Tambah</Text>
        </TouchableOpacity>

        <TextInput value={this.state.name} onChangeText= {(text) => this.setState({name: text})} placeholder="username" />
     
        <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onChangeText={(val) => this.textInputChange(val)}
                />


          <Text style={styles.title}>Product Lists:</Text>
          {employee.map((data, index) => <View
            style={styles.employeeListContainer}
            key={data.id}>
         

            <View style={{flexDirection:'row', width:"85%"}}>   
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
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

            <View style={{flexDirection:'column', width:"35%",paddingHorizontal: 12,}}>   

            <Text style={styles.name}>{data.employee_name}</Text>
            <Text style={styles.listItem}>Qty: {data.employee_age}</Text>
            <Text style={styles.listItem}>Harga: {data.employee_salary}</Text>
           
            </View>

            <InputSpinner            
              rounded={false}
              width={130}
              height={40}
              max={100}
              min={0}
              step={1}
              colorMax={"#f04048"}
              colorMin={"#40c5f4"}
              value={this.state.number}
              onChange={(num) => {
                console.log(num);
              }}
            />
        </View>
            

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleEditEmployeeModal();
                  this.setState({ selectedEmployee: data })
                }}
                style={{ ...styles.button, marginVertical: 0 }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => {
                  this.toggleDeleteEmployeeModal();
                  this.setState({ selectedEmployee: data })
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
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

export default Jappxx;

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