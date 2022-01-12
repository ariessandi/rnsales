import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text, Button, StyleSheet, StatusBar, ScrollView ,ImageBackground} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import Feather from 'react-native-vector-icons/Feather';


// import {Shapes} from "react-native-background-shapes";

// import styled from 'styled-components';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  toggleDetails = () => {
    navigation.navigate("Details");
  }

  function getFloatingMenu(){
    let menu =[
      {
        iconSrc: 'http://yukimuraattachment.com/img/api/home.png',
        title: 'Home',
        targetScreen: "Home"
      },
      {
        iconSrc: 'http://yukimuraattachment.com/img/api/stok.png',
        title: 'Tagihan',
        targetScreen: "Details"
      },
      {
        iconSrc: 'http://yukimuraattachment.com/img/api/produk.png',
        title: 'Produk',
        targetScreen: "Explore"
      },
      {
        iconSrc: 'http://yukimuraattachment.com/img/api/customer.png',
        title: 'Pelanggan',
        targetScreen: "Profile"
      }
    ]
    return (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.floatingMenuContainer}>
          {menu.map((item, index) => {
            return (
              <TouchableOpacity style={{width: '25%', justifyContent: 'center', alignItems: 'center'}}
               onPress={() => navigation.navigate(item.targetScreen)}>
                <Image source={{uri: item.iconSrc}} style={styles.icon} />
                <Text style={styles.iconName}>{item.title}</Text> 
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, width: '100%'}}>
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>

        <ImageBackground source={require('../assets/logox.png')} resizeMode="cover" style={{width: '100%', height: 150}} />
        <View style={{width: '100%', height: '100%', marginTop: 80, position: 'absolute', alignContent: 'center'}}>
          {getFloatingMenu()}

          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
              <View style={{width: '50%', paddingRight: 8}}>
                <TouchableOpacity onPress={() => navigation.navigate("Keranjang")}
                style={styles.startSaleContainer}>
                  <Text style={{color: '#1f65ff', fontSize: 14}}>MULAI BERJUALAN</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '50%', paddingLeft: 8}}>
                <TouchableOpacity
                style={styles.profileSalesContainer}>
                  <Text style={{color: '#fff', fontSize: 14}}>PROFIL SALES</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
              <View style={{width: '50%', paddingRight: 8}}>
                <View style={styles.cardShadow}>
                  <Text  style={{ fontSize: 12, fontWeight: "bold" }} >Total Penjualan</Text>
                  <Text  style={{ marginTop: 8,  fontSize: 19, fontWeight: "bold",color:"#1f65ff"}} >Rp 200,000</Text>
                </View>
              </View>
              <View style={{width: '50%', paddingLeft: 8}}>
                <View style={styles.cardShadow}>
                  <Text  style={{ fontSize: 12, fontWeight: "bold" }} >Jumlah Penjualan</Text>
                  <Text  style={{ marginTop: 8,  fontSize: 19, fontWeight: "bold",color:"#1f65ff"}} >30</Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
              <View style={{width: '50%', paddingRight: 8}}>
                <View style={styles.cardShadow}>
                  <Text  style={{ fontSize: 12, fontWeight: "bold" }} >Bayar Cash</Text>
                  <Text  style={{ marginTop: 8,  fontSize: 19, fontWeight: "bold",color:"#1f65ff"}} >Rp 200,000</Text>
                </View>
              </View>
              <View style={{width: '50%', paddingLeft: 8}}>
                <View style={styles.cardShadow}>
                  <Text  style={{ fontSize: 12, fontWeight: "bold" }} >Belum Bayar</Text>
                  <Text  style={{ marginTop: 8,  fontSize: 19, fontWeight: "bold",color:"#1f65ff"}} >Rp 200,000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        
      </View>
    </ScrollView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  floatingMenuContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '90%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 15,
    marginBottom: 8
  },
  iconName: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  },
  startSaleContainer: {
    borderWidth:2,borderRadius:8,backgroundColor: 'white',borderColor: '#1f65ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 3
  },
  profileSalesContainer: {
    borderWidth:2,borderRadius:8,backgroundColor: '#1f65ff',borderColor: '#1f65ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 3
  },
  cardShadow: {
    borderRadius:8,backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 5,
    elevation: 5
  }
});
