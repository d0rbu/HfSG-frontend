import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from "@react-native-material/core";
import { Buffer } from "buffer";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

export default function Main({ user }) {
  return (
    <View style={styles.container}>
      <Button
        title="Verify Disposal"
        onPress={
          () => {
            alert('Hi!')
          }
        }
        style={styles.verifyButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50D283',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: '20%',
    spaceBetween: '5%',
  },
  verifyButton: {
    backgroundColor: '#509ED2',
    fontSize: 32,
    fontWeight: 'bold',
    width: '70%',
  }
});
