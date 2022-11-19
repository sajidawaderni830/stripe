import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import StripeApp from './src/StripeApp'
export default function App() {
  return (
    <StripeProvider publishableKey='pk_test_51LqS2zHLApxlfaOJry3T8l00eZ6nG71LgDo2VyM4jOgeXqp4tGai54e9iscDBuzO97KIXWVnwABFkrkWnxZSoSXB00aaTYABJ2'>
      <StripeApp />
    </StripeProvider>
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
