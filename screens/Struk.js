import React, { useState } from 'react';
import {TouchableOpacity, FlatList,View, Text, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';

const Struk = ({navigation,route}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const baru= route.params.id_trans;
  const total_harga= route.params.total_harga;


  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    getStrukDetails()
  }, [])

  function getStrukDetails() {
    setIsLoading(true);
    axios.get(`https://yukimuraattachment.com/apisales/apistruk?id_trans=${baru}`)
      .then(res => {
        if (res.data && typeof(res.data) !== 'string'){
          setUsers(res.data);
        }
        setIsLoading(false);
      });
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
        <View style={{width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <TouchableOpacity style={{alignItems: 'baseline'}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name={"close-box"} size={30} />
          </TouchableOpacity>
        </View>
        {users && users.length > 0 ? <View style={{flex: 1, width: '100%'}}>
            <View style={{flex: 1, width: '100%', padding: 16}}>
              <FlatList
                  contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
                  style={{flex: 1}}
                  data={users}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item.id_transaksi}
              />
            </View>
            <View style={styles.priceContainer}>
              <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold'}}>Total Bayar</Text>
              <Text style={{width: '50%', fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'right'}}>{total_harga}</Text>
            </View>
          </View> : <Text style={{marginTop: 50, fontSize: 16, color: 'grey', textAlign: 'center'}}>Data tidak ditemukan</Text>}
          
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
      </SafeAreaView>
      {isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : getContent()}
    </View>
  )
};

export default Struk;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
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
