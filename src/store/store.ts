import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { randomUUID } from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const todoStore = create(
    persist(
        (set) => ({
            todoListItems: [],
            editModeData: {
                editMode: false,
                aboutToUpdateText: '',
                aboutToUpdateId: '',
            },
            addItem: (todoText) => set((state) => ({
                todoListItems: [...state.todoListItems, { text: todoText, id: randomUUID() }]
            })),
            updateItem: (text, id) => set((state) => ({
                todoListItems: state.todoListItems.map(obj => {
                    if (obj.id === id) {
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
        }),
        {
            name: 'todoListItems',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)