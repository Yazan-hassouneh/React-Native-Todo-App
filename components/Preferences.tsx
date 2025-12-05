import { useTheme } from '@/hooks/useTheme'
import { createSettingsStyles } from '@/styles/settings'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Switch, Text, View } from 'react-native'

const Preferences = () => {
    const { colors, isDarkMode, toggleDarkMode } = useTheme()
    const styles = createSettingsStyles(colors)
    const [enableNotifications, setEnableNotifications] = useState(true)

    return (
        <LinearGradient colors={colors.gradients.background} style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary} style={styles.settingIcon}>
                        <Ionicons name='moon' size={18} color="#fff"></Ionicons>
                    </LinearGradient>
                    <Text style={styles.settingText}>Dark Mod</Text>
                </View>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }}></Switch>
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning} style={styles.settingIcon}>
                        <Ionicons name='notifications' size={18} color="#fff"></Ionicons>
                    </LinearGradient>
                    <Text style={styles.settingText}>Notifications</Text>
                </View>
                <Switch value={enableNotifications} onValueChange={() => setEnableNotifications(prev => !prev)} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.warning }}></Switch>
            </View>
        </LinearGradient>
    )
}

export default Preferences