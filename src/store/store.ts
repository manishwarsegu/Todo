import { create } from 'zustand';
import {randomUUID} from 'expo-crypto';

interface TodoState {
    todoListItems: Array<{ id: string, text: string }>
    editModeData: {
        editMode: boolean,
        aboutToUpdateText: string,
        aboutToUpdateId: string,
    }
    addItem: Function
    updateItem: Function
    deleteItem: Function
    updateEditModeData: Function
  }

export const todoStore = create<TodoState>((set) => {
    return ({
        todoListItems: [],
        editModeData: {
            editMode: false,
            aboutToUpdateText: '',
            aboutToUpdateId: '',
        },
        addItem: (todoText) => set((state) => ({
            todoListItems: [...state.todoListItems, {text: todoText, id: randomUUID()}]
        })),
        updateItem: (text, id) => set((state) => ({
            todoListItems: state.todoListItems.map(obj => {
                if(obj.id === id) {
                    return {
                        ...obj,
                        text
                    }
                }
                return obj;
            })
        })),
        deleteItem: (todoId) => set((state) => ({
            todoListItems: state.todoListItems.filter((todo) => todo.id !== todoId)
        })),
        updateEditModeData: (editMode, aboutToUpdateText, aboutToUpdateId) => set((state) => ({
            editModeData: {
                editMode,
                aboutToUpdateText,
                aboutToUpdateId,
            }
        }))
    })
})