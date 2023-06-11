import { View } from "react-native";
import HeadingText from "../../components/HeadingText/HeadingText";
import TodoList from "../../components/TodoList/TodoList";


function TodoContainer() {
    
    return (
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <HeadingText description='todo:'/>
                <TodoList/>
            </View>
    )
}

export default TodoContainer;