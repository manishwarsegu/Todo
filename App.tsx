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
      {/* It's a full screen modal, on successful local authentication the modal goes away and todoList gets displayed */}
      <BiometricAuthScreen /> 
      {/* renders todoList and has textinput, here user can perform CRUD operations */}
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
