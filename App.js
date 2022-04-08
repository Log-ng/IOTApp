import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Device from './Screens/Device';
import Main from './Screens/Main';
export default function App() {
  return (
    <View style={styles.container}>
      <Main/>
      {/* <Device/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#343434',
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    color: 'white',
  },
});
