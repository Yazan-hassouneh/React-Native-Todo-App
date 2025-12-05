import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useTheme } from "@/hooks/useTheme"
import { createIndexStyles } from "@/styles"
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from "convex/react"
import { LinearGradient } from "expo-linear-gradient"
import { Alert, TouchableOpacity } from "react-native"

type Todo = Doc<"todos">

const DeleteTodoButton = ({ todo }: { todo: Todo }) => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const deleteTodo = useMutation(api.todos.deleteTodo)

    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert("Delete Todo", "Are you sure you want to delete the todo?", [
            { text: "cancel", style: "cancel" },
            { text: "delete", style: "destructive", onPress: () => deleteTodo({ id }) },
        ])
    }

    return (
        <TouchableOpacity onPress={() => handleDeleteTodo(todo._id)} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                <Ionicons name="trash" size={14} color="#fff" />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default DeleteTodoButton