import BottomInput from "../BottomInput/BottomInput";
import { todoStore } from "../../store/store";
import { FlatList } from "react-native";
import TodoListItem from "./TodoListItem";

function TodoList() {
    // get todoListItems store data
    const { todoListItems } = todoStore(
        (state) => state
    );
    
    return (
        <>
            {/* todoListItems is being used to iterate and render UI in FlatList */}
            <FlatList
                data={todoListItems}
                renderItem={(data) => <TodoListItem data={data}/>}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
            {/* Using input user can add new note/update existing note by tapping on edit button */}
            <BottomInput/>
        </>
    )
}

export default TodoList;