import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from "react-native";
import PrimaryButton from "../Button/PrimaryButton";
import { colors } from "../../styles/globalColors";
import { getPlatform } from "../../utils/commonUtils";
import { useEffect, useState } from "react";
import { todoStore } from "../../store/store";

function BottomInput() {
    //addItem would add a new listItem
    //editModeData - we're setting textInput to updation state using this data
    //updateItem - listItem data gets updated using this, user clicked listItem ID (we get it from editModeData) is passed to it and updatedText is also passed
    const { addItem, editModeData, updateEditModeData, updateItem } = todoStore(
        (state) => state
    );

    const { editMode, aboutToUpdateText, aboutToUpdateId } = editModeData;

    const [text, setText] = useState('');
    const [updateText, setUpdateText] = useState('');

    useEffect(() => {
        //textInput value on click of edit should hold user clicked edit item text and this does that
        setUpdateText(aboutToUpdateText);
    }, [aboutToUpdateText])

    function addData() {
        // avoids adding empty data to listItem
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
        //once data of listItem is updated, text input state value is being reset, and editMode state is being reset as well
        setUpdateText('');
        updateEditModeData(false, '', '')
    }

    return (
        <KeyboardAvoidingView
            style={styles.bottomContainer}
            behavior={getPlatform() === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}
        >
            {editMode ?
                <>
                    <TextInput
                        placeholder={aboutToUpdateText || 'Enter here'}
                        value={updateText}
                        multiline={true}
                        style={{ width: '70%' }}
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
                        style={{ width: '70%' }}
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