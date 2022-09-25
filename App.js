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
import LoginScreen from "./login.js";
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Login">
        <Stack.Screen name="Login" component = {LoginScreen} />
        <Stack.Screen name="Main" component = {Main} />
        <Stack.Screen name="Profile" component = {Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
