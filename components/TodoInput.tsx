import { api } from "@/convex/_generated/api";
import { useTheme } from '@/hooks/useTheme';
import { createIndexStyles } from '@/styles';
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from 'convex/react';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TodoInput = () => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const addTodo = useMutation(api.todos.addTodo);
    const [todo, setTodo] = useState("")

    const handelAddTodo = async () => {
        if (todo.trim()) {
            try {
                await addTodo({ text: todo })
                setTodo("")
            } catch (error) {
                console.log("Error Adding New Todo", error);
                Alert.alert("Error", "Can't Add The New Todo, Try Again!")
            }
        }
    }

    return (
        <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Add The Next Great Thing!!"
                    value={todo}
                    onChangeText={setTodo}
                    onSubmitEditing={handelAddTodo}
                    multiline
                    placeholderTextColor={colors.textMuted} />

                <TouchableOpacity onPress={handelAddTodo} activeOpacity={0.8} disabled={!todo.trim()}>
                    <LinearGradient colors={todo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[styles.addButton, !todo.trim() && styles.addButtonDisabled]}>
                        <Ionicons name="add" size={24} color={"#fff"}></Ionicons>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput