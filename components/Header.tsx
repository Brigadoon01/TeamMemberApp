import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  // Define theme-specific colors for the header
  const colors = {
    dark: {
      headerBackground: '#1a1a1a',
      headerTitle: 'white',
      headerSubtitle: '#999',
    },
    light: {
      headerBackground: '#f0f0f0',
      headerTitle: '#333',
      headerSubtitle: '#666',
    },
  };

  const currentColors = colors[theme];

  return (
    <View style={[styles.header, { backgroundColor: currentColors.headerBackground }]}>
      <View>
        <Text style={[styles.headerTitle, { color: currentColors.headerTitle }]}>Our Team</Text>
        <Text style={[styles.headerSubtitle, { color: currentColors.headerSubtitle }]}>Meet the amazing people behind our success</Text>
      </View>

      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={28}
          color={theme === 'dark' ? '#fff' : '#333'}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  themeToggle: {
    padding: 5,
  },
})
