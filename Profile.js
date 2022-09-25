import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Button, VStack, HStack, Box } from "@react-native-material/core";

export default function Profile({ route, navigation }) {
  let { user, points, setPoints, totalPoints, setTotalPoints, prizes, setPrizes } = route.params

  if (points == undefined) {
    [points, setPoints] = useState(0)
  }
  if (totalPoints == undefined) {
    [totalPoints, setTotalPoints] = useState(0)
  }
  if (prizes == undefined) {
    [prizes, setPrizes] = useState(0)
  }

  return (
    <View style={styles.container}>
      <Text variant="h3" style={{ color: '#5521ba', fontWeight: 'bold' }}>{user.given_name}</Text>
      <Box style={{ height: '5%' }} />
      <HStack>
        <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{ uri: user.picture }} />
        <Box style={{ width: '5%' }} />
        <VStack style={{ justifyContent: 'center' }}>
          <Text variant="h4" style={{ color: '#2f0ba5', fontWeight: 'bold' }}>{points} points</Text>
          <Text variant="h6" style={{ color: '#2f0ba5', fontWeight: 'bold' }}>{totalPoints} lifetime points</Text>
          <Text variant="h6" style={{ color: '#2f0ba5', fontWeight: 'bold' }}>{prizes} prizes redeemed</Text>
        </VStack>
      </HStack>
      <Box style={{ height: '5%' }} />
      <Image style={{ height: '31%', width: '95%'}} source={{ uri: 'https://cdn.discordapp.com/attachments/412030797948911637/1023689424447488080/map_embed.png' }} />
      <StatusBar style="auto" />
      <Box style={{ height: '5%' }} />
      <Button
        title="Go to Main Page"
        onPress={() => navigation.navigate("Main", { points, setPoints, totalPoints, setTotalPoints, prizes, setPrizes })}
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
    },
    appName: {
      fontSize: 32,
      color: '#8450D2',
      fontWeight: 'bold',
    }
});