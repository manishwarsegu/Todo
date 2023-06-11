import BottomInput from "../BottomInput/BottomInput";
import { todoStore } from "../../store/store";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/globalColors";

function TodoList() {
    const { todoListItems, deleteItem, updateEditModeData } = todoStore(
        (state) => state
    );
    
    return (
        <>
            <FlatList
                data={todoListItems}
                renderItem={(data) => {
                    const { index } = data;
                    const { text, id } = data.item
                    return (
                        <View style={[
                            styles.listItemContainer,
                            index === 0 && { marginTop: 30 },
                            index === todoListItems.length - 1 && { marginBottom: 100 }
                        ]}>
                            <Text style={{ flexBasis: 230 }}>{text}</Text>
                            <TouchableOpacity onPress={() => updateEditModeData(true, text, id)}>
                                <Text>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                updateEditModeData(false, '', '');
                                deleteItem(id);
                                }}>
                                <Text>REMOVE</Text>
                            </TouchableOpacity>
                        </View>)
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
            <BottomInput/>
        </>
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
        marginVertical: 5,
        padding: 20,
        borderRadius: 20,
    }
})

export default TodoList;