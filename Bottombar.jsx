import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text, View, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth/AuthProvider';
import { Home } from './home/Home';
import { IndexPost } from './post/IndexPost';
import { IndexMeasure } from './measure/IndexMeasure';
import { IndexMypage } from './mypage/IndexMypage';
import { IndexCommunity } from './community/IndexCommunity';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();


export const Bottombar = () => {
  return (
        <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={() => ({
          tabBarActiveTintColor: "#00008b"
        })}
        >
          <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title:"ランキング",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="crown" size={size} color={color} />
            )
          }}
          />

          <Tab.Screen
          name="IndexMeasure"
          component={IndexMeasure}
          options={{
            title:"計測",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="tape-measure" size={size} color={color} />
            )
          }}
          />

          <Tab.Screen
          name="IndexPost"
          component={IndexPost}
          options={{
            title:"投稿",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            )
          }}
          />

          <Tab.Screen
          name="IndexCommunity"
          component={IndexCommunity}
          options={{
            title:"コミュニティ",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="comments" size={size} color={color} />
            )
          }}
          />

          <Tab.Screen
          name="IndexMypage"
          component={IndexMypage}
          options={{
            title:"マイページ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            )
          }}
          />
        </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
});