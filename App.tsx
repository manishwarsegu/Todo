import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import BiometricAuthScreen from './src/container/BiometricAuthScreen/BiometricAuthScreen';
import { colors } from './src/styles/globalColors';


export default function App() {
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <BiometricAuthScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
