import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from "@react-native-material/core";
import { Buffer } from "buffer";
import Main from './Main';

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./Login.js";
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          key={'login'}
          options={{
            headerMode: 'screen',
            headerTintColor: 'black',
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#bbebca',
            },
          }} 
        />
        <Stack.Screen
          name="Main"
          component={Main}
          key={'main'}
          options={{
            headerMode: 'screen',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: '#50D283',
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          key={'profile'}
          options={{
            headerMode: 'screen',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: '#50D283',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
