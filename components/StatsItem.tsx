import { useTheme } from '@/hooks/useTheme'
import { createSettingsStyles } from '@/styles/settings'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'

const StatsItem = ({ statsNumber, statsTitle, statsIcon, statsColor, IconGradientColor }: statsIconProps) => {
    const { colors } = useTheme()
    const styles = createSettingsStyles(colors)
    return (
        <LinearGradient colors={colors.gradients.background} style={[styles.statCard, { borderLeftColor: statsColor }]}>
            <View style={styles.statIconContainer}>
                <LinearGradient colors={IconGradientColor} style={styles.statIcon}>
                    <Ionicons name={statsIcon} size={20} color="#fff"></Ionicons>
                </LinearGradient>
            </View>
            <View>
                <Text style={styles.statNumber}>{statsNumber}</Text>
                <Text style={styles.statLabel}>{statsTitle}</Text>
            </View>
        </LinearGradient>
    )
}

export default StatsItem

type statsIconProps = {
    statsNumber: number,
    statsTitle: string,
    statsIcon: string | undefined,
    statsColor: string,
    IconGradientColor: [string, string]
}