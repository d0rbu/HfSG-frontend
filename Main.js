import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Box, HStack, VStack, Text, Button, Spacer } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

function getPoints(user) {
  return 0
}

function getRedeemables(user) {
  const redeemables = [
    {
      price: 10,
      title: 'Austin Raffle',
      description: 'As a reward for helping clean up after yourself, the city of Austin is hosting a raffle for an iPhone 14! Redeem 10 points per entry!',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_202,q_75,w_389,x_1635,y_1743/v1/clients/austin/Austin_Skyline_Credit_Christopher_Sherman_lifetime__4f60343d-9f69-450c-8ad3-fa636761786d.jpg',
      id: 0,
    }
  ]
  return redeemables.map((redeemable) => {
    return (
      <TouchableOpacity
        onPress={() => {
          alert('hi!')
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
    )
  })
}


export default function Main({ user }) {
  const [points, setPoints] = useState(0)
  const [redeemables, setRedeemables] = useState([])
  
  useEffect(() => {
    setPoints(getPoints(user))
    setRedeemables(getRedeemables(user))
  }, [])

  return (
    <View style={styles.container}>
      <VStack spacing={'3%'} style={styles.stack}>
        <Button
          title="Verify Disposal"
          onPress={
            () => {
              setPoints(points + 1)
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
    borderRadius: '10%',
    backgroundColor: '#E3F7EA',
  },
  redeemables: {
    alignItems: 'center',
    width: '82%',
    backgroundColor: '#BBEBCA',
  },
  verifyButton: {
    backgroundColor: '#509ED2',
    fontSize: 32,
    fontWeight: 'bold',
    width: '70%',
  }
});
