import React, { Component, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity , Image, StatusBar} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EditTagihanModal from "./EditTagihanModal";
import EditTagihanModalx from "./EditTagihanModalx";
import InputSpinner from "react-native-input-spinner";
import FlatListDemo from "./FlatListDemo";
import { useIsFocused } from '@react-navigation/native';

const Tagihan = ({navigation}) => {

  let [data, setData] = React.useState([]);
  let [loading, setLoading] = React.useState(false);
  let [errorMessage, setErrorMessage] = React.useState("");
  let [searchKey, setSearchKey] = React.useState("");
  let [isEditTagihanModalOpen, setIsEditTagihanModalOpen] = React.useState(false);
  let [selectedTagihan, setSelectedTagihan] = React.useState(null);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (isFocused){
      setData([])
      getData()
    }
  }, [isFocused])

  //192.168.43.249
    //192.168.100.203
    function getData(){
      setLoading(true)
      fetch('https://yukimuraattachment.com/apisales/apistrukheader', {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          var result = res
          var a = [
            {
              "name": "February",
              "plantingDate": "2022-01-05",
            },
            {
              "name": "March",
              "plantingDate": "2021-12-05",
            },
            {
              "name": "January",
              "plantingDate": "2022-01-07",
            }
          ]
          
          a.sort(function(a,b){
            return new Date(a.plantingDate) - new Date(b.plantingDate)
          })
          
          console.log(a)
          setData(result)
          setLoading(false)
          setErrorMessage("")
        })
        .catch(() => {
          setLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
        })
    }

    function getDatax(val) {
      setLoading(true)
      setErrorMessage("")
      fetch('https://yukimuraattachment.com/apisales/apistrukheader?vari='+val, {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          setData(res)
          setLoading(false)
          setErrorMessage("")
      })
        .catch(() => {
          setLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
      })
    }

    function updateTagihan (item) {
      var updatedData = data.map(emp => emp.id == item.id_transaksi ? item : emp)
      setData([])
      getData()
      // updating Tagihan data with updated data if Tagihan id is matched with updated data id
      // this.setState({ Tagihan: this.state.Tagihan.map(emp => emp.id == data.id_transaksi ? data : emp) });
    }

  function getListData(){
    return (
      <View style={{width: '100%', marginTop: 20}}>
        {data.map((item, index) => {
          return (
            <View style={styles.TagihanListContainer}>
              <View style={{flexDirection:'row'}}>   
                <View style={{width:"70%",paddingHorizontal: 12}}>   
                  <Text style={styles.name}>{item.kode_trans}</Text>
                  <Text style={styles.name}>{item.tgl_trans}</Text>
                  <Text style={styles.listItem}>Total Tagihan: {item.kbayar}</Text>
                </View>

                <View style={styles.buttonContainer}>
                  {item.kbayar <= 0 ? <Text style={{fontSize: 16, color: 'green', marginBottom: 8}}>LUNAS</Text>
                    :
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditTagihanModalOpen(true)
                      setSelectedTagihan(item)

                    }}
                    style={{ ...styles.button, marginVertical: 0 , marginBottom: 8, backgroundColor: "tomato"}}>
                    <Text style={styles.buttonText}>Bayar</Text>
                  </TouchableOpacity>
                  }

                  <TouchableOpacity onPress={() => navigation.navigate('Struk', { id_trans: `${item.id_transaksi}`,total_harga: `${item.total_harga}` })}  
                    style={{ ...styles.button, marginVertical: 0 ,left:3, backgroundColor: "blue"}}>
                    <Text style={styles.buttonText}>Struk</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
      <View style={styles.container}>
      <StatusBar />

        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Cari Tagihan...'
            placeholderTextColor={'grey'}
            style={{width: '85%', height: 40, fontSize: 14}}
            onChangeText={text => setSearchKey(text)}
            returnKeyType='search'
          />
          <TouchableOpacity onPress={() => getDatax(searchKey)}>
            <MaterialCommunityIcons name='magnify' size={30} color={'grey'} />
          </TouchableOpacity>
        </View>

        {loading ? <Text style={styles.message}>
                    Please Wait...</Text> : errorMessage ? <Text
                  style={styles.message}>{errorMessage}</Text> : (data.length > 0 ? getListData() : <Text style={{marginTop: 50, fontSize: 16, color: 'grey'}}>Data tidak ditemukan</Text>)}

        {/* EditTagihanModal modal is open when edit button is clicked in particular Tagihan list*/}
        {isEditTagihanModalOpen ? <EditTagihanModal
            isOpen={isEditTagihanModalOpen}
            closeModal={() => setIsEditTagihanModalOpen(false)}
            selectedTagihan={selectedTagihan}
            updateTagihan={updateTagihan.bind(this)}
            navigation={navigation}
          /> : null}
      </View>
    </ScrollView>
  )
}

export default Tagihan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    width: '100%', height: 50, flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEDEDE', borderRadius: 20, paddingLeft: 10},
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'baseline',
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  },
  TagihanListContainer: {
    marginBottom: 25,
    elevation: 4,
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8
  },
  listItem: {
    fontSize: 16
  },
  buttonContainer: {
    width: '30%',
    alignItems: "flex-end",
    justifyContent: 'flex-end'
  },
  message: {
    color: "tomato",
    fontSize: 17,
    marginTop: 50
  }
})