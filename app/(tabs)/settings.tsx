import Preferences from '@/components/Preferences'
import ProgressStatus from '@/components/ProgressStatus'
import { useTheme } from '@/hooks/useTheme'
import { createSettingsStyles } from '@/styles/settings'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
    const { colors } = useTheme()
    const styles = createSettingsStyles(colors)

    return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
                            <Ionicons name='settings' size={28} color="#fff"></Ionicons>
                        </LinearGradient>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                </View>

                {/* Body */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <ProgressStatus></ProgressStatus>
                    <Preferences></Preferences>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Settings