import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Profile({route, navigation}) {
    const {user} = route.params
    return (
        <View style={styles.container}>
          <Text style={styles.appName}>HfSG App</Text>
          <Text>{JSON.stringify(user)}</Text>
          <StatusBar style="auto" />
          
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