import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from "@react-native-material/core";
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

  const [user, setUser] = useState({});

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

      setUser(user);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>HfSG App</Text>
      <Text>{user?.sub}</Text>
      <StatusBar style="auto" />
      <Button
        title="Log in with Google"
        onPress={
          () => {
            promptAsync();
          }
        }
      />
      <Button
        title="Go to Main Page"
        onPress={() => navigation.navigate("Main")}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50D283',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 32,
    color: '#8450D2',
    fontWeight: 'bold',
  }
});
