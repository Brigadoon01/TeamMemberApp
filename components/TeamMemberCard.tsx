import type React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { TeamMember } from "../types/TeamMember"
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface TeamMemberCardProps {
  member: TeamMember
  onPress: () => void
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onPress }) => {
  const scaleValue = new Animated.Value(1)
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const colors = {
    dark: {
      cardBackground: '#2a2a2a',
      nameColor: 'white',
      jobTitleColor: '#ccc',
      chevronColor: '#999',
    },
    light: {
      cardBackground: '#fff',
      nameColor: '#333',
      jobTitleColor: '#666',
      chevronColor: '#666',
    },
  };

  const currentColors = colors[theme];

  const responsivePhotoSize = width * 0.15;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
      <Animated.View style={[styles.memberCard, { transform: [{ scale: scaleValue }], backgroundColor: currentColors.cardBackground }]}>
        <Image source={{ uri: member.photo }} style={[styles.memberPhoto, { width: responsivePhotoSize, height: responsivePhotoSize, borderRadius: responsivePhotoSize / 2 }]} />

        <View style={styles.memberInfo}>
          <Text style={[styles.memberName, { color: currentColors.nameColor }]}>{member.name}</Text>
          <Text style={[styles.memberJobTitle, { color: currentColors.jobTitleColor }]}>{member.jobTitle}</Text>

          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={24} color={currentColors.chevronColor} style={styles.chevron} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  memberPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
    paddingRight: 10,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  memberJobTitle: {
    fontSize: 15,
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 4,
  },
  socialButton: {
    marginRight: 15,
  },
  chevron: {
    marginLeft: 12,
  },
})
