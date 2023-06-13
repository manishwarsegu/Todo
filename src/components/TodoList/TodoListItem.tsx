import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/globalColors";
import { todoStore } from "../../store/store";
import { hp, spH, spV } from "../../utils/normalize";

function TodoListItem(data) {
    //deleteItem would delete an item based on ID passed
    //updateEditModeData - It's being used to set editMode state i.e. user clicked edit item ID and text are being stored in editModeData
    const { todoListItems, deleteItem, updateEditModeData } = todoStore(
        (state) => state
    );
    const { index } = data.data;
    const { text, id } = data.data.item;

    return (
        <View style={[
            styles.listItemContainer,
            index === 0 && { marginTop: spV(20) },
            index === todoListItems.length - 1 && { marginBottom: spV(100) }
        ]}>
            <Text style={{ flexBasis: spH(200) }}>{text}</Text>
            <TouchableOpacity onPress={() => updateEditModeData(true, text, id)}>
                <Text style={{ height: hp(15) }}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                updateEditModeData(false, '', ''); //this is being updated to reset the text input state if user deletes a listItem
                deleteItem(id);
            }}>
                <Text style={{ height: hp(15) }}>REMOVE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        height: 'auto',
        marginVertical: spV(5),
        padding: 20,
        borderRadius: 20,
    }
})

export default TodoListItem;