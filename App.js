import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './src/config/navbar';
import ContextProvider from './src/context/context';
import StackNav from "./src/config/StackNav"

export default function App() {
  return (
    <View style={styles.container}>
      <ContextProvider>
        <Nav />

      </ContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
