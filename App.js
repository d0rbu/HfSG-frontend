import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
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
      setUser(response);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>HfSG App</Text>
      <Text>{response}</Text>
      <StatusBar style="auto" />
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();}
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
