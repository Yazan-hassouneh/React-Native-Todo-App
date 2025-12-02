import { useTheme } from '@/hooks/useTheme'
import { Text, TouchableWithoutFeedback } from 'react-native'

const ThemeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={toggleDarkMode} >
            <Text>Toggle {isDarkMode ? "Dark" : "Light"} Mode</Text>
        </TouchableWithoutFeedback>
    )
}

export default ThemeToggle