import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, StatusBar as ReactNativeStatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import BiometricAuthScreen from './src/container/BiometricAuthScreen/BiometricAuthScreen';
import { colors } from './src/styles/globalColors';
import TodoContainer from './src/container/TodoContainer/TodoContainer';
import { getPlatform } from './src/utils/commonUtils';


export default function App() {
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <BiometricAuthScreen />
      <TodoContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    paddingTop: getPlatform() === "android" ? ReactNativeStatusBar.currentHeight : 0
  },
});
