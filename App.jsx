import { StyleSheet, View } from 'react-native';
import Root from './src/components/Root/Root';

export default function App() {
  return (
    <View style={styles.container}>
      <Root />
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
