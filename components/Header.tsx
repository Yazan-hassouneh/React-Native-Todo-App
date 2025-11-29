import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { createIndexStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from 'convex/react';
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from 'react-native';

const Header = () => {
    const { colors } = useTheme()
    const styles = createIndexStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const completedTodosLength = todos ? todos.filter((todo) => todo.isCompleted).length : 0
    const allTodosLength = todos ? todos.length : 0
    const percent = allTodosLength > 0 ? (completedTodosLength / allTodosLength) * 100 : 0


    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
                    <Ionicons name="flash-outline" size={28} color={"#ffffff"}></Ionicons>
                </LinearGradient>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>Tody&apos;s Tasks</Text>
                    <Text style={styles.subtitle}>{completedTodosLength} of {allTodosLength} completed</Text>
                </View>
            </View>
            {
                allTodosLength > 0 && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBar}>
                                <LinearGradient colors={colors.gradients.success} style={[styles.progressFill, { width: `${percent}%` }]}></LinearGradient>
                            </View>
                            <Text style={styles.progressText}>{Math.round(percent)}%</Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default Header