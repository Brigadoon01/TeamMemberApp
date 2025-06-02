// MemberDetailsModal.tsx - Fixed version
"use client"

import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { TeamMember } from "../types/TeamMember"
import { useTheme } from '../context/ThemeContext'

interface MemberDetailsModalProps {
  member: TeamMember
  onClose: () => void
}

interface SectionColors {
  nameColor: string;
  jobTitleColor: string;
  bioColor: string;
  sectionTitleColor: string;
  contactIconColor: string;
  contactText: string;
  skillTagBackground: string;
  skillTextColor: string;
  closeIconColor: string;
}

export const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({ member, onClose }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Use useRef for animation
  const { theme } = useTheme()

  const colors = {
    dark: {
      nameColor: '#fff',
      jobTitleColor: '#ccc',
      bioColor: '#999',
      sectionTitleColor: '#fff',
      contactIconColor: '#666',
      contactText: '#999',
      skillTagBackground: '#444',
      skillTextColor: '#fff',
      closeIconColor: '#ccc',
    },
    light: {
      nameColor: '#333',
      jobTitleColor: '#666',
      bioColor: '#555',
      sectionTitleColor: '#333',
      contactIconColor: '#666',
      contactText: '#555',
      skillTagBackground: '#f0f0f0',
      skillTextColor: '#333',
      closeIconColor: '#333',
    },
  }

  const currentColors = colors[theme]

  React.useEffect(() => {
    // Start animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const openSocialLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => {
        console.error('Failed to open URL:', err);
      });
    }
  }

  const handleClose = () => {
    // Animate out before closing
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  }

  return (
    <Animated.View style={[styles.modalInner, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color={currentColors.closeIconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        <View style={styles.modalPhotoContainer}>
          <Image 
            source={{ uri: member.photo }} 
            style={styles.modalPhoto}
           
          />
        </View>

        <View style={styles.modalInfo}>
          <Text style={[styles.modalName, { color: currentColors.nameColor }]}>
            {member.name}
          </Text>
          <Text style={[styles.modalJobTitle, { color: currentColors.jobTitleColor }]}>
            {member.jobTitle}
          </Text>
          <Text style={[styles.modalBio, { color: currentColors.bioColor }]}>
            {member.bio}
          </Text>

          <ContactSection member={member} colors={currentColors} />
          <SkillsSection skills={member.skills} colors={currentColors} />
          <SocialSection 
            socialLinks={member.socialLinks} 
            onOpenSocialLink={openSocialLink} 
            colors={currentColors} 
          />
        </View>
      </ScrollView>
    </Animated.View>
  )
}

const ContactSection: React.FC<{ member: TeamMember; colors: SectionColors }> = ({ member, colors }) => (
  <View style={styles.contactSection}>
    <Text style={[styles.sectionTitle, { color: colors.sectionTitleColor }]}>Contact</Text>
    {member.email && (
      <View style={styles.contactItem}>
        <Ionicons name="mail" size={20} color={colors.contactIconColor} />
        <Text style={[styles.contactText, { color: colors.contactText }]}>{member.email}</Text>
      </View>
    )}
    {member.phone && (
      <View style={styles.contactItem}>
        <Ionicons name="call" size={20} color={colors.contactIconColor} />
        <Text style={[styles.contactText, { color: colors.contactText }]}>{member.phone}</Text>
      </View>
    )}
  </View>
)

const SkillsSection: React.FC<{ skills: string[]; colors: SectionColors }> = ({ skills, colors }) => (
  <View style={styles.skillsSection}>
    <Text style={[styles.sectionTitle, { color: colors.sectionTitleColor }]}>Skills</Text>
    <View style={styles.skillsContainer}>
      {skills?.map((skill, index) => (
        <View key={`${skill}-${index}`} style={[styles.skillTag, { backgroundColor: colors.skillTagBackground }]}>
          <Text style={[styles.skillText, { color: colors.skillTextColor }]}>{skill}</Text>
        </View>
      ))}
    </View>
  </View>
)

const SocialSection: React.FC<{
  colors: SectionColors;
  socialLinks: { linkedin: string; twitter: string }
  onOpenSocialLink: (url: string) => void
}> = ({ socialLinks, onOpenSocialLink, colors }) => (
  <View style={styles.socialSection}>
    <Text style={[styles.sectionTitle, { color: colors.sectionTitleColor }]}>Connect</Text>
    <View style={styles.socialButtonsContainer}>
      {socialLinks?.linkedin && (
        <TouchableOpacity
          style={[styles.socialButtonLarge, styles.linkedinButton]}
          onPress={() => onOpenSocialLink(socialLinks.linkedin)}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-linkedin" size={24} color="white" />
          <Text style={styles.socialButtonText}>LinkedIn</Text>
        </TouchableOpacity>
      )}

      {socialLinks?.twitter && (
        <TouchableOpacity
          style={[styles.socialButtonLarge, styles.twitterButton]}
          onPress={() => onOpenSocialLink(socialLinks.twitter)}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-twitter" size={24} color="white" />
          <Text style={styles.socialButtonText}>Twitter</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

const styles = StyleSheet.create({
  modalInner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 5,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  modalPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0', // Placeholder background
  },
  modalInfo: {
    alignItems: "center",
  },
  modalName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: 'center',
  },
  modalJobTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalBio: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  contactSection: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  skillsSection: {
    width: "100%",
    marginBottom: 24,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
  },
  socialSection: {
    width: "100%",
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  socialButtonLarge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
  },
  linkedinButton: {
    backgroundColor: "#0077B5",
  },
  twitterButton: {
    backgroundColor: "#1DA1F2",
  },
  socialButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})