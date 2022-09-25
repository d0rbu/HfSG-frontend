import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from "@react-native-material/core";
import { Buffer } from "buffer";
import * as ImagePicker from 'expo-image-picker'

WebBrowser.maybeCompleteAuthSession();


export default function Main({ user }) {

  const openCameraGetPic = async () => {
    const camRequestPermission = await ImagePicker.requestCameraPermissionsAsync();
    const libRequestPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(!camRequestPermission.granted || !libRequestPermission.granted){
      alert("Can't access camera or library");
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync();
    if(!cameraResult.cancelled){
      alert("Congrats! Added points");
    }
  }
  return (
    <View style={styles.container}>
      <Button
        title="Verify Disposal"
        onPress={ openCameraGetPic } 
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
