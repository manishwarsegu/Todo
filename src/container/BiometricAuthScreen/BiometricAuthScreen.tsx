import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/globalColors';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoldText from '../../components/BoldText/BoldText';

enum EResult {
  CANCELLED = 'CANCELLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

function BiometricAuthScreen() {
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
  const [irisAvailable, setIrisAvailable] = useState(false);
  const [result, setResult] = useState<EResult>();
  const [modalVisible, setModalVisible] = useState(true);

  //This Function is being invoked on mount of the component & it checks for all the supported authentication types
  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  };

  // This function is being invoked on click of Authenticate, which updates the results according to user actions
  const authenticate = async () => {
    try {
      const results = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        setResult(EResult.SUCCESS);
        setModalVisible(false);
      } else if (results.error === 'unknown') {
        setResult(EResult.DISABLED);
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult(EResult.CANCELLED);
      } else {
        Platform.OS === 'ios' ?
          Linking.openURL('App-Prefs:TOUCHID_PASSCODE')
          : Linking.sendIntent('android.settings.SECURITY_SETTINGS');
      }
    } catch (error) {
      setResult(EResult.ERROR);
    }
  };

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  // set result message to inform user about authentication success/failure
  let resultMessage;
  switch (result) {
    case EResult.CANCELLED:
      resultMessage = 'Authentication process has been cancelled';
      break;
    case EResult.DISABLED:
      resultMessage = 'Biometric authentication has been disabled';
      break;
    case EResult.ERROR:
      resultMessage = 'There was an error in authentication';
      break;
    case EResult.SUCCESS:
      resultMessage = 'Successfully authenticated';
      break;
    default:
      resultMessage = '';
      break;
  }

  // set description for user to understand what all kinds of authentications are available
  let description;
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = 'Unlock with Face ID, touch ID or iris ID';
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = 'Unlock with Face ID or touch ID';
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = 'Unlock with Face ID or iris ID';
  } else if (fingerprintAvailable && irisAvailable) {
    description = 'Unlock with touch ID or iris ID';
  } else if (facialRecognitionAvailable) {
    description = 'Unlock with Face ID';
  } else if (fingerprintAvailable) {
    description = 'Unlock with touch ID ';
  } else if (irisAvailable) {
    description = 'Unlock with iris ID';
  } else {
    description = 'No biometric authentication methods available';
  }

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      statusBarTranslucent={true}
      presentationStyle="fullScreen"
    >
      <View style={styles.centeredView}>
        <BoldText
          description={description}
        />
        {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
          <PrimaryButton text='Authenticate' onPress={authenticate} />
        ) : null}
        {resultMessage ? <BoldText description={resultMessage} /> : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});


export default BiometricAuthScreen;