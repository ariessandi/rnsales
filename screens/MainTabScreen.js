import React, { useState } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import Keranjang from './Keranjang';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import Japp from './Japp';
import Cust from './Cust';
import Tagihan from './Tagihan';
import FlatListDemo from "./FlatListDemo";
import FlatInvinite from "./FlatInvinite";
import { CommonActions, StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import Struk from './Struk';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ExplorersStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const KeranjangStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsStackScreen}
        options={{
          title:'Tagihan',
          tabBarLabel: 'Tagihan',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-clipboard" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          title:'Customer',
          tabBarLabel: 'Customer',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          )}}
       />
      <Tab.Screen
        name="Explore"
        component={ExplorersStackScreen}
        options={{
          title:'Penjualan',
          tabBarLabel: 'Penjualan',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-create" color={color} size={26} />
          ),
        }}
      />

<Tab.Screen
        name="Keranjang"
        component={KeranjangStackScreen}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-basket"  color={color}  size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}
    initialRouteName='Home'
    >
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const KeranjangStackScreen = ({navigation}) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      navigation.dispatch(
        CommonActions.reset({
           index: 4,
           routes: [{ name: "Keranjang" }],
       }));
    });
    return unsubscribe;
  }, [navigation]);
  
  return(
  <KeranjangStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <KeranjangStack.Screen name="Keranjang" component={Keranjang} options={{       
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </KeranjangStack.Navigator>
  )};


const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        title: 'Tagihan',
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={Tagihan} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
          )}} />
        <DetailsStack.Screen name="Struk" component={Struk} options={{headerShown: false}}/>
</DetailsStack.Navigator>
);


const ExplorersStackScreen = ({navigation}) => (
  <ExplorersStack.Navigator screenOptions={{
          title: 'Penjualan',
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ExplorersStack.Screen name="Explore" component={Japp} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
          }}
          />
  </ExplorersStack.Navigator>
  );

const ProfileStackScreen = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      navigation.dispatch(
        CommonActions.reset({
           index: 2,
           routes: [{ name: "Profile" }],
       }));
    });
    return unsubscribe;
  }, [navigation]);

  return (
  <ProfileStack.Navigator screenOptions={{
          title: 'Customer',
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }} initialRouteName='Profile'>
          <ProfileStack.Screen name="Profile" component={Cust} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </ProfileStack.Navigator>
  )};
  