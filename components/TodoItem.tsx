import { EditTodoContext } from '@/contexts/EditingTodoContext';
import { api } from '@/convex/_generated/api';
import { useTheme } from '@/hooks/useTheme';
import { createIndexStyles } from '@/styles';
import { Todo, TodoId } from '@/types/todoTypes';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DeleteTodoButton from './DeleteTodoButton';
import EditTodoButton from './EditTodoButton';
import EditTodoForm from './EditTodoForm';

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const toggleTodo = useMutation(api.todos.toggleTodo)
    const editTodoContext = useContext(EditTodoContext)

    const handleToggleTod = async (id: TodoId) => {
        try {
            await toggleTodo({ id })
        } catch (error) {
            console.log("Toggle Error", error);
            Alert.alert("Error", "Can't Toggle Todo")
        }
    }

    return (
        <View>
            <LinearGradient colors={colors.gradients.surface} style={styles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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

                {
                    editTodoContext && editTodoContext.openItems[todo._id]
                        ? <EditTodoForm todo={todo}></EditTodoForm>
                        :
                        <View style={styles.todoTextContainer}>
                            {/* Text */}
                            <Text style={[styles.todoText, todo.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>
                                {todo.text}
                            </Text>
                            {/* Actions */}
                            <View style={styles.todoActions}>
                                {/* Edit */}
                                <EditTodoButton todo={todo}></EditTodoButton>
                                {/* Delete */}
                                <DeleteTodoButton todo={todo}></DeleteTodoButton>
                            </View>
                        </View>
                }
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