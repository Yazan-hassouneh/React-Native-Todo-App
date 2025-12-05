import { api } from '@/convex/_generated/api'
import { useTheme } from '@/hooks/useTheme'
import { createSettingsStyles } from '@/styles/settings'
import { useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'
import StatsItem from './StatsItem'

const ProgressStatus = () => {
    const { colors } = useTheme()
    const styles = createSettingsStyles(colors)
    const todos = useQuery(api.todos.getTodos)

    const totalTodosLength = todos ? todos.length : 0
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0
    const activeTodos = totalTodosLength - completedTodos

    return (
        <LinearGradient colors={colors.gradients.surface} style={styles.section}>
            {/* Title */}
            <Text style={styles.sectionTitle}>Progress Status</Text>
            {/* Progress Status */}
            <View style={styles.statsContainer}>
                <StatsItem statsColor={colors.primary} statsIcon='list' statsNumber={totalTodosLength} statsTitle='Total Todos' IconGradientColor={colors.gradients.primary}></StatsItem>
                <StatsItem statsColor={colors.success} statsIcon='checkmark-circle' statsNumber={completedTodos} statsTitle='Completed Todos' IconGradientColor={colors.gradients.success}></StatsItem>
                <StatsItem statsColor={colors.warning} statsIcon='time' statsNumber={activeTodos} statsTitle='Active Todos' IconGradientColor={colors.gradients.warning}></StatsItem>
            </View>
        </LinearGradient>
    )
}

export default ProgressStatus