import { EditTodoContext } from '@/contexts/EditingTodoContext'
import { api } from '@/convex/_generated/api'
import { useTheme } from '@/hooks/useTheme'
import { createIndexStyles } from '@/styles'
import { Todo } from '@/types/todoTypes'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const EditTodoForm = ({ todo }: { todo: Todo }) => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const context = useContext(EditTodoContext)
    const editTodo = useMutation(api.todos.editTodo)

    const handleSaveEditing = async () => {
        try {
            if (!context || !context.editingId) {
                throw Error()
            }
            await editTodo({ text: context.editingText, id: context.editingId })
            context.setEditingId(null)
            context.setEditingText("")
            context.toggle(todo._id)

        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed editing todo!")
        }
    }
    const handleCancelEditing = async () => {
        if (context) {
            context.setEditingText("")
            context.setEditingId(null)
            context.toggle(todo._id)
        }
    }

    if (!context) {
        return
    }

    return (
        <View style={styles.editContainer}>
            {/* Input */}
            <TextInput
                style={styles.editInput}
                value={context.editingText}
                onChangeText={context.setEditingText}
                autoFocus
                multiline
                placeholder='Edit Todo'
                placeholderTextColor={colors.textMuted} />

            {/* Actions */}
            <View style={styles.editButtons}>
                {/* save */}
                <TouchableOpacity onPress={handleSaveEditing} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.success} style={styles.editButton}>
                        <Ionicons name="checkmark" size={14} color="#fff" />
                        <Text style={styles.editButtonText}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
                {/* cancel */}
                <TouchableOpacity onPress={handleCancelEditing} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.danger} style={styles.editButton}>
                        <Ionicons name="close" size={14} color="#fff" />
                        <Text style={styles.editButtonText}>Cancel</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditTodoForm
