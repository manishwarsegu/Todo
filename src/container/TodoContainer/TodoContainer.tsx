import { View } from "react-native";
import HeadingText from "../../components/HeadingText/HeadingText";
import TodoList from "../../components/TodoList/TodoList";
import { spH } from "../../utils/normalize";


function TodoContainer() {
    
    return (
            <View style={{ flex: 1, marginHorizontal: spH(10) }}>
                <HeadingText description='todo:'/>
                <TodoList/>
            </View>
    )
}

export default TodoContainer;