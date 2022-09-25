import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Text, Button, Box, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Buffer } from "buffer";
import { NavigationContainer } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen ({navigation}) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: '220207363229-cje1vv3oe4njcdlsmjhi9gpeumm7g1mj.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  }, );

  useEffect(() => {
    if (response?.type === 'success') {
      const id_token = response.params.id_token

      const jwt_parts = id_token
        .split(".")
        .map((jwt_part) =>
          Buffer.from(
            jwt_part.replace(/-/g, "+").replace(/_/g, "/"),
            "base64"
          ).toString()
        );
      const user = JSON.parse(jwt_parts[1]); // get user object after jwt decoded

      navigation.navigate("Profile", { user })
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image style={{ height: '22%', width: '20%', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} source={{ uri: 'https://cdn.discordapp.com/attachments/1023077405281239173/1023675492131410070/dog.png' }} />
      <Text variant="h3" style={styles.appName}>Waste Erased</Text>
      <StatusBar style="auto" />
      <Box style={{ height: '10%' }} />
      <FAB
        variant="extended"
        label="Log in with Google"
        onPress={
          () => {
            promptAsync();
          }
        }
        icon={(() => <Icon name="login" size={24} color="white" />)}
        color="#007520"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbebca',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: '25%',
  },
  appName: {
    color: '#008069',
    fontWeight: 'bold',
  }
});
