import { EditTodoContext } from '@/contexts/EditingTodoContext'
import { useTheme } from '@/hooks/useTheme'
import { createIndexStyles } from '@/styles'
import { Todo } from '@/types/todoTypes'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext } from 'react'
import { TouchableOpacity } from 'react-native'


const EditTodoButton = ({ todo }: editParams) => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const context = useContext(EditTodoContext)

    const handleEditTodo = async ({ todo }: { todo: Todo }) => {
        if (context) {
            context.toggle(todo._id)
            context.setEditingId(todo._id)
            context.setEditingText(todo.text)

        }
    }

    return (
        <TouchableOpacity onPress={() => handleEditTodo({ todo })} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                <Ionicons name="pencil" size={14} color="#fff" />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default EditTodoButton

type editParams = {
    todo: Todo
} 