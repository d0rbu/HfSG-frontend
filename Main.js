import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Modal, StyleSheet, View, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Box, HStack, VStack, Text, Button, Spacer } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

function getPoints(user) {
  return 0
}

let redeemables = [
  {
    price: 2,
    uses: 10,
    title: 'Austin Raffle',
    description: 'As a reward for helping clean up after yourself, the city of Austin is hosting a raffle for an iPhone 14! Redeem 2 points per entry!',
    image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_202,q_75,w_389,x_1635,y_1743/v1/clients/austin/Austin_Skyline_Credit_Christopher_Sherman_lifetime__4f60343d-9f69-450c-8ad3-fa636761786d.jpg',
    id: 0,
  },
  {
    price: 10,
    uses: 1,
    title: 'Community BBQ',
    description: 'Free food at the Pease Park community barbeque if you redeem 10 points!',
    image: 'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/05/13105548/barbeque-Delhi.jpg',
    id: 1,
  },
  {
    price: 10,
    uses: -1,
    title: '$2 off Burger',
    description: 'Redeem 10 points to get $2 off any medium or larger sized burger at Burger Bar!',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shroomami-burger-3-1655147735.jpg',
    id: 1,
  },
]

redeemables = redeemables.map((redeemable, index) => {
  return {
    ...redeemable,
    index,
  }
})

function buyRedeemable(redeemable, points, setPoints, prizes, setPrizes) {
  if (points < redeemable.price) {
    Alert.alert(`Not enough points to redeem!`)
    return
  }

  if (redeemable.uses > 1) {
    redeemable.uses -= 1
  } else if (redeemables.uses < 0) {

  } else {
    redeemables.splice(redeemable.index, 1)
  }
  setPoints(points - redeemable.price)
  setPrizes(prizes + 1)
}

function getRedeemables(user, modalVisible, setModalVisible, points, setPoints, prizes, setPrizes) {
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
        </Modal>
        <TouchableOpacity
          onPress={() => {;
            Alert.alert(
              redeemable.title,
              `${redeemable.description}\n${(redeemable.uses < 0) ? 'Unlimited' : redeemable.uses} use${(redeemable.uses == 1) ? '' : 's'} left.`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: `Redeem for ${redeemable.price} points`,
                  onPress: () => {
                    buyRedeemable(redeemable, points, setPoints, prizes, setPrizes)
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


export default function Main({ user, route, navigation }) {
  const { points, setPoints, totalPoints, setTotalPoints, prizes, setPrizes } = route.params
  const [currentPoints, setCurrentPoints] = useState(points)
  const [currentPrizes, setCurrentPrizes] = useState(prizes)
  const [redeemables, setRedeemables] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  
  useEffect(() => {
    setPoints(getPoints(user))
  }, [])

  useEffect(() => {
    const deltaPoints = currentPoints - points
    setPoints(currentPoints)

    if (deltaPoints > 0) {
      setTotalPoints(totalPoints + deltaPoints)
    }
  }, [currentPoints])

  useEffect(() => {
    setPrizes(currentPrizes)
  }, [currentPrizes])

  useEffect(() => {
    setRedeemables(getRedeemables(user, modalVisible, setModalVisible, currentPoints, setCurrentPoints, currentPrizes, setCurrentPrizes))
  }, [currentPoints])

  return (
    <View style={styles.container}>
      <VStack spacing={'3%'} style={styles.stack}>
        <Button
          title="Verify Disposal"
          onPress={
            () => {
              setCurrentPoints(currentPoints + 1)
            }
          }
          style={styles.verifyButton}
        />
        <Spacer />
        <Text variant={'h4'} style={styles.points}>
          Points
        </Text>
        <Text variant={'h3'} style={styles.points}>
          {currentPoints}
        </Text>
        <ScrollView style={styles.scrollView}>
          <VStack m={8} spacing={'5%'} style={styles.redeemables}>
            <Spacer />
            <Text variant={'h4'} style={styles.redeem}>
              Redeem
            </Text>
            {redeemables}
          </VStack>
        </ScrollView>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#50D283',
    paddingTop: '10%',
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
    width: '100%',
    margin: 0,
    paddingBottom: '5%',
  },
  verifyButton: {
    backgroundColor: '#509ED2',
    fontSize: 32,
    fontWeight: 'bold',
    width: '70%',
  },
  scrollView: {
    width: '90%',
    padding: 0,
    backgroundColor: '#BBEBCA',
    maxHeight: '65%',
  },
});
