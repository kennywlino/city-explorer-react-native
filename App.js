import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import CitySearchForm from './components/CitySearchForm';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>City Explorer</Text>
        <CitySearchForm />
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262AC0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '48',
    color: 'white'
  }
});
