import { StyleSheet, View } from 'react-native';
import Root from './src/components/Root/Root';
import globalStyles from './src/assets/styles/globals.module.css';

export default function App() {
  return (
    <View style={[styles.container, globalStyles.body]}>
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
