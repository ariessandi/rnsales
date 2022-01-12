// import React from 'react';
import React, { useEffect, useState } from "react";
import {
    View, 
    Text, 
    FlatList,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ActivityIndicator, 
} from 'react-native';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Keranjang = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused){
      getTagihan()
    }
    
  }, [isFocused])

  //192.168.43.249
    //192.168.100.203
	//fetch('https://yukimuraattachment.com/apisales/apistrukheader', {
    function getTagihan(){
      setLoading(true)
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
            console.log(res)
            var lastItem = res[res.length-1];
            getStrukDetails(lastItem.id_transaksi)
          }
        })
        .catch(() => {
          setLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
        })
    }

    function getStrukDetails(id) {
      setLoading(true);
      axios.get(`https://yukimuraattachment.com/apisales/apistruk?id_trans=${id}`)
        .then(res => {
          if (res.data && typeof(res.data) !== 'string'){
            console.log(res.data)
            setData(res.data)
          }
          setIsLoading(false);
        })
        .catch(() => {
          setLoading(false)
          setErrorMessage("Network Error. Please try again xx.")
        })
    }

    function renderItem({ item }){
      return (
        <View style={styles.itemWrapperStyle}>
          <View style={{width: '60%'}}>
            <Text style={styles.txtNameStyle}>{`${item.kode_produk} ${item.nama_produk}`}</Text>
            <Text style={styles.txtEmailStyle}>{`${item.harga}`} x {`${item.qty}`}</Text>
          </View>
          <Text style={styles.priceText}>{item.tharga}</Text>
        </View>
      );
    };

    function getContent(){
      return (
        <View style={{flex: 1, width: '100%'}}>
          {data && data.length > 0 ? <View style={{flex: 1, width: '100%'}}>
              <View style={{flex: 1, width: '100%', padding: 16}}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
                    style={{flex: 1}}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id_transaksi}
                />
              </View>
            </View> : <Text style={{marginTop: 50, fontSize: 16, color: 'grey', textAlign: 'center'}}>Data tidak ditemukan</Text>}
        </View>
      )
    }

    return (
      <View style={styles.container}>      
        <StatusBar backgroundColor='#1f65ff' barStyle="light-content"/>
        {loading ?
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#aaa" />
          </View> : getContent()}
        {data && data.length > 0 ? <View style={styles.priceContainer}>
          <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold'}}>Total Bayar</Text>
          <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'right'}}>{data[0].total_harga}</Text>
        </View> : null}
      </View>
    )
};

export default Keranjang;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      width: '100%',
      backgroundColor: 'white'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: -100
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 2,
        paddingVertical: 2,
        paddingTop:5,
        height:300,
        

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '80%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemWrapperStyle: {
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        width:'100%',
        justifyContent: 'space-between'
      },
      itemImageStyle: {
        width: 50,
        height: 50,
        marginRight: 16,
      },
      contentWrapperStyle: {
        justifyContent: "space-around",
        width:250,
      },
      txtNameStyle: {
        fontSize: 16,
      },
      txtEmailStyle: {
        color: "#777",
      },
      loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
      },
      priceContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 16,
        width: '100%', height: 80,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 5,
        shadowRadius: 1.41,
    
        elevation: 2,
      } 
  });
