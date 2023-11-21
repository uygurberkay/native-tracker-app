import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="auto" />
      <Navigation />
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  
});
