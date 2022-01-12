import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity , Image} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';
import EditEmployeeModal from "./EditEmployeeModal";
import * as Animatable from 'react-native-animatable';
import axios from "axios";

import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-community/async-storage';

const Japp = ({navigation}) => {
  let [customerList, setCustomerList] = useState([])
  let [selectedCustomer, setSelectedCustomer] = useState(null)
  let [data, setData] = useState([]);
  let [loading, setIsLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let [searchKey, setSearchKey] = useState("");
  let [selectedData, setSelectedData] = useState(null);
  let [isEditEmployeeModalOpen, setIsEditTagihanModalOpen] = useState(false);
  let [isShowStruk, setIsShowStruk] = useState(false)
  let [loadingStruk, setLoadingStruk] = useState(false)
  let [strukErrMsg, setStrukErrMsg] = useState("");
  let [strukData, setStrukData] = useState([]);
  let [salesUsername, setSalesUsername] = useState("")
  let [salesTransId, setSalesTransId] = useState("")

  useEffect(() => {
    getCustomerList()
    AsyncStorage.getItem('userSignIn').then(result => {
      if (result){
        var userSignIn = JSON.parse(result);
        setSalesUsername(userSignIn.username);
        setSalesTransId(userSignIn.id_user_trans);
      }
    });
  }, [])

  function getCustomerList(){
    setIsLoading(true)
    setErrorMessage("")
    fetch('https://yukimuraattachment.com/apisales/apipelangganku', {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
          setCustomerList(res)
          setIsLoading(false)
      })
      .catch(() => {
          setIsLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
      })
  }
  

    function getData () {
      setIsLoading(true)
      setErrorMessage("")

      fetch('https://yukimuraattachment.com/apisales/apitampilz', {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          setIsLoading(false);
          setData(res)
        })
        .catch(() => {
          setIsLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
        })
    }

    function getDatax(searchKey){
      setIsLoading(true)
      setErrorMessage("")
      fetch('https://yukimuraattachment.com/apisales/apitampilz?vari='+searchKey, {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          setData(res)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("Network Error. Please try again xx.")
        })
    }

    function transaksiDone(){
      fetch(`https://yukimuraattachment.com/apisales/apieditanDatax`, {
          method: "PUT",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              status: 2
          })
      })
      .then(res => res.json())
      .catch(e => {
        setIsLoading(false)
        setErrorMessage("Network Error. Please try again.")
      })

      alert("Transaksi Selesai");
    }

    //192.168.43.249
    //192.168.100.203
    function getTagihan(){
      setLoadingStruk(true)
      setStrukErrMsg("")
      fetch('https://yukimuraattachment.com/apisales/apikeranjang', {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.length > 0){
            // sort data from oldest to latest
            res.sort(function(a,b){
              return a.id_transaksi - b.id_transaksi
            })
            var lastItem = res[res.length-1];
            getStrukDetails(lastItem.id_transaksi)
          }
        })
        .catch(e => {
          console.log(e)
          setLoadingStruk(false)
          setStrukErrMsg("Network Error. Please try again xx.")
        })
    }

    function getStrukDetails(id) {
      axios.get(`https://yukimuraattachment.com/apisales/apistruk?id_trans=${id}`)
        .then(res => {
          if (res.data && typeof(res.data) !== 'string'){
            setStrukData(res.data)
          }
          setLoadingStruk(false);
        })
        .catch(() => {
          setLoadingStruk(false)
          setStrukErrMsg("Network Error. Please try again xx.")
        })
    }

    function updateData(item){
      console.log(item)
      var dataUpdate = data.map(emp => emp.id == item.id_produk ? item : emp);
      setData(dataUpdate)
    }

    function getContent(){
      if (selectedCustomer && data.length > 0){
        return data.map((item, index) => {
          return (
            <View key={index} style={styles.employeeListContainer}>
              <Image source={{ uri: 'http://yukimuraattachment.com/img/api/gambarxzz.png'}}
                  style={styles.icon}
              />
              <View style={{flexDirection:'column', width:"55%",paddingHorizontal: 12}}>   
                <Text style={styles.name}>{item.nama_produk}</Text>
                <Text style={styles.listItem}>Qty: {item.qtyy}</Text>
                <Text style={styles.listItem}>Harga: {item.price}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setIsEditTagihanModalOpen(true)
                    setSelectedData(item)
                  }}
                  style={{ ...styles.button, marginVertical: 0 , backgroundColor: "tomato"}}>
                  <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
    }

  function getStrukContent(){
    if (strukData && strukData.length > 0){
      return (
        <ScrollView style={{width: '100%', flex: 1, marginTop: 10}}>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold'}}>Total Bayar</Text>
            <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'right'}}>{strukData[0].total_harga}</Text>
          </View>

          {strukData.map((item, index) => {
            return (
              <View style={styles.itemWrapperStyle}>
                <View style={{width: '60%'}}>
                  <Text style={styles.txtNameStyle}>{`${item.kode_produk} ${item.nama_produk}`}</Text>
                  <Text style={styles.txtEmailStyle}>{`${item.harga}`} x {`${item.qty}`}</Text>
                </View>
                <Text style={styles.priceText}>{item.tharga}</Text>
              </View>
            )
          })}
        </ScrollView>
      )
    }
    
  }

  return (
    <ScrollView>
        <View style={styles.container}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 20, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center'}}>
            {selectedCustomer ? <TouchableOpacity
                onPress={() => transaksiDone()}
                style={{...styles.button}}>
                <Text style={styles.buttonText}>Transaksi Selesai</Text>
            </TouchableOpacity> : <View style={{width: 50}} />}

            <TouchableOpacity style={{alignItems: 'baseline'}} onPress={() => {
              setIsShowStruk(true)
              getTagihan()}
            }>
              <Icon name="ios-basket"  color={'#1f65ff'}  size={30} />
            </TouchableOpacity>
          </View>
          
          <Dropdown
            data={customerList}
            search
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Pilih Customer"
            onChange={item => {
              setSelectedCustomer(item)
              getData()
            }}
            items={customerList.map(item=> ({label:item.label,value:item.value}))}
          />

          <TextInput
            value={salesUsername}
            placeholder='Nama Sales'
            onChangeText={text => setSalesUsername(text)}
            style={{width: '100%', height: 40, marginTop: 10, borderWidth: 0.5, borderRadius: 20, paddingHorizontal: 10}}
          />

          <TextInput
            value={salesTransId}
            placeholder='ID Transaksi Sales'
            onChangeText={text => setSalesTransId(text)}
            style={{width: '100%', height: 40, marginTop: 10, borderWidth: 0.5, borderRadius: 20, paddingHorizontal: 10}}
          />

          {/* <Dropdown
            style={{marginTop: 20}}
            data={data}
            search
            searchPlaceholder="Search"
            labelField="nama_produk"
            valueField="id_produk"
            placeholder="Pilih Customer"
            // items={data.map(item=> ({label:item.nama_produk,value:item.id_produk}))}
          /> */}

          {selectedCustomer ?<View style={styles.searchContainer}>
            <TextInput
              placeholder='Cari Produk'
              placeholderTextColor={'grey'}
              style={{width: '85%', height: 40, fontSize: 14}}
              onChangeText={text => setSearchKey(text)}
              onSubmitEditing={e => getDatax(e.nativeEvent.text)}
              returnKeyType='search'
            />
            <TouchableOpacity onPress={() => getDatax(searchKey)}>
              <MaterialCommunityIcons name='magnify' size={30} color={'grey'} />
            </TouchableOpacity>
          </View> : null}

          <Text style={styles.title}>Product Lists:</Text>
          {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
              style={styles.message}>{errorMessage}</Text> : getContent()}

          {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
          {isEditEmployeeModalOpen ? <EditEmployeeModal
            isOpen={isEditEmployeeModalOpen}
            closeModal={() => setIsEditTagihanModalOpen(false)}
            selectedData={selectedData}
            selectedCustomer={selectedCustomer}
            submitAction={updateData.bind(this)}
            salesId={salesTransId}
          /> : null}

      {isShowStruk ?
                   
        <Animatable.View 
          animation="fadeInUpBig"
          style={[ {
          borderWidth:2,
          borderColor: "#ddd",
			backgroundColor: '#fff',
            position: 'absolute',
            top:300,
            left: 0,
            right: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height:780,
            paddingBottom:30,
            paddingHorizontal: 10
          }]}
        >
          <View style={{width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <MaterialCommunityIcons.Button name="close" size={30}
              backgroundColor={'transparent'} color={'black'} onPress={() => setIsShowStruk(false)} />
          </View>

          <View style={{flexGrow: 1}}>
          {loadingStruk ? <Text
            style={styles.message}>Please Wait...</Text> : strukErrMsg ? <Text
              style={styles.message}>{strukErrMsg}</Text> : getStrukContent()}
          </View>
          </Animatable.View> : null}
        </View>
    </ScrollView>
  )
}

export default Japp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
	flex: 1, 
      backgroundColor: 'white'
  },
  employeeListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
  },
  icon: {
    width: '30%',
    height: undefined,
    aspectRatio: 1/1,
    resizeMode: 'contain'
  },
  
  footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
  searchContainer: {
    marginTop: 20,
    width: '100%', height: 50, flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEDEDE', borderRadius: 20, paddingLeft: 10},
  button: {
    borderRadius: 5,
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
    marginVertical: 20
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
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  txtNameStyle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  txtEmailStyle: {
    color: "#777",
  },
  priceText: {
    width: '40%',
    textAlign: 'right',
    fontSize: 16,
    color: 'grey'
  },
})