import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Modal, StyleSheet, View, Image, TouchableOpacity, Pressable } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from "@react-native-material/core";
import { Buffer } from "buffer";
import * as ImagePicker from 'expo-image-picker'
import { Box, HStack, VStack, Text, Button, Spacer } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


WebBrowser.maybeCompleteAuthSession();

function getPoints(user) {
  return 0
}

let redeemables = [
  {
    price: 10,
    uses: 2,
    title: 'Austin Raffle',
    description: 'As a reward for helping clean up after yourself, the city of Austin is hosting a raffle for an iPhone 14! Redeem 10 points per entry!',
    image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_202,q_75,w_389,x_1635,y_1743/v1/clients/austin/Austin_Skyline_Credit_Christopher_Sherman_lifetime__4f60343d-9f69-450c-8ad3-fa636761786d.jpg',
    id: 0,
  }
]

redeemables = redeemables.map((redeemable, index) => {
  return {
    ...redeemable,
    index,
  }
})

function buyRedeemable(redeemable, points, setPoints) {
  if (points < redeemable.price) {
    Alert.alert(`Not enough points to redeem!`)
    return
  }

  setPoints(points - redeemable.price)
  if (redeemable.uses > 1) {
    redeemable.uses -= 1
  } else {
    redeemables.splice(redeemable.index, 1)
  }
}

function getRedeemables(user, modalVisible, setModalVisible, points, setPoints) {
  return redeemables.map((redeemable) => {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          key={`${redeemable.id}modal`}
        >
          <TouchableOpacity
            onPress={() => {;
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <Box m={4} style={styles.redeemable} key={redeemable.id}>
              <HStack style={{ justifyContent: 'space-between', width: '100%' }}>
                <Box style={{ width: '67%', height: '100%', textOverflow: 'ellipsis' }}>
                  <Text variant={'h6'} style={{ margin: '5%' }}>
                    {redeemable.title}
                  </Text>
                  <Text style={{ marginLeft: '5%', width: '90%', height: 50,  textOverflow: 'ellipsis' }}>
                    {redeemable.description}
                  </Text>
                </Box>
                <Image style={{ height: '100%', width: '33%', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} source={{ uri: redeemable.image}} />
              </HStack>
            </Box>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          onPress={() => {;
            Alert.alert(
              redeemable.title,
              `${redeemable.description}\n${redeemable.uses} use${(redeemable.uses > 1) ? 's' : ''} left.`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: `Redeem for ${redeemable.price} points`,
                  onPress: () => {
                    buyRedeemable(redeemable, points, setPoints)
                  },
                  style: 'default',
                },
              ]);
          }}
          key={`${redeemable.id}touchableopacity`}
        >
          <Box m={4} style={styles.redeemable}>
            <HStack style={{ justifyContent: 'space-between', width: '100%' }}>
              <Box style={{ width: '67%', height: '100%', textOverflow: 'ellipsis' }}>
                <Text variant={'h6'} style={{ margin: '5%' }}>
                  {redeemable.title}
                </Text>
                <Text style={{ marginLeft: '5%', width: '90%', height: 50,  textOverflow: 'ellipsis' }}>
                  {redeemable.description}
                </Text>
              </Box>
              <Image style={{ height: '100%', width: '33%', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} source={{ uri: redeemable.image}} />
            </HStack>
          </Box>
        </TouchableOpacity>
      </>
    )
  })
}
export default function Main({ user }) {

  const openCameraGetPic = async () => {
    const [points, setPoints] = useState(0)
    const [redeemables, setRedeemables] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
  
    useEffect(() => {
      setPoints(getPoints(user))
    }, [])

    useEffect(() => {
      setRedeemables(getRedeemables(user, modalVisible, setModalVisible, points, setPoints))
    }, [points])


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
/**
      <Button
        title="Verify Disposal"
        onPress={ openCameraGetPic } 
        style={styles.verifyButton}
      />
      */

  return (
    <View style={styles.container}>
      <VStack spacing={'3%'} style={styles.stack}>
        <Button
          title="Verify Disposal"
          onPress={
            () => {
              setPoints(points + 1), openCameraGetPic
            }
          }
          style={styles.verifyButton}
        />
        <Spacer />
        <Text variant={'h4'} style={styles.points}>
          Points
        </Text>
        <Text variant={'h3'} style={styles.points}>
          {points}
        </Text>
        <VStack m={8} spacing={'5%'} style={styles.redeemables}>
          <Spacer />
          <Text variant={'h4'} style={styles.redeem}>
            Redeem
          </Text>
          {redeemables}
        </VStack>
      </VStack>

    </View>
  )
}
      




export default function Main({ user }) {
    return (
    <View style={styles.container}>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#50D283',
    paddingTop: '20%',
    height: '100%',
  },
  stack: {
    alignItems: 'center',
    width: '100%',
  },
  points: {
    color: '#6329C3',
    fontWeight: 'bold',
  },
  redeem: {
    color: '#4819B3',
    fontWeight: 'bold',
  },
  redeemable: {
    alignItems: 'center',
    width: '88%',
    marginTop: '5%',
    marginBottom: '2%',
    borderRadius: '10%',
    backgroundColor: '#E3F7EA',
  },
  redeemables: {
    alignItems: 'center',
    width: '82%',
    backgroundColor: '#BBEBCA',
    paddingBottom: '5%',
  },
  verifyButton: {
    backgroundColor: '#509ED2',
    fontSize: 32,
    fontWeight: 'bold',
    width: '70%',
  }
});
