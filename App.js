import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Index } from './src';

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Index />
      <StatusBar style="auto" />
    </View>
  );
}


