import { useTheme } from '@/hooks/useTheme';
import { createIndexStyles } from '@/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Text, View } from 'react-native';

const LoadingSpinner = () => {
    const { colors } = useTheme();

    const styles = createIndexStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading your todos...</Text>
            </View>
        </LinearGradient>
    );
}

export default LoadingSpinner