import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../Button/PrimaryButton";
import { colors } from "../../styles/globalColors";
import { getPlatform } from "../../utils/commonUtils";
import { useState } from "react";
import { todoStore } from "../../store/store";

function BottomInput() {
    const { addItem, editModeData, updateEditModeData, updateItem } = todoStore(
        (state) => state
    );

    const { editMode, aboutToUpdateText, aboutToUpdateId } = editModeData;

    const [text, setText] = useState('');
    const [updateText, setUpdateText] = useState('');

    function addData() {
        if (!text) {
            Alert.alert('Alert!', 'Text cannot be empty', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            addItem(text);
            setText('');
        }
    }

    function updateData() {
        updateItem(updateText, aboutToUpdateId);
        setUpdateText('');
        updateEditModeData(false, '', '')
    }

    return (
        <KeyboardAvoidingView
            style={styles.bottomContainer}
            behavior={getPlatform() === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ios: 200, android: 500})}
        >
            {editMode ?
                <>
                    <TextInput
                        placeholder={aboutToUpdateText || 'Enter here'}
                        value={updateText || aboutToUpdateText}
                        multiline={true}
                        style={{ maxWidth: '60%' }}
                        onChangeText={(data) => setUpdateText(data)}
                    />
                    <PrimaryButton
                        text={'UPDATE'}
                        onPress={updateData}
                    />
                </> : <>
                    <TextInput
                        placeholder={'Enter here'}
                        value={text}
                        multiline={true}
                        style={{ maxWidth: '60%' }}
                        onChangeText={(data) => setText(data)}
                    />
                    <PrimaryButton
                        text={'ADD'}
                        onPress={addData}
                    />
                </>
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        height: 'auto',
        minHeight: 80,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: getPlatform() === 'android' ? 10 : 0,
    }
})

export default BottomInput;