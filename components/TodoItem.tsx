import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useTheme } from '@/hooks/useTheme';
import { createIndexStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

type Todo = Doc<"todos">

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const toggleTodo = useMutation(api.todos.toggleTodo)
    const deleteTodo = useMutation(api.todos.deleteTodo)
    const editTodo = useMutation(api.todos.editTodo)

    const handleToggleTod = async (id: Id<"todos">) => {
        try {
            await toggleTodo({ id })
        } catch (error) {
            console.log("Toggle Error", error);
            Alert.alert("Error", "Can't Toggle Todo")
        }
    }
    const handleEditTodo = async ({ todo }: { todo: Todo }) => {
        try {
            await editTodo({ id: todo._id, text: todo.text })
        } catch (error) {
            console.log("Edit Error", error);
            Alert.alert("Error", "Can't Edit Todo")
        }
    }
    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert("Delete Todo", "Are you sure you want to delete the todo?", [
            { text: "cancel", style: "cancel" },
            { text: "delete", style: "destructive", onPress: () => deleteTodo({ id }) },
        ])
    }

    return (
        <View>
            <LinearGradient
                colors={colors.gradients.surface}
                style={styles.todoItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Check Box Button  */}
                <TouchableOpacity style={styles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTod(todo._id)}>
                    <LinearGradient
                        colors={todo.isCompleted ? colors.gradients.success : colors.gradients.muted}
                        style={[styles.checkboxInner, { borderColor: todo.isCompleted ? "transparent" : colors.border }]}>
                        {
                            todo.isCompleted && <Ionicons name="checkmark" size={18} color="#fff"></Ionicons>
                        }
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.todoTextContainer}>
                    {/* Text */}
                    <Text style={[styles.todoText, todo.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>
                        {todo.text}
                    </Text>
                    {/* Actions */}
                    <View style={styles.todoActions}>
                        {/* Edit */}
                        <TouchableOpacity onPress={() => handleEditTodo({ todo })} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                                <Ionicons name="pencil" size={14} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                        {/* Delete */}
                        <TouchableOpacity onPress={() => handleDeleteTodo(todo._id)} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                                <Ionicons name="trash" size={14} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default TodoItem

/*
        (x = 0, y = 0)                          (x = 1, y = 0)
        -----------------------------------------
        |                                       |
        |                                       |
        |                                       |
        -----------------------------------------
        (x = 0, y = 1)                          (x = 1, y = 1)







*/